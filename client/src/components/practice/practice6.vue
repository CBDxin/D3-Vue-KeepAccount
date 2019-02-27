<template>
  <div id='svgContainer' style="">
    <div class="every">
      <h3>树状图探究</h3>
      <div class="svg" id="treeDiagram"></div>
    </div>
  </div>
</template>
<script>
  import * as d3 from 'd3'
  export default {
    data () {
      return {
        treeData: {
          'name': '中国',
          'children': [
            {
              'name': '浙江',
              'children':
                [
                  {'name': '杭州'},
                  {'name': '宁波'},
                  {'name': '温州'},
                  {'name': '绍兴'}
                ]
            },
            {
              'name': '广西',
              'children': [
                {
                  'name': '桂林',
                  'children':
                    [
                      {'name': '秀峰区'},
                      {'name': '叠彩区'},
                      {'name': '象山区'},
                      {'name': '七星区'}
                    ]
                },
                {'name': '南宁'},
                {'name': '柳州'},
                {'name': '防城港'}
              ]
            },
            {
              'name': '黑龙江',
              'children': [
                {'name': '哈尔滨'},
                {'name': '齐齐哈尔'},
                {'name': '牡丹江'},
                {'name': '大庆'}
              ]
            },
            {
              'name': '新疆',
              'children':
                [
                  {'name': '乌鲁木齐'},
                  {'name': '克拉玛依'},
                  {'name': '吐鲁番'},
                  {'name': '哈密'}
                ]
            }
          ]
        }
      }
      },
        methods:{
        treeDiagram () {
          // 树状图因为默认是上往下渲染的，改成从左往右渲染后会发现width和height都倒过来了，可以看具体参数的细节
          let width = 400
          let height = 400
          let _this = this
          let svg = d3.select('#treeDiagram')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
          // 初始化树状图数据获取器
          let tree = d3.tree()
            .size([width, height - 80])
            .separation(function (a, b) {
              return (a.parent === b.parent ? 1 : 2) / a.depth
            })
          // 初始化json数据转成一棵树，这个步骤是非常必要的！！
          let hierarchyData = d3.hierarchy(_this.treeData)
            .sum(function (d) {
              return d.value
            })
          // 初始化树状图
          let treeData = tree(hierarchyData)
          // 获取节点
          let nodes = treeData.descendants()
          // 获取边,也就是连线
          let links = treeData.links()
          // 绘制线
          let g = svg.append('g').attr('transform', 'translate(40,0)')
          g.selectAll('.link')
            .data(links)
            .enter().append('path')
            .attr('class', 'link')
            .style('fill', '#cccccc')
            .attr('d', d3.linkHorizontal()
              .x(function (d) { return d.y })
              .y(function (d) { return d.x }))
          // 绘制文本和节点
          g.selectAll('.node')
            .data(nodes)
            .enter().append('g')
            .attr('class', function (d) { return 'node' + (d.children ? ' node--internal' : ' node--leaf') })
            .attr('transform', function (d) { return 'translate(' + d.y + ',' + d.x + ')' })
          g.selectAll('.node').append('circle')
            .attr('r', 5)
            .style('fill', 'green')
          g.selectAll('.node').append('text')
            .attr('dy', 3)
            .attr('x', function (d) { return d.children ? -8 : 8 })
            .style('text-anchor', function (d) { return d.children ? 'end' : 'start' })
            .text(function (d) {
              return d.data.name
            })
            .style('font-size', '11px')
        }
      },
      mounted () {
        this.treeDiagram ()
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


