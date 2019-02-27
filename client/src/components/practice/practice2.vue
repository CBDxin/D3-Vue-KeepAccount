<template>
  <div id='svgContainer' style="">
    <div class="every">
      <h3>折线图探究
        <div class="button" @click="changeData('line')">点击触发更新</div>
      </h3>
      <div class="svg" id="line"></div>
    </div>
    <div class="every">
      <h3>区域生成器</h3>
      <div class="svg" id="area"></div>
    </div>
  </div>
</template>
<script>
  import * as d3 from 'd3'
  export default {
    data () {
      return {
        lineData: [10, 30, 25, 12, 43, 25, 18, 36],
        areaData: [10, 30, 25, 12, 43, 25, 18, 12]
      }
    },
    methods: {
      changeData (which) {
        if (which === 'line') {
          this.lineData.sort(d3.ascending)
        }
      },
      //折线
      line () {
        let _this = this
        let width = 400
        let height = 400
        let padding = {
          left: 30,
          right: 30,
          top: 20,
          bottom: 20
        }
        // 初始化svg画布
        // 处理数据更新做的判断
        document.getElementById('line').innerHTML = ''
        let svg = d3.select('#line')
          .append('svg')
          .attr('width', width + 'px')
          .attr('height', height + 'px')
        let min = d3.min(_this.lineData) - 5
        let max = d3.max(_this.lineData) + 5
        // 比例尺
        let xScale = d3.scaleBand()
          .domain(['1月', '2月', '3月', '4月', '5月', '6月'])
          .range([0, width - padding.left - padding.right])
        let yScale = d3.scaleLinear()
          .domain([min, max]).range([height - padding.top - padding.bottom, 0]) // 值域取反
        let xAxis = d3.axisBottom().scale(xScale)
        let yAxis = d3.axisLeft(yScale)
        // 添加x轴
        svg.append('g')
          .attr('class', 'axis')
          .attr('transform', 'translate(' + padding.left + ',' + (height - padding.bottom) + ')')
          .call(xAxis)
        // 添加y轴
        svg.append('g')
          .attr('class', 'axis')
          .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
          .call(yAxis)
        // 设置折线
        let line = d3.line()
          .x(function (d, i) {
            return padding.left + (width - padding.left - padding.right) / _this.lineData.length * (i + 0.5)
          })
          .y(function (d, i) {
            return yScale(d)
          })
          .curve(d3.curveBasis)
        // 绘制折现路径
        svg.append('path')
          .attr('d', line(_this.lineData))
          .attr('stroke', 'red')
          .attr('stroke-width', '4px')
          .attr('fill', 'none')
          .attr('class', 'line') // 添加动画
      },
      //区域
      area () {
        let _this = this
        let width = 400
        let height = 400
        let padding = {
          left: 30,
          right: 30,
          top: 20,
          bottom: 20
        }
        document.getElementById('area').innerHTML = ''
        let svg = d3.select('#area')
          .append('svg')
          .attr('width', width + 'px')
          .attr('height', height + 'px')
        let xScale = d3.scaleBand().domain(['1月', '2月', '3月', '4月', '5月', '6月']).range([0, width - padding.left - padding.right])
        let yScale = d3.scaleLinear().domain([d3.min(_this.areaData), d3.max(_this.areaData)]).range([height - padding.bottom - padding.top, 0])
        let xAxis = d3.axisBottom().scale(xScale)
        let yAxis = d3.axisLeft().scale(yScale)
        svg.append('g')
          .attr('class', 'axis')
          .attr('transform', 'translate(' + padding.left + ',' + (height - padding.bottom) + ')')
          .call(xAxis)
        svg.append('g')
          .attr('class', 'axis')
          .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
          .call(yAxis)

        // 颜色渐变
        let defs = svg.append('defs')
        let linearGradient = defs.append('linearGradient')
          .attr('id', 'linearColor')
          .attr('x1', '0%')
          .attr('y1', '0%')
          .attr('x2', '0%')
          .attr('y2', '0%')
          .attr('y2', '100%')
        let a = d3.rgb(235, 0, 233)
        let b = d3.rgb(133, 0, 187)
        linearGradient.append('stop')
          .attr('offset', '0%')
          .style('stop-color', 'white')
          .transition().duration(2000)
          .style('stop-color', a.toString())
        linearGradient.append('stop')
          .style('stop-color', 'white')
          .transition().duration(2000)
          .attr('offset', '100%')
          .style('stop-color', b.toString())
        let area = d3.area()
          .x(function (d, i) { return padding.left + (width - padding.left - padding.right) / _this.lineData.length * (i + 0.5) })
          .y(function (d, i) { return height - padding.bottom })
          .y1(function (d, i) { return yScale(d) })
          .curve(d3.curveBasis)
        svg.append('path')
          .attr('d', area(_this.areaData))
          .style('fill', 'url(#' + linearGradient.attr('id') + ')')
      },

    },
    watch: {
      lineData () {
        this.line()
      }
    },
    mounted () {
      this.line()
      this.area()
    }
  }
</script>
<style lang="less">
  #svgContainer{
    width: 100%;
    height: 100%;
    .every{
      width: 400px;
      height: 425px;
      margin:15px;
      float: left;
      h3{
        margin:0;
        .button{
          float: right;
          margin-right: 20px;
          font-size: 14px;
          cursor: pointer;
          padding: 2px 8px;
          border:1px solid #ccc;
          background: yellowgreen;
          border-radius: 4px;
          &:hover{
            background: violet;
          }
        }
      }
      .svg{
        width: 400px;
        height: 400px;
      }
    }
  }
  // 折线动画
  .line{
    stroke-dasharray: 700;             /* //设置虚线的间隔长度 */
    stroke-dashoffset: 700;             /* 设置线段偏移长度 */
    animation: dash 2s forwards;
  }
  @keyframes dash {
    0%{
      stroke-dashoffset:700;
    }
    100%{
      stroke-dashoffset: 0;
    }
  }

</style>

