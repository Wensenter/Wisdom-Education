const Routes = [
    {
        path: '/registrationManagement',
        name: 'registrationManagement',
        mate: {title: '校园注册管理'},
        component: () => import('../views/registrationManagement')
    },
    {   path: '/',
        redirect: '/registrationManagement' 
    },
]

export default Routes