const Routes = [
    {
        path: '/404',
        name: '404',
        meta: { title: '404' },
        component: () => import('../views/404'),
    },
    {   path: '/',
        redirect: '/registrationManagement' 
    },
]

export default Routes