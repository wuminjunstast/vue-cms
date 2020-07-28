<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>用户列表</span>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="#">
			</el-table-column>
			<el-table-column prop="username" label="用户名">
			</el-table-column>
			<el-table-column prop="nickname" label="昵称">
			</el-table-column>
			<el-table-column prop="sex" label="性别">
			</el-table-column>
			<el-table-column prop="tel" label="手机">
			</el-table-column>
			<el-table-column label="操作" align="center" min-width="180">
				<template scope="scope">
					<el-link :href="`#/user/edit/${scope.row.id}`" target="_blank" class="btn-space">
						<el-button type="primary" icon="el-icon-edit" size="mini" plain>修改</el-button>
					</el-link>
					<el-button type="primary" icon="el-icon-delete" size="mini" plain>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { User } from '@/api/index.js'
	export default {
		data() {
			return {
				tableData: []
			}
		},
		created() {
			// 获取列表数据
			this.loadlist();
			console.log(111);
		},
		methods: {
			async loadlist() {
				let { status, total, data } = await User.list({ pagesize: 10, pageindex: 1 });
				if (!status) return false;
				this.tableData = data;
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

	.table-box {
		padding: 0 10px;
		padding-bottom: 10px;
	}

	.btn-space {
		margin-right: 10px;
	}
</style>
