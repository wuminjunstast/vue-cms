<template>
	<div class="bg-img">
		<el-card class="box-card self-position">
			<div slot="header" class="clearfix">
				<span>登录</span>
			</div>
			<div class="from">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="账户" prop="username">
						<el-input prefix-icon="el-icon-user" v-model="ruleForm.username" placeholder="请输入账户名!"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input prefix-icon="el-icon-key" type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码!"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="handleLogin('ruleForm')">登录</el-button>
					</el-form-item>
				</el-form>
			</div>
			<footer class="login-footer">
				<router-link to="/register">
					<el-button type="text">注册账户</el-button>
				</router-link>
				<el-button type="text">忘记密码?</el-button>
			</footer>
		</el-card>
	</div>
</template>

<script>
	import {Admin} from '@/api/index.js';
	export default {
		data() {
			return {
				ruleForm: {
					username: '',
					password: ''
				},
				rules: {
					username: [{
							required: true,
							message: '请输入账户',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 10,
							message: '长度在 3 到 10个字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							pattern: /^\d{3,}$/,
							message: '长度至少为3个字符',
							trigger: 'blur'
						}
					]
				}
			};
		},
		methods: {
			handleLogin(formName) {
				this.$refs[formName].validate(async(valid) => {
					if (!valid) return false;
					let {status,msg,data} = await Admin.login({...this.ruleForm});
					if (status) {
						// 存储token，userid，role
						sessionStorage.token = data.token;
						sessionStorage.id = data.id;
						sessionStorage.role = data.role;
						this.$message.success(msg);
						// 是否有redirect参数？
						let {redirect} = this.$route.query;
						if(redirect) {
							this.$router.replace(redirect);
						}else{
							// 默认跳转路由
							this.$router.replace('/article/list');
						}
					} else {
						this.$message.error(msg);
					}
				});
			}
		}
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}

	.bg-img {
		background: url(../assets/img/login-bg.jpg) top center no-repeat;
		height: 100vh;
		background-size: cover;
		position: relative;
	}

	.self-position {
		width: 400px;
		position: absolute;
		right: 10%;
		top: 50%;
		transform: translate(0, -50%);
		background-color: white;
		border-radius: 5px;

	}

	.login-footer {
		padding: 0 20px;
		display: flex;
		justify-content: space-between;
	}

	.el-button--text {
		color: #666;
	}
</style>
