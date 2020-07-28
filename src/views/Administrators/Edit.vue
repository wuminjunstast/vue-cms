<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>编辑管理员</span>
		</div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="username" required>
				<el-input v-model="ruleForm.username"></el-input>
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
			<el-form-item label="邮箱" prop="email" required>
				<el-input v-model="ruleForm.email"></el-input>
			</el-form-item>
			<el-form-item label="头像" prop="avatar">
				<upload :img="[ruleForm.avatar,'avatar']" @onhandleImg="handleImg"></upload>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
			</el-form-item>
		</el-form>
		
		
		
		<transfer :list = "trandata" @onPerToRight="perToRight" @onPerToLeft="perToLeft"></transfer>
		<!-- <transfer :list = "trandata" @onPerToRight="perToRight" @onPerToLeft="perToLeft" @onchange="perChange"></transfer> -->
	
	
	
	
	</el-card>
</template>

<script>
	import { Admin, Upload } from '@/api/index';
	import upload from '../../components/Upload.vue';
	import transfer from '../../components/Transfer.vue';
	export default {
		props:['id'],
		components: {
			upload,
			transfer
		},
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
			var checkEmail = (rule, value, callback) => {
				const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
				if (!value) {
					return callback(new Error('邮箱不能为空'))
				}
				setTimeout(() => {
					if (mailReg.test(value)) {
						callback()
					} else {
						callback(new Error('请输入正确的邮箱格式'))
					}
				}, 100)
			}
			return {
				
				
				
				
				trandata: [
					{ id: 1, titel: '选项1', checked: false },
					{ id: 2, titel: '选项2', checked: false },
					{ id: 3, titel: '选项3', checked: false },
					{ id: 4, titel: '选项4', checked: false },
					{ id: 5, titel: '选项5', checked: false }
				],
				
				
				ruleForm: {
					username: '',
					fullname: '',
					sex: '',
					tel: '',
					email: '',
					avatar: ''
				},
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 个字符',
							trigger: 'blur'
						}
					],
					fullname: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 个字符',
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
					email: [{
						validator: checkEmail,
						trigger: 'blur'
					}]
				}
			};
		},
		created() {
			this.loadInfo(this.id);
		},
		// 侦听路由的变化
		watch: {
			'$route'(to, from) {
				let { id } = to.params;
				this.loadInfo(id);
			}
		},
		methods: {
			perToRight(value){
				this.trandata.splice(value, 1);
			},
			perToLeft(value){
				this.trandata.push(value);
			},
			// perChange(value){
			// 	let idx = -1;
			// 	this.trandata.forEach((item,index)=>{
			// 		if(item.if === value) {
			// 			item.checked = !item.checked;
			// 			this.trandata.splice(index,1,item);
			// 		}
			// 	})
			// },
			
			
			
			
			
			// 图片组件改变后，通知父组件更改信息
			handleImg(value) {
				this.ruleForm.avatar = value;
			},
			// 修改信息
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (!valid) return false;
					// 若是用户删除了图片不上传就保存，则把默认图片赋值给它
					if (this.ruleForm.avatar === '') this.ruleForm.avatar = '../images/avatar/default.jpg';
					let { status, msg } = await Admin.edit({ ...this.ruleForm });
					if (status) {
						this.$message.success(msg);
						this.$router.replace('/administrators/list');
					} else {
						this.$message.error(msg);
					}
				});
			},
			// 获取管理员个人资料
			async loadInfo(id) {
				let { status, data } = await Admin.info({ id });

				if (!status) return false;
				// data.avatar = 'http://localhost:3001' + data.avatar.slice(2);
				// 这个给图片加3001的方法改成了使用代理
				this.ruleForm = data;
			}
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
