const state = {
    isShowLoading: false, // 全局 loading
    // 左侧菜单栏数据
    menuItems: [
        {
            name: 'registrationManagement', // 要跳转的路由名称 不是路径
            size: 18, // icon大小
            type: 'md-home', // icon类型
            text: '校园注册管理' // 文本内容
        },
        {
            name: 'functionManagement', // 要跳转的路由名称 不是路径
            size: 18, // icon大小
            type: 'md-home', // icon类型
            text: '产品功能管理' // 文本内容
        },
    ]
}

export default state
