import { LoadingBar } from 'view-design'
import router from './router'
import store from './store'
import createRoutes from '@/utils/createRoutes'
import { getDocumentTitle, resetTokenAndClearUser } from './utils'
import { GetMenu } from '@/api/request'

//是否有菜单数据
let hasMenus = false
router.beforeEach(async (to, from, next) => {
    document.title = getDocumentTitle(to.meta.title)
    LoadingBar.start()

    if(hasMenus) {
        next()
    } else {
        try {
            // 这里可以用 await 配合请求后台数据来生成路由
            const data = await GetMenu()
            const routes = createRoutes(data)
            // 从store中获取
            //const routes = createRoutes(store.state.routes.menuItems)
            //动态路由
            console.log(routes)
            router.addRoutes(routes)
            hasMenus = true
            next({ path: to.path || '/' })
        } catch (error) {
            resetTokenAndClearUser()
            next({ path: '/' })
        }
    }

    // if(localStorage.getItem('token')) {
    //     if (to.path === '/login') {
    //         next({path: '/'})
    //     } else if (hasMenus) {
    //         next()
    //     } else {
    //         try {
    //             // 这里可以用 await 配合请求后台数据来生成路由
    //             const data = await GetMenu()
    //             const routes = createRoutes(data)
    //             // 从store中获取
    //             //const routes = createRoutes(store.state.routes.menuItems)
    //             //动态路由
    //             console.log(routes)
    //             router.addRoutes(routes)
    //             hasMenus = true
    //             next({ path: to.path || '/' })
    //         } catch (error) {
    //             resetTokenAndClearUser()
    //             next(`/login?redirect=${to.path}`)
    //         }
    //     }
    // } else {
    //     hasMenus = false
    //     if (to.path === '/login') {
    //         next()
    //     } else {
    //         next(`/login?redirect=${to.path}`)
    //     }
    // }
})

router.afterEach(() => {
    LoadingBar.finish()
})