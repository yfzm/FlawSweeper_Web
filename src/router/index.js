import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App.vue'
import Login from '@/pages/login/Login.vue'
import Register from '@/pages/register/Register.vue'
import Notepad from '@/pages/notepad/Notepad.vue'
import Item from '@/pages/item/Item.vue'
import Edit from '@/pages/edit/Edit.vue'
import Profile from '@/pages/profile/Profile.vue'
import Admin from '@/pages/admin/Admin.vue'
import AdminHome from '@/pages/admin/children/home/Home.vue'
import AdminLogin from '@/pages/admin/children/Login.vue'
import QuestionManage from '@/pages/admin/children/home/children/questionManage/questionManage.vue'
import QuestionManageHome from '@/pages/admin/children/home/children/questionManage/children/home.vue'
import QuestionManageView from '@/pages/admin/children/home/children/questionManage/children/view.vue'
import QuestionManageEdit from '@/pages/admin/children/home/children/questionManage/children/edit.vue'

import UserManage from '@/pages/admin/children/home/children/userManage/userManage.vue'
import UserManageHome from '@/pages/admin/children/home/children/userManage/children/home.vue'
import UserManageUserItems from '@/pages/admin/children/home/children/userManage/children/user_items.vue'
import UserManageView from '@/pages/admin/children/home/children/userManage/children/view.vue'


import Statistics from '@/pages/admin/children/home/children/statistics.vue'


Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: App,
            children: [
                {
                    path: '',
                    redirect: '/login'
                },
                {
                    path: '/login',
                    name: 'Login',
                    component: Login
                },
                {
                    path: '/register',
                    name: 'Register',
                    component: Register
                },
                {
                    path: '/notepad',
                    name: 'Notepad',
                    component: Notepad
                },
                {
                    path: '/item',
                    name: 'Item',
                    // params: ['id'],
                    component: Item
                },
                {
                    path: '/edit',
                    name: 'Edit',
                    component: Edit
                },
                {
                    path: '/profile',
                    name: 'Profile',
                    component: Profile
                },
                {
                    path: '/admin',
                    name: 'Admin',
                    component: Admin,
                    children: [
                        {
                            path: '',
                            redirect: 'login'
                        },
                        {
                            path: 'login',
                            name: 'admin_login',
                            component: AdminLogin
                        },
                        {
                            path: 'home',
                            name: 'admin_home',
                            component: AdminHome,
                            children: [
                                {
                                    path: '',
                                    redirect: 'question-manage'
                                },
                                {
                                    path: 'question-manage',
                                    name: 'question_manage',
                                    component: QuestionManage,
                                    children: [
                                        {
                                            path: '',
                                            redirect: 'home'
                                        },
                                        {
                                            path: 'home',
                                            name: 'question_manage_home',
                                            component: QuestionManageHome,
                                        },
                                        {
                                            path: 'view',
                                            name: 'question_manage_view',
                                            component: QuestionManageView,
                                        },
                                        {
                                            path: 'edit',
                                            name: 'question_manage_edit',
                                            component: QuestionManageEdit,
                                        },

                                    ]
                                },
                                {
                                    path: 'user-manage',
                                    name: 'user_manage',
                                    component: UserManage,
                                    children: [
                                        {
                                            path: '',
                                            redirect: 'home'
                                        },
                                        {
                                            path: 'home',
                                            name: 'user_manage_home',
                                            component: UserManageHome,
                                        },
                                        {
                                            path: 'view',
                                            name: 'user_manage_view',
                                            component: UserManageView,
                                        },
                                        {
                                            path: 'user_items',
                                            name: 'user_manage_user_items',
                                            component: UserManageUserItems,
                                        },

                                    ]
                                },
                                {
                                    path: 'statistics',
                                    name: 'statistics',
                                    component: Statistics
                                }
                            ]
                        }
                    ]
                }
            ]
        },



    ]
})
