<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>管理员列表</span>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="#">
			</el-table-column>
			<el-table-column prop="username" label="用户名">
			</el-table-column>
			<el-table-column prop="fullname" label="姓名">
			</el-table-column>
			<el-table-column prop="sex" label="性别">
			</el-table-column>
			<el-table-column prop="tel" label="手机">
			</el-table-column>
			<el-table-column prop="email" label="邮箱" min-width="100px">
			</el-table-column>
			<el-table-column label="头像" align="center" width="50px">
				<template scope="scope">
					<el-image style="" :src="scope.row.avatar"></el-image>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" min-width="180">
				<template scope="scope">
					<!-- <router-link :to="{name: 'AdministratorsEdit',params:{id:scope.row.id}}" class="btn-space">
						<el-button type="primary" icon="el-icon-edit" size="mini" plain>修改</el-button>
					</router-link> -->

					<el-link :href="`#/administrators/edit/${scope.row.id}`" target="_blank"  class="btn-space">
						<el-button type="primary" icon="el-icon-edit" size="mini" plain >修改</el-button>
					</el-link>
					
					<el-button type="primary" icon="el-icon-delete" size="mini" plain @click="RemoveModel(scope.row.id,scope.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { Admin } from '@/api/index.js'
	export default {
		data() {
			return {
				tableData: []
			}
		},
		created() {
			this.loadlist();
		},
		methods: {
			async loadlist() {
				let { status, total, data } = await Admin.list();
				// data.forEach((item, index) => {
					// item.avatar = 'http://localhost:3001' + item.avatar.slice(2);
				// })
				// 图片使用了代理
				if (!status) return false;
				this.tableData = data;
			},
			RemoveModel(id, index) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '删除', {
					type: 'warning'
				}).then(async () => {
					let { status } = await Admin.remove({ id: id });
					if (!status) return false;
					this.tableData.splice(index, 1);
					this.$message.success('删除成功');
				}).catch(() => {
					this.$message.info('取消删除');
				});
			}
		}
	}
</script>

<style scoped>
	.btn-space {
		margin-right: 10px;
	}
</style>
