import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login/Login'
import Home from '../components/Home/Home'
//积分中心
import integralCenter from '../components/integral_center/integral_center'
//任务中心
import taskList from '../components/task_center/taskList'
//兑换中心
import goodsList from '../components/money_center/goodsList'
import moneyRecord from '../components/money_center/money_record'
//个人中心
import information from '../components/person_center/information'
import edition from '../components/person_center/edition'
import detail from '../components/person_center/detail'
//风控中心
import taskManager from '../components/risk_center/taskManager'
import department from '../components/risk_center/department'
//综服中心
import staff from '../components/comprehensive/staff'
import goodsMoney from '../components/comprehensive/goods_money'
import commodity from '../components/comprehensive/commodity'
//权限管理
import manageJurisdiction from '../components/Jurisdiction/manage_jurisdiction'
//修改密码
import password from '../components/password/password'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      children:[
        {
          path: '/integralCenter',
          name: 'integralCenter',
          component: integralCenter
        },{
          path: '/taskList',
          name: 'taskList',
          component: taskList
        },{
          path: '/goodsList',
          name: 'goodsList',
          component: goodsList
        },{
          path: '/moneyRecord',
          name: 'moneyRecord',
          component: moneyRecord
        },{
          path: '/information',
          name: 'information',
          component: information
        },{
          path: '/edition',
          name: 'edition',
          component: edition
        },{
          path: '/detail',
          name: 'detail',
          component: detail
        },{
          path: '/taskManager',
          name: 'taskManager',
          component: taskManager
        },{
          path: '/department',
          name: 'department',
          component: department
        },{
          path: '/staff',
          name: 'staff',
          component: staff
        },{
          path: '/goodsMoney',
          name: 'goodsMoney',
          component: goodsMoney
        },{
          path: '/commodity',
          name: 'commodity',
          component: commodity
        },{
          path: '/manageJurisdiction',
          name: 'manageJurisdiction',
          component: manageJurisdiction
        },{
          path: '/password',
          name: 'password',
          component: password
        }
      ]
    }
  ]
})
