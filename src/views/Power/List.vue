<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>权限列表</span>
			<el-button style="float: right; padding: 3px 0" type="text" @click="openInsertModel">添加角色</el-button>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="#">
			</el-table-column>
			<el-table-column label="分类">
				<template scope="scope">
					　<el-button v-text="scope.row.name" type="primary" size="mini" plain></el-button>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" min-width="180">
				<template scope="scope">
					　　　　　　<el-button type="primary" icon="el-icon-edit" size="mini" plain :disabled="scope.row.name == '超级管理员'" @click="EditModel(scope.row,scope.$index)">修改</el-button>
					　　　　　　<el-button type="danger" icon="el-icon-delete" size="mini" plain :disabled="scope.row.name == '超级管理员'"
					 @click="RemoveModel(scope.row.id,scope.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { Power } from '@/api/index.js'
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
			// 获取后台列表
			async loadlist() {
				let { status, total, data } = await Power.list();
				if (!status) return false;
				this.tableData = data;
			},
			// 添加角色
			openInsertModel() {
				this.$prompt('请输入添加角色的名称', '添加角色', {
					inputPattern: /\S/,
					inputErrorMessage: '不能输入空白字符'
				}).then(async ({ value }) => {
					let { status, data } = await Power.insert({ name: value });
					if (!status) return false;
					this.tableData.push({ name: value, ...data });
					this.$message.success('添加成功');
				}).catch(() => {
					this.$message.info('取消添加');
				});
			},
			RemoveModel(id, index) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '删除', {
					type: 'warning'
				}).then(async () => {
					let { status } = await Power.remove(id);
					if (!status) return false;
					this.tableData.splice(index, 1);
					this.$message.success('删除成功');
				}).catch(() => {
					this.$message.info('取消删除');
				});
			},
			EditModel(data,index) {
				this.$prompt('请修改添加角色的名称', '编辑角色', {
					inputValue:data.name,
					inputPattern: /\S/,
					inputErrorMessage: '不能输入空白字符'
				}).then(async ({ value }) => {
					let { status } = await Power.updata(data.id,{name:value});
					if (!status) return false;
					
					// 更新数据
					data.name = value;
					this.$set(this.tableData, index, data);
					
					// this.tableData.splice(index, 1);
					this.$message.success('添加成功');
				}).catch(() => {
					this.$message.info('取消添加');
				});
			}
		}

	}
</script>

<style>
</style>
