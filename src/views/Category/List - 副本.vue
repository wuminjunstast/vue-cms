<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>分类列表</span>
		</div>
		<el-tree :data="data" :props="defaultProps">
			<span class="custom-tree-node" slot-scope="{ node, data }">
				<span>{{ node.label }}</span>
				<span>

					<el-button type="text" icon="el-icon-edit" size="mini">
						编辑
					</el-button>

					<el-button type="text" icon="el-icon-plus" size="mini">
						添加
					</el-button>
					<el-button type="text" icon="el-icon-delete" size="mini">
						删除
					</el-button>
				</span>
			</span>
		</el-tree>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				data: [{
					label: '全部分类',
					id: 1,
					children: [{
						id: 2,
						label: '科技',
						children: [{
							id: 6,
							label: '人工智能',
							children: [{
								// label: '三级 2-2-1'
							}]
						}, {
							id: 7,
							label: '黑客技术',
							children: [{
								// label: '三级 2-2-1'
							}]
						}]
					}, {
						id: 3,
						label: '娱乐',
						children: [{
							// label: '三级 2-2-1'
						}]
					}, {
						id: 4,
						label: '编程',
						children: [{
							id: 8,
							label: '前端',
							children: [{
								// label: '三级 2-2-1'
							}]
						}, {
							id: 9,
							label: 'JAVA',
							children: [{
								// label: '三级 2-2-1'
							}]
						}, {
							id: 10,
							label: 'PHP',
							children: [{
								// label: '三级 2-2-1'
							}]
						}]
					}, {
						id: 5,
						label: '设计',
						children: [{
							// label: '三级 2-2-1'
						}]
					}]
				}],

				defaultProps: {
					children: 'children',
					label: 'label'
				}
			};
			return {
				data: JSON.parse(JSON.stringify(data)),
				data: JSON.parse(JSON.stringify(data))
			}
		},
		methods: {}
	};
</script>

<style>
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>
