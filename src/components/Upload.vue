<template>
	<div class="upload-box">
		<el-upload class="avatar-uploader" action="/upload/common/" :show-file-list="false" :data="{type:img[1]}"
		 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :headers="headers">
			<img v-if="img[0]" :src="img[0]" class="avatar">
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
		<span v-if="img[0]" class="el-upload-list__item-delete" @click="handleRemove(img[0])">
			<i class="el-icon-delete"></i>
		</span>
	</div>
</template>

<script>
	import { Upload } from '@/api/index';
	export default {
		props: {
			img: { 
				type: Array
			}
		},
		data(){
			return{
				headers:{
					Authorization: `Bearer ${sessionStorage.token}`
				}
			}
		},
		methods: {
			// 上传成功后的处理
			handleAvatarSuccess(res) {
				if (!res.status) return false;
				this.$message.success(res.msg);
				this.$emit('onhandleImg', res.data);
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
						// 以后放到服务器上就不是localhost开头了，所以截取字符串用replace（）比较安全
						// imgSrc = '.' + imgSrc.slice(21);
						imgSrc = imgSrc.replace(/.+\/images/,'./images');
						let { status } = await Upload.remove({ src: imgSrc });
						if (!status) return false;
					}
					this.$emit('onhandleImg', '');
					this.$message.success('删除成功');
				}).catch(() => {
					this.$message.info('取消删除');
				});
			}
		}
	}
</script>

<style scoped>
	.upload-box {
		border: 1px dashed #d9d9d9;
		width: 178px;
		height: 178px;
		border-radius: 6px;
		position: relative;
	}

	.avatar-uploader .el-upload {
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
		position: absolute;
		top: 1px;
		left: 1px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		font-size: 24px;
		background-color: rgba(0, 0, 0, .3);
		opacity: 0;
	}
	.el-upload-list__item-delete:hover {
		opacity: 1;
	}
</style>
