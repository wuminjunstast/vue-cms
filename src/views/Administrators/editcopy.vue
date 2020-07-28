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



				<el-upload class="avatar-uploader" action="/upload/common/" :show-file-list="false" :data="{type:'avatar'}"
				 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<span v-if="ruleForm.avatar" class="el-upload-list__item-delete" @click="handleRemove(ruleForm.avatar)">
					<i class="el-icon-delete"></i>
				</span>



			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	import { Admin, Upload } from '@/api/index';
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
			this.loadInfo(this.$route.params.id);
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (!valid) return false;
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
			},
			// 上传成功后的处理
			handleAvatarSuccess(res, file, filelist) {
				if (!res.status) return false;
				this.ruleForm.avatar = res.data;
			},
			// 上传之前的校验
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			// 删除图片
			handleRemove(imgSrc) {
				this.$confirm('此操作将永久删除该头像, 是否继续?', '删除头像', {
					type: 'warning'
				}).then(async () => {
					if (imgSrc.indexOf('avatar/default.jpg') === -1) {
						imgSrc = '.' + imgSrc.slice(21);
						console.log(imgSrc);
						let { status } = await Upload.remove({ src: imgSrc });
						if (!status) return false;
					}
					this.ruleForm.avatar = '';
					this.$message.success('删除成功');
				}).catch(() => {
					this.$message.info('取消删除');
				});
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

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

	.el-upload-list__item-delete {
		width: 178px;
		height: 178px;
		top: 1px;
		left: 1px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		font-size: 24px;
		background-color: rgba(0, 0, 0, .3);
	}
</style>
