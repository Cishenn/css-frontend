import Vue from 'vue'
import Router from 'vue-router'
import Base from '@/components/Base'
import Index from '@/components/pages/Index'
import Dialog from '@/components/pages/Dialog'
import Visitor from '@/components/pages/Visitor'
import History from '@/components/pages/History'
import Settings from '@/components/pages/Settings'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Gate from '@/components/Gate'
import Customer from '@/components/pages/Customer'
import Order from '@/components/pages/Order'
import Statistics from '@/components/pages/Statistics'

// customer
import CustomerDetail from '@/components/pages/customer/CustomerDetail'

//order
import AllOrder from '@/components/pages/order/components/AllOrder'
import Waiting from '@/components/pages/order/components/Waiting'
import Created from '@/components/pages/order/components/Created'
import Copied from '@/components/pages/order/components/Copied'
import Dealing from '@/components/pages/order/components/Dealing'
import Finished from '@/components/pages/order/components/Finished'
import SpecificOrder from '@/components/pages/order/SpecificOrder'
import ReplyContent from '@/components/pages/order/components/ReplyContent'
import OperatingLog from '@/components/pages/order/components/OperatingLog'


//settings
import PersonInfo from '@/components/pages/settings/PersonInfo'
import SettingsNotice from '@/components/pages/settings/SettingsNotice'
import CompanyInfo from '@/components/pages/settings/CompanyInfo'
import ServicerManage from '@/components/pages/settings/ServicerManage'
import GroupManage from '@/components/pages/settings/GroupManage'
import RoleManage from '@/components/pages/settings/RoleManage'
import CommonWords from '@/components/pages/settings/CommonWords'
import AutoReply from '@/components/pages/settings/AutoReply'
import DialogRule from '@/components/pages/settings/DialogRule'
import DialogComment from '@/components/pages/settings/DialogComment'
import DistributionRule from '@/components/pages/settings/DistributionRule'
import CustomerInfo from '@/components/pages/settings/CustomerInfo'
import CustomerTag from '@/components/pages/settings/CustomerTag'
import Blacklist from '@/components/pages/settings/Blacklist'
import BaseSettings from '@/components/pages/settings/BaseSettings'
import OrderType from '@/components/pages/settings/OrderType'
import OperationLog from '@/components/pages/settings/OperationLog'
import MessageNotice from '@/components/pages/settings/MessageNotice'



//statistics
import AccessStats from '@/components/pages/statistics/AccessStats'
import CheckInStats from '@/components/pages/statistics/CheckInStats'
import StatisticsOverall from '@/components/pages/statistics/StatisticsOverall'
import WorkQualityStats from '@/components/pages/statistics/WorkQualityStats'
import WorkQuantityStats from '@/components/pages/statistics/WorkQuantityStats'
import { registerMap } from 'echarts'

//dialog
import DialogList from '@/components/pages/dialog/Aside'

//dialog iconfont import
import '../assets/iconfont-d/iconfont.css'
// import { component } from 'vue/types/umd'

// import { component } from 'vue/types/umd'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    routes: [,
        {
            path: '',
            redirect: '/login',
            component: Login
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/gate',
            component: Gate
        },
        {
            path: '/',
            component: Base,
            children: [,
                {
                    path: 'index',
                    component: Index
                },
                {
                    path: 'dialog',
                    component: Dialog
                },
                {
                    path: 'visitor',
                    component: Visitor
                },
                {
                    path: 'history',
                    component: History
                },
                {
                    path: 'customer',
                    component: Customer,
                },
                {
                    path:'customerDetail',
                    component:CustomerDetail
                },
                {
                  path:'specificOrder',
                  redirect: 'specificOrder/replyContent',
                  component:SpecificOrder,
                  children:[
                    {
                      path:'replyContent',
                      component: ReplyContent
                    },
                    {
                      path:'operatingLog',
                      component:OperatingLog
                    }
                  ]
                },
                {
                    path: 'order',
                    redirect: 'order/allOrder',
                    component: Order,
                    children: [
                      {
                        path:'allOrder',
                        component:AllOrder
                      },
                      {
                        path:'waiting',
                        component:Waiting
                      },
                      {
                        path:'created',
                        component:Created
                      },
                      {
                        path:'copied',
                        component:Copied
                      },
                      {
                        path:'dealing',
                        component:Dealing
                      },
                      {
                        path:'finished',
                        component:Finished
                      },
                    ]
                },
                {
                    path: 'statistics',
                    redirect: 'statistics/statisticsOverall',
                    component: Statistics,
                    children: [
                      {
                        path:'statisticsOverall',
                        component:StatisticsOverall
                      },
                      {
                        path:'workQuantityStats',
                        component:WorkQuantityStats
                      },
                      {
                        path:'workQualityStats',
                        component:WorkQualityStats
                      },
                      {
                        path:'checkInStats',
                        component:CheckInStats
                      },
                      {
                        path:'accessStats',
                        component:AccessStats
                      },
                    ]
                },
                {
                    path: 'settings',
                    redirect: 'settings/personInfo',
                    component: Settings,
                    children: [,
                        {
                            path: 'personInfo',
                            component: PersonInfo
                        },
                        {
                            path: 'settingsNotice',
                            component: SettingsNotice
                        },
                        {
                            path: 'companyInfo',
                            component: CompanyInfo
                        },
                        {
                            path: 'servicerManage',
                            component: ServicerManage
                        },
                        {
                            path: 'groupManage',
                            component: GroupManage
                        },
                        {
                            path: 'roleManage',
                            component: RoleManage
                        },
                        {
                            path: 'commonWords',
                            component: CommonWords
                        },
                        {
                            path: 'autoReply',
                            component: AutoReply
                        },
                        {
                            path: 'dialogRule',
                            component: DialogRule
                        },
                        {
                            path: 'dialogComment',
                            component: DialogComment
                        },
                        {
                            path: 'distributionRule',
                            component: DistributionRule
                        },
                        {
                            path: 'customerInfo',
                            component: CustomerInfo
                        },
                        {
                            path: 'customerTag',
                            component: CustomerTag
                        },
                        {
                            path: 'blacklist',
                            component: Blacklist
                        },
                        {
                            path: 'baseSettings',
                            component: BaseSettings
                        },
                        {
                            path: 'orderType',
                            component: OrderType
                        },
                        {
                            path: 'operationLog',
                            component: OperationLog
                        },
                        {
                            path: 'messageNotice',
                            component: MessageNotice
                        }
                    ]
                },
            ]
        }
    ]
})
