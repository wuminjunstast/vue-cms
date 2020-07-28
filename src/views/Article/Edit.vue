<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>编辑文章</span>
		</div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="标题" prop="title" required>
				<el-input v-model="ruleForm.title"></el-input>
			</el-form-item>
			<el-form-item label="描述" prop="description" required>
				<el-input v-model="ruleForm.description"></el-input>
			</el-form-item>
			<el-form-item label="分类" required>
				<el-col :span="6">
					<el-select placeholder="请选择一级分类" v-model="ruleForm.cate_1st" @change="handleOptionChange">
						<el-option v-for="option in options_1st" :key="option.id" :label="option.name" :value="option.id"></el-option>
					</el-select>
				</el-col>
				<el-col :span="6">
					<el-select placeholder="请选择二级分类" v-model="ruleForm.cate_2nd">
						<el-option v-for="option in options_2nd" :key="option.id" :label="option.name" :value="option.id"></el-option>
					</el-select>
				</el-col>
			</el-form-item>

			<el-form-item label="主图" prop="imageUrl">
				<upload :img="[ruleForm.main_photo,'common']" @onhandleImg="handleImg"></upload>
			</el-form-item>
			<el-form-item label="内容" prop="content">
				<div ref="editor">
					
				</div>
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
		props: ['id'],
		components: {
			upload,
		},
		data() {
			return {
				imageUrl: '',
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
					}]

				},
				options_1st: [],
				options_2nd: []
			};
		},
		// 侦听路由的变化
		watch: {
			'$route'(to, from) {
				let { id } = to.params;
				this.loadInfo(id);
			}
		},
		// 创建富文本编辑器
		async mounted() {
			
			// 使用了3个异步，保证了这三个步骤的顺序不会乱
			//获取一级分类
			this.options_1st = await this.loadSubcate(0);
			// 获取详情
			let article = await this.loadInfo(this.id);
			this.ruleForm = article;
			// 获取二级分类
			this.options_2nd = await this.loadSubcate(article.cate_1st);
			
			var editor = new E(this.$refs.editor)
			editor.customConfig.onchange = (html) => {
				this.ruleForm.content = html;
			}
			editor.create();
			// 把初始内容放入富文本编辑器
			editor.txt.html(this.ruleForm.content);
		},
		methods: {
			// 1级分类改变时，获取二级分类
			async handleOptionChange(value){
				let options = await this.loadSubcate(value);
				this.options_2nd = options;
				this.ruleForm.cate_2nd = options[0].id;
			},
			// 获取具体文章信息
			async loadInfo(id) {
				let { status, data } = await Article.detail({ id });
				if (!status) return false;
				return data;
			},
			// 获取子分类
			async loadSubcate(id) {
				let { status, data } = await Category.subcate({ id });
				if(status) return data;
			},
			// 图片组件改变后，通知父组件更改信息
			handleImg(value) {
				this.ruleForm.main_photo = value;
			},
			//提交表单
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (!valid) return false;
					let { status, msg } = await Article.edit({ ...this.ruleForm });
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
