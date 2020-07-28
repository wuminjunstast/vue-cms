<template>
	<el-menu default-active="/article/list" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
	 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" unique-opened router>
		<el-submenu index="1">
			<template slot="title">
				<i class="el-icon-document"></i>
				<span>文章管理</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index="/article/list">文章列表</el-menu-item>
				<el-menu-item index="/article/release">发布文章</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<el-submenu index="2">
			<template slot="title">
				<i class="el-icon-data-analysis"></i>
				<span>分类管理</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index="/category/list">分类列表</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<el-submenu index="3">
			<template slot="title">
				<i class="el-icon-user"></i>
				<span>用户管理</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index="/user/list">用户列表</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<el-submenu index="4">
			<template slot="title">
				<i class="el-icon-c-scale-to-original"></i>
				<span>管理员管理</span>
			</template>
			<el-menu-item-group>
					<el-menu-item index="/administrators/list">管理员列表</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<el-submenu index="5">
			<template slot="title">
				<i class="el-icon-set-up"></i>
				<span>权限管理</span>
			</template>
			<el-menu-item-group>
					<el-menu-item index="/power/list">权限角色</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<el-submenu index="6">
			<template slot="title">
				<i class="el-icon-collection-tag"></i>
				<span>标签管理</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index="/tag/list">标签列表</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<el-menu-item index="/account/accountSet">
			<i class="el-icon-setting"></i>
			<span slot="title">
				账户设置
			</span>
		</el-menu-item>
		
		
		
		
		
			
	</el-menu>
</template>

<script>
	export default {
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style>
	ul.el-menu-vertical-demo {
		height: calc(100vh - 60px);
	}

	a {
		text-decoration: none;
	}
</style>
