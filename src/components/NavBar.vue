<template>
	<div class="navbar">
		<i class="el-icon-s-fold position"></i>
		<div class="right">
			<el-image style="width: 25px; height: 25px" :src="src"></el-image>
			<el-dropdown>
				<span class="el-dropdown-link">
					赵薇<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>个人中心</el-dropdown-item>
					<el-dropdown-item>通知信息</el-dropdown-item>
					<el-dropdown-item>通知信息</el-dropdown-item>
					<el-dropdown-item divided>退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
			}
		}
	}
</script>

<style>
	.navbar {
		background: url(../assets/img/logo.png) no-repeat;
		background-size: 200px 60px;
		background-color: #000000;
		color: white;
		height: 60px;
		line-height: 60px;
		position: relative;
	}

	.position {
		position: absolute;
		left: 210px;
		top: 50%;
		transform: translate(0, -50%);
	}

	.right {
		position: absolute;
		right: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: white;
		margin-left: 10px;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}
</style>
