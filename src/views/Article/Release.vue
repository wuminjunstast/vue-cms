<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>发布文章</span>
		</div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="标题" prop="title" required>
				<el-input v-model="ruleForm.title"></el-input>
			</el-form-item>
			<el-form-item label="描述" prop="description" required>
				<el-input v-model="ruleForm.description"></el-input>
			</el-form-item>
			<el-form-item label="分类" required prop="cate_1st">
				<el-col :span="6">
					<el-select placeholder="请选择一级分类" v-model="ruleForm.cate_1st" >
						<el-option v-for="option in options_1st" :key="option.id" :label="option.name" :value="option.id"></el-option>
					</el-select>
				</el-col>
				<el-col :span="6">
					<el-select placeholder="请选择二级分类" v-model="ruleForm.cate_2nd">
						<el-option v-for="option in options_2nd" :key="option.id" :label="option.name" :value="option.id"></el-option>
					</el-select>
				</el-col>
			</el-form-item>

			<el-form-item label="主图" prop="main_photo">
				<upload :img="[ruleForm.main_photo,'common']" @onhandleImg="handleImg"></upload>
			</el-form-item>
			<el-form-item label="内容" prop="content">
				<div ref="editor"></div>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	// 引入富文本编辑器
	import E from 'wangeditor';
	import { Article, Category } from '@/api/index.js';
	import upload from '../../components/Upload.vue';
	export default {
		components: {
			upload,
		},
		data() {
			return {
				ruleForm: {
					title: '',
					description: '',
					content: '',
					main_photo: '',
					cate_1st: '',
					cate_2nd: ''
				},
				rules: {
					title: [{
							required: true,
							message: '请输入标题',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 40,
							message: '长度在 3 到 40 个字符',
							trigger: 'blur'
						}
					],
					description: [{
							required: true,
							message: '请输入描述',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 100,
							message: '长度在 3 到 100 个字符',
							trigger: 'blur'
						}
					],
					content: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}],
					cate_1st: [{ required: true, message: '请选择分类', trigger: 'change' }]
				},
				options_1st: [],
				options_2nd: []
			};
		},
		async created() {
			let options = await this.loadSubcate(0);
			// 把获取到的1级分类放入数组中
			this.options_1st = options;
		},
		watch: {
			'ruleForm.cate_1st': async function(val) {
				// 获取二级分类
				let options = await this.loadSubcate(val);
				this.options_2nd = options;
				this.ruleForm.cate_2nd = options[0].id;
			}
		},
		// 创建富文本编辑器
		mounted() {
			var editor = new E(this.$refs.editor)
			// 同步数组
			editor.customConfig.onchange = (html) => {
				this.ruleForm.content = html
			}

			// 配置本地图片上传
			// editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片，适用于小图片

			// 图片上传到服务器的API
			editor.customConfig.uploadImgServer = '/upload/editor/';
			// 配置上传图片的字段名
			editor.customConfig.uploadFileName = 'file';
			// 将图片大小限制为 2M
			editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024;
			// 配置ajax的header
			editor.customConfig.uploadImgHeaders = {
				Authorization: `Bearer ${sessionStorage.token}`
			};

			editor.create();
		},
		methods: {

			// 获取子分类
			async loadSubcate(id) {
				let { status, data } = await Category.subcate({ id });
				return data;
			},
			// 1级分类改变时，获取二级分类     改用侦听器来写
			// handleOptionChange(value){
			// 	this.loadSubcate(value).then((options)=>{
			// 		this.options_2nd = options;
			// 		this.ruleForm.cate_2nd = this.options_2nd[0].id;
			// 	})
			// },


			// 图片组件改变后，通知父组件更改信息
			handleImg(value) {
				this.ruleForm.main_photo = value;
			},



			//提交表单
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (!valid) return false;
					let { status, msg } = await Article.add({ ...this.ruleForm });
					if (status) {
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
</style>
