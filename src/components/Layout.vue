<template>
	<el-container>
		<el-header>
			<NavBar></NavBar>
		</el-header>
		<el-container>
			<el-aside width="200px">
				<LeftMenu></LeftMenu>
			</el-aside>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import NavBar from '@/components/NavBar.vue';
	import LeftMenu from '@/components/LeftMenu.vue';

	export default {
		components: {
			NavBar,
			LeftMenu
		}
	}
</script>

<style>
	header.el-header {
	    padding: 0 0;
		width: 100vw;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
	}
	.el-aside {
		position: fixed;
		left: 0;
		top: 60px;
	}
	
	.el-main {
		margin-top: 60px;
		margin-left: 200px;
	}
</style>
