import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/login'
import content from '@/components/common/content'
import type from '@/components/common/type'
import examine from '@/components/common/top'
import cycle from '@/components/common/cycle'
import data from '@/components/common/data'
import height from '@/components/common/height'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }
    ,
    {
      path: '/home/content',
      name: 'Home',
      component: Home,
      children:[
        {path:'/home/type',component:type},
        {path:'/home/content',component:content},
        {path:'/home/top',component:examine},
        {path:'/home/cycle',component:cycle},
        {path:'/home/data',component:data},
        {path:'/home/height',component:height},
      ]
    }
  ]
})
