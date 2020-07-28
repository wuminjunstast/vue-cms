<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>编辑用户</span>
		</div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="username" required>
				<el-input v-model="ruleForm.username"></el-input>
			</el-form-item>
			<el-form-item label="昵称" prop="nickname" required>
				<el-input v-model="ruleForm.nickname"></el-input>
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
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	import { User } from '@/api/index.js'
	export default {
		data() {
			const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
			var phone = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('电话号码不能为空'));
				}
				setTimeout(() => {
					if (phoneReg.test(value)) {
						callback()
					} else {
						callback(new Error('电话号码格式不正确'))
					}
				}, 1000);
			};
			return {
				ruleForm: {
					username: '',
					nickname: '',
					sex: '',
					tel: '',
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
					nickname: [{
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
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					tel: [{
						validator: phone,
						trigger: 'blur'
					}]
				}
			};
		},
		created() {
			this.loadInfo(this.$route.params.id);
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (!valid) return false;
					let { status, msg } = await User.updata(this.$route.params.id, { ...this.ruleForm });
					if (status) {
						this.$message.success(msg);
						this.$router.replace('/user/list');
					} else {
						this.$message.error(msg);
					}
				});
			},
			// 获取用户个人资料
			async loadInfo(id) {
				let { status, data } = await User.info({ id });
				if (status) {
					this.ruleForm = data;
				}
			},
		}
	}
</script>

<style>
	.panel {
		box-shadow: 0px 0px 5px #888888;
		border-radius: 10px;
	}

	.panel-title {
		line-height: 60px;
		padding-left: 20px;
		border-bottom: 1px solid #ccc;
	}

	.form-box {
		padding: 10px;
	}
</style>
