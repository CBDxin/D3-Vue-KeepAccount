import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Login from '@/components/Login/Login'
import Register from '@/components/Register/Register'
import Personal from '@/components/Personal/Personal'
import Account from '@/components/Account/Account'
import Detail from '@/components/AccountDetail/detail'
import practice from '@/components/practice/test'

import Chart from '@/components/Chart/Chart'
import Area from '@/components/Chart/Area'
import Pie from '@/components/Chart/Pie'
import Treemap from '@/components/Chart/Treemap'
import Bar from '@/components/Chart/Bar'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'actived',
  linkExactActiveClass: 'actived',
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/register',
      component:Register
    },
    {
      path:'/chart',
      component:Chart,
      children:[
        {
          path:'area',
          component:Area
        },
        {
          path:'pie',
          component:Pie
        },
        {
          path:'tmap',
          component:Treemap
        },
        {
          path:'bar',
          component:Bar
        },
        {
          path:'',
          redirect:'area'
        }

      ]
    },
    {
      path:'/personal',
      component:Personal
    },
    {
      path:'/account',
      component:Account
    },
    {
      path:'/detail',
      component:Detail
    },
    {
      path:'/practice',
      component:practice
    }
  ]
})
