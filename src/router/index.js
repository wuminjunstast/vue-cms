import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/Layout.vue'
import { Message } from 'element-ui';

Vue.use(VueRouter)

const routes = [{
		path: '/login',
		alias: '/',
		name: 'Login',
		component: () => import('@/views/Login.vue'),
		meta: { requiresAuth: false }
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('@/views/Register.vue'),
		meta: { requiresAuth: false }
	},
	{
		path: '/article/',
		name: 'Article',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'ArticleList',
				component: () => import('@/views/Article/List.vue')
			},
			{
				path: 'edit/:id',
				name: 'ArticleEdit',
				props:true,
				component: () => import('@/views/Article/Edit.vue')
			},
			{
				path: 'release',
				name: 'ArticleRelease',
				component: () => import('@/views/Article/Release.vue')
			}
		]
	},
	{
		path: '/category/',
		name: 'Category',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'CategoryList',
				component: () => import('@/views/Category/List.vue')
			},
			{
				path: 'edit',
				name: 'CategoryEdit',
				component: () => import('@/views/Category/Edit.vue')
			}
		]
	},
	{
		path: '/tag/',
		name: 'Tag',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'list',
			name: 'TagList',
			component: () => import('@/views/Tag/List.vue')
		}]
	},
	{
		path: '/user/',
		name: 'User',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'UserList',
				component: () => import('@/views/User/List.vue')
			},
			{
				path: 'edit/:id',
				name: 'UserEdit',
				component: () => import('@/views/User/Edit.vue')
			}
		]
	},
	{
		path: '/administrators/',
		name: 'Administrators',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'AdministratorsList',
				component: () => import('@/views/Administrators/List.vue')
			},
			{
				path: 'edit/:id',
				name: 'AdministratorsEdit',
				component: () => import('@/views/Administrators/Edit.vue'),
				props: true
			}
		]
	},
	{
		path: '/power/',
		name: 'Power',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'list',
			name: 'PowerList',
			component: () => import('@/views/Power/List.vue')
		}]
	},
	{
		path: '/account/',
		name: 'Account',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'accountSet',
			name: 'accountSet',
			component: () => import('@/views/Account/AccountSet.vue')
		}]
	}
]

const router = new VueRouter({
	routes
})

// 全局守卫
router.beforeEach((to, from, next) => {
	// 登录和注册不需要校验
	// if (to.name == 'Login' || to.name == 'Register') {
	// 	next();
	// 	return;
	// }

	// 根据meta元信息，校验路由是否需要登录授权，只要有一个元信息true就返回一个布尔值true
	let isRequireAuth = to.matched.some((path) => path.meta.requiresAuth);
	if (!isRequireAuth) {
		next();
		return;
	}

	// 校验tokeng
	let token = sessionStorage.token;
	if (token) {
		// 有token，放行
		next();
		return false;
	}
	// 无token，强制跳转登录
	// if (!token) {
	// 	Message.error('无效的token，请重新登录！');
	// 	setInterval(() => {
	// 		next(`/login?redirect=${to.path}`);
	// 	}, 1000);
	// }

});

export default router
