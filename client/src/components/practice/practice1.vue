<template>
  <div id='svgContainer' style="">
    <div class="every">
      <h3>柱状图探究
        <div class="button" @click="changeData('bar')">点击触发更新</div>
      </h3>
      <div class="svg" id="bar"></div>
    </div>
  </div>
</template>
<script>
  import * as d3 from 'd3'
  export default {
    data () {
      return {
        barData: [10, 18, 12, 26, 32, 44, 25, 18, 36],
      }
    },
    methods: {
      changeData (which) {
        if (which === 'bar') {
          this.barData.sort(d3.ascending)
        }
      },
      bar () {
        let _this = this
        let width = 400
        let height = 400
        let rectPad = 5
        let padding = {
          left: 30,
          right: 30,
          top: 20,
          bottom: 20
        }
        // 初始化svg画布
        document.getElementById('bar').innerHTML = ''
        let svg = d3.select('#bar')
          .append('svg')
          .attr('width', width + 'px')
          .attr('height', height + 'px')
        // 创建比例尺
        let min = d3.min(_this.barData) - 5
        let max = d3.max(_this.barData) + 5
        let xScale = d3.scaleBand()
          .domain(d3.range(_this.barData.length))
          .range([0, width - padding.left - padding.right])
        let yScale = d3.scaleLinear()
          .domain([min, max]).range([0, height - padding.top - padding.bottom])
        let yScaleAxis = d3.scaleLinear()
          .domain([min, max]).range([height - padding.top - padding.bottom, 0])
        // 坐标轴值域取反，因为坐标原点在左上角
        // 设置x轴 y轴
        let xAxis = d3.axisBottom().scale(xScale)
        let yAxis = d3.axisLeft(yScaleAxis)
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

        // 添加柱状图
        svg.selectAll('rect')
          .data(_this.barData)
          .enter()
          .append('rect')
          // 设置矩形从x,y轴哪一点开始绘制
          .attr('y', function (d, i) { return height - padding.bottom - yScale(d) })
          .attr('x', function (d, i) {
            return padding.left + xScale(i) + rectPad / 2
          })
          // 设置矩形宽高
          .attr('width', xScale.bandwidth() - rectPad)
          .attr('height', 0)
          // 添加鼠标移入移出事件，有个填充简便的效果
          .on('mouseover', function (d, i) {
            d3.select(this)
              .transition()
              .duration(200)
              .attr('fill', 'yellow')
          })
          .on('mouseout', function (d, i) {
            d3.select(this)
              .transition()
              .duration(500)
              .attr('fill', 'steelblue')
          })
          .transition()
          .delay(function (d, i) {
            return i * 200
          })
          .attr('height', function (d, i) {
            return yScale(d)
          })
          .attr('fill', 'steelblue')
        // 添加文字，同理
        svg.selectAll('.MyText')
          .data(_this.barData)
          .enter()
          .append('text')
          .attr('class', 'MyText')
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .attr('y', function (d, i) { return height - padding.bottom - yScale(d) })
          .attr('x', function (d, i) {
            return padding.left + (width - padding.left - padding.right) / _this.barData.length * i
          })
          .attr('dx', (width - padding.left - padding.right) / _this.barData.length / 2)
          .attr('dy', function (d, i) {
            return '1.2em'
          })
          .text(function (d) {
            return d
          })
      },
    },
    watch: {
      barData () {
        this.bar()
      }
    },
    mounted () {
      this.bar()
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
</style>

