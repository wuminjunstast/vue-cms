<template>
	<div class="bg-img">
		<el-card class="box-card self-position">
			<div slot="header" class="clearfix">
				<span>注册</span>
			</div>
			<div class="from">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="账户" prop="username" required>
						<el-input v-model="ruleForm.username"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password" required>
						<el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="checkPass" required>
						<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="姓名" prop="fullname" required>
						<el-input v-model="ruleForm.fullname"></el-input>
					</el-form-item>
					<el-form-item label="性别" prop="sex" required>
						<el-radio-group v-model="ruleForm.sex">
							<el-radio label="男"></el-radio>
							<el-radio label="女"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="手机" prop="tel" required>
						<el-input v-model.number="ruleForm.tel"></el-input>
					</el-form-item>
					<el-form-item prop="agree" required>
						<el-checkbox v-model="ruleForm.agree">同意本站用户协议</el-checkbox>
					</el-form-item>
					<el-form-item>
						<router-link to="/register">
							<el-button type="primary" @click="handleLogin('ruleForm')">注册</el-button>
						</router-link>
					</el-form-item>
				</el-form>
			</div>
			<footer class="login-footer">
				<router-link to="/login">
					<el-button type="text">登录账户</el-button>
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
			const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			var phone = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('电话号码不能为空'));
				}
				setTimeout(() => {
					if (!Number.isInteger(value)) {
						callback(new Error('请输入数字值'));
					} else {
						if (phoneReg.test(value)) {
							callback()
						} else {
							callback(new Error('电话号码格式不正确'))
						}
					}
				}, 1000);
			};
			return {
				checked: true,
				ruleForm: {
					username: '',
					password: '',
					checkPass: '',
					fullname: '',
					sex: '男',
					tel: '',
					agree: ''
				},
				rules: {
					username: [{
							required: true,
							message: '请输入账户',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 20,
							message: '长度在 3 到 20 个字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							// type: 'string',
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 20,
							message: '长度在 6 到 20 个字符',
							trigger: 'blur'
						}
					],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
					fullname: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 20,
							message: '长度在 3 到 20 个字符',
							trigger: 'blur'
						}
					],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					tel: [{
						validator: phone,
						trigger: 'blur'
					}],
					agree: [{
						required: true,
						message: '请勾选同意本站协议',
						trigger: 'change'
					}]
				}
			};
		},
		methods: {
			handleLogin(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (!valid) return false;
					let { status, msg,data } = await Admin.register({ ...this.ruleForm });
					if (status) {
						sessionStorage.token = data.token;
						sessionStorage.id = data.id;
						sessionStorage.role = data.role;
						this.$message.success(msg);
						this.$router.replace('/article/list');
					} else {
						this.$message.error(msg);
					}
				});
			}
		}
	};
</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}

	.bg-img {
		background: url(../assets/img/login-bg.jpg) no-repeat;
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
