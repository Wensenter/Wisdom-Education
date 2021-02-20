import Mock from 'mockjs'
import menu from './data/menuData'
import userInfo from './data/userInfo'

Mock.mock('/api/menu', 'get', menu)
Mock.mock('/api/userInfo','post', function(option){
    let o = JSON.parse(option.body)
    if(o.account == 'admin' && o.pwd == 'admin'){
        return Mock.mock(userInfo)
    }
})