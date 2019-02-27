<template>
  <div id='svgContainer' style="">
    <div class="every">
      <h3>力导向图探究</h3>
      <div class="svg" id="forceDirected"></div>
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
      forceDirected () {
        let width = 400
        let height = 400
        let padding = {
          left: 30,
          right: 30,
          top: 20,
          bottom: 20
        }
        // 人物节点 name表示名称
        let nodes = [
          {name: '谢大脚'},
          {name: '王长贵'},
          {name: '王大拿'},
          {name: '谢小梅'},
          {name: '谢广坤'},
          {name: '刘能'},
          {name: '赵四'},
          {name: '刘大脑袋'},
          {name: '赵玉田'},
          {name: '刘英'},
          {name: '王老七'},
          {name: '王小蒙'},
          {name: '谢永强'}
        ]
        // 人物关系，source和target表示连线两端的节点，节点的序号从0开始，relation是自己随便加的
        let links = [
          {source: 0, target: 1, relation: '两口子'},
          {source: 0, target: 2, relation: '曾爱慕'},
          {source: 0, target: 3, relation: '亲戚'},
          {source: 0, target: 4, relation: '曾爱慕'},
          {source: 2, target: 7, relation: '上下属'},
          {source: 4, target: 5, relation: '死对头'},
          {source: 4, target: 10, relation: '亲家'},
          {source: 5, target: 9, relation: '父女'},
          {source: 5, target: 6, relation: '亲家'},
          {source: 10, target: 11, relation: '妇女'},
          {source: 11, target: 12, relation: '两口子'},
          {source: 4, target: 12, relation: '父子'},
          {source: 8, target: 9, relation: '两口子'}
        ]
        let svg = d3.select('#forceDirected')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
        // 通过布局来转换数据，然后进行绘制
        let simulation = d3.forceSimulation()
          .nodes(nodes)
          .force('link', d3.forceLink(links).distance(200))
          .force('charge', d3.forceManyBody())
          .force('center', d3.forceCenter((width - padding.left - padding.right) / 2, (height - padding.top - padding.bottom) / 2))
        let color = d3.scaleOrdinal(d3.schemeSet3)

        // 添加节点
        svg.selectAll('circle')
          .data(nodes)
          .enter()
          .append('circle')
          .attr('r', 10)
          .style('fill', function (d, i) {
            return color(i)
          })
          // 添加圆圈的拖拽事件，同时他会触发simulation的tick事件，重新布局该区域
          .call(d3.drag()
            .on('start', function (d) {
              if (!d3.event.active) {
                simulation.alphaTarget(0.8).restart() // 设置衰减系数，对节点位置移动过程的模拟，数值越高移动越快，数值范围[0，1]
              }
              d.fx = d.x
              d.fy = d.y
            })
            .on('drag', function (d) {
              d.fx = d3.event.x
              d.fy = d3.event.y
            })
            .on('end', function (d) {
              if (!d3.event.active) {
                simulation.alphaTarget(0)
              }
              d.fx = null
              d.fy = null
            })
          )
        // 添加描述
        svg.selectAll('text')
          .data(nodes)
          .enter()
          .append('text')
          .style('font-size', '12px')
          .style('fill', '#000')
          .attr('dx', 0)
          .attr('dy', 0)
          .text(function (d) { return d.name })
        // 添加relation
        svg.selectAll('.relation')
          .data(links)
          .enter()
          .append('text')
          .style('fill', 'red')
          .style('font-size', '11px')
          .attr('class', 'relation')
          .attr('dx', 0)
          .attr('dy', 0)
          .text(function (d) { return d.relation })
        // 添加连线
        svg.selectAll('line')
          .data(links)
          .enter()
          .append('line')
          .style('stroke', '#ccc')
          .style('stroke-width', 2)
        //数据重绘
        simulation.on('tick', function () {
          svg.selectAll('circle')
            .attr('cx', function (d) { return d.x })
            .attr('cy', function (d) { return d.y })
          svg.selectAll('text')
            .attr('x', function (d) { return d.x })
            .attr('y', function (d) { return d.y })
          svg.selectAll('line')
            .attr('x1', function (d) { return d.source.x })
            .attr('y1', function (d) { return d.source.y })
            .attr('x2', function (d) { return d.target.x })
            .attr('y2', function (d) { return d.target.y })
          svg.selectAll('.relation')
            .attr('x', function (d) { return (d.source.x + d.target.x) / 2 })
            .attr('y', function (d) { return (d.source.y + d.target.y) / 2 })
        })
      }
    },
    mounted () {
      this.forceDirected ()
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


