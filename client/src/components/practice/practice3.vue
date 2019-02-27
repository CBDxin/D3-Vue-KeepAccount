<template>
  <div id='svgContainer' style="">
    <div class="every">
      <h3>饼图探究</h3>
      <div class="svg" id="pie"></div>
    </div>
  </div>
</template>
<script>
  import * as d3 from 'd3'
  export default {
    data () {
      return {
        pieData: [{
          name: '小米',
          value: 60.8
        }, {
          name: '华为',
          value: 20.8
        }, {
          name: '联想',
          value: 30.4
        }, {
          name: '三星',
          value: 40.8
        }, {
          name: '苹果',
          value: 90.8
        }, {
          name: '其他',
          value: 100.8
        } ]
      }
    },
    methods: {
      pie () {
        let _this = this
        let width = 400
        let height = 400
        document.getElementById('pie').innerHTML = ''
        let svg = d3.select('#pie')
          .append('svg')
          .attr('width', width + 'px')
          .attr('height', height + 'px')
        let pie = d3.pie()
          .value((d) => d.value)
        // 数据转化
        let pieData = pie(_this.pieData)
        let outerRadius = width / 2.8
        let innerRadius = 0
        // 创建弧生成器
        let arc = d3.arc()
          .innerRadius(outerRadius)
          .outerRadius(innerRadius)
        let color = d3.interpolateCool
        let arcs = svg.selectAll('g')
          .data(pieData)
          .enter()
          .append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
        arcs.append('path')
          .attr('fill', function (d, i) { return color(i) })
          .attr('d', function (d, i) { return arc(d) })
          // 设置动画,还未看懂这部分内容的参数部分
          .transition()
          .duration(4000)
          .attrTween('d', function (d, i) {
            let fn = d3.interpolateObject({
              endAngle: d.startAngle
            }, d)
            return function (i) {
              return arc(fn(i))
            }
          })
        // 添加文字value
        arcs.append('text')
          .attr('transform', function (d) {
            let x = arc.centroid(d)[0] * 1.4
            let y = arc.centroid(d)[1] * 1.4
            return 'translate(' + x + ',' + y + ')'
          })
          .attr('text-anchor', 'middle')
          .attr('font-size', '14')
          .text(function (d) {
            return d.value
          })
        // 添加文字name
        arcs.append('text')
          .attr('transform', function (d) {
            let x = arc.centroid(d)[0] * 2.5
            let y = arc.centroid(d)[1] * 2.5
            return 'translate(' + x + ',' + y + ')'
          })
          .attr('text-anchor', 'middle')
          .attr('font-size', '14')
          .text(function (d) {
            return d.data.name
          })
        // 添加直线
        arcs.append('line')
          .attr('stroke', 'black')
          .attr('stroke-width', '2px')
          .attr('x1', function (d) { return arc.centroid(d)[0] * 2 })
          .attr('y1', function (d) { return arc.centroid(d)[1] * 2 })
          .attr('x2', function (d) { return arc.centroid(d)[0] * 2.3 })
          .attr('y2', function (d) { return arc.centroid(d)[1] * 2.3 })
      }
    },
    mounted () {
      this.pie()
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


