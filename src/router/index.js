import {createRouter, createWebHashHistory} from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),  // hash模式，
    // history: createWebHistory(),  //h5模式createWebHistory
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            name: 'Index',
            component: () => import('@/views/Index.vue'),
            meta: {
                title: '首页',
            }
        },
        {
            path: '/note',
            name: 'Note',
            component: () => import('@/views/Note.vue'),
            meta: {
                title: '笔记同步',
            }
        },
        {
            path: '/image',
            name: 'Image',
            component: () => import('@/views/Image.vue'),
            meta: {
                title: '图片上传',
            }
        }
    ]
})
// 路由导航守卫
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})
export default router;
