<template>
  <div id='svgContainer' style="margin:200px auto;width:400px;height:300px">

  </div>
</template>
<script>
  import * as d3 from 'd3'
  export default {
    data () {
      return {
        rectArr: [210, 250, 170, 130, 90, 280, 121, 77]
      }
    },
    mounted () {
      let _this = this
      let rectArr = _this.rectArr
      let width = 400
      let height = 300
      let svg = d3.select('#svgContainer')
                .append('svg')
                .attr('width', width + 'px')
                .attr('height', height + 'px')
      // 插入柱状图
      svg.selectAll('rect')
        .data(rectArr)
        .enter()
        .append('rect')
        .attr('transform', 'translate(' + width + ',' + height + ') rotate(180)')
        .attr('y', function (d, i) { return 0 })
        .attr('x', function (d, i) {
          return width - width / rectArr.length * (i + 1)
        })
        .attr('height', function (d) {
          return 0
        })
        .attr('width', width / rectArr.length - 5)
        .transition()
        .delay(function (d, i) {
          return i * 200
        })
        .duration(2000)
        .ease(d3.easeBounce)
        .attr('height', function (d, i) {
          return d
        })
        .attr('fill', 'steelblue')

      // 插入说明
      svg.selectAll('text')
        .data(_this.rectArr)
        .enter()
        .append('text')
        .attr('y', function (d, i) { return 0 })
        .attr('x', function (d, i) {
          return width / rectArr.length * i + 5
        })
        .attr('dx', 0)
        .text(function (d) {
          return d
        })
        .transition()
        .delay(function (d, i) {
          return i * 200
        })
        .attr('dy', function (d) {
          return height - d - 5
        })
        .duration(2000)
        .ease(d3.easeBounce)
    },
    methods: {

    }
  }
</script>
<style lang="less">
</style>

