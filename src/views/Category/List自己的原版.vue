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
				// data: [{
				// 	label: '全部分类',
				// 	children: [{
				// 		label: '科技',
				// 		children: [{
				// 			label: '人工智能',
				// 			children: [{
				// 				// label: '三级 2-2-1'
				// 			}]
				// 		}, {
				// 			label: '黑客技术',
				// 			children: [{
				// 				// label: '三级 2-2-1'
				// 			}]
				// 		}]
				// 	}, {
				// 		label: '娱乐',
				// 		children: [{
				// 			label: '摄影'
				// 		},{
				// 			label: '电影'
				// 		},{
				// 			label: 'IT新闻'
				// 		}]
				// 	}, {
				// 		label: '编程',
				// 		children: [{
				// 			label: '前端',
				// 			children: [{
				// 				// label: '三级 2-2-1'
				// 			}]
				// 		}, {
				// 			label: 'JAVA',
				// 			children: [{
				// 				// label: '三级 2-2-1'
				// 			}]
				// 		}, {
				// 			label: 'PHP',
				// 			children: [{
				// 				// label: '三级 2-2-1'
				// 			}]
				// 		}]
				// 	}]
				// }],


				data[],


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
		methods: {
			// // 遍历数据源,先把第一个级的数据放入数组
			// for (let i = 0; i < returnData.length; i++) {
			// 	if (returnData[i].parent_id === 0) {
			// 		this.data.push(returnData[i]);
			// 		// returnData.splice(i, 1);
			// 	}
			// }

			// for (let i = 0; i < returnData.length; i++) {

			// }
			let list = [{
					"id": 1,
					"name": "科技",
					"parent_id": 0,
					"parent_name": null
				},
				{
					"id": 2,
					"name": "娱乐",
					"parent_id": 0,
					"parent_name": null
				},
				{
					"id": 3,
					"name": "摄影",
					"parent_id": 2,
					"parent_name": "娱乐"
				},
				{
					"id": 4,
					"name": "电影",
					"parent_id": 2,
					"parent_name": "娱乐"
				},
				{
					"id": 5,
					"name": "人工智能",
					"parent_id": 1,
					"parent_name": "科技"
				},
				{
					"id": 6,
					"name": "黑客技术",
					"parent_id": 1,
					"parent_name": "科技"
				},
				{
					"id": 7,
					"name": "编程",
					"parent_id": 0,
					"parent_name": null
				},
				{
					"id": 8,
					"name": "前端",
					"parent_id": 7,
					"parent_name": "编程"
				},
				{
					"id": 9,
					"name": "JAVA",
					"parent_id": 7,
					"parent_name": "编程"
				},
				{
					"id": 10,
					"name": "PHP",
					"parent_id": 7,
					"parent_name": "编程"
				},
				{
					"id": 11,
					"name": "IT新闻",
					"parent_id": 2,
					"parent_name": "娱乐"
				}
			]




			changeToTree(list) {
				// 保存遍历的结果
				let result = [];
				let map = {};
				//取出所有id保存在map中
				list.forEach(item => {
					map[item.id] = item;
				});

				list.forEach(item => {
					let parent = map[item.parent_id];
					if (parent) {
						(parent.children || (parent.children = [])).push(item);

					} else {
						result.push(item);
					}
				});
				this.data = result;
			}


			// n的阶乘
			function fn(n) {
				if (n == 0) {
					return 1;
				}
				return n * fn(n - 1);
			}


			//回头做出递归
			function convert(arr) {
				// 扁平化数组转换成树级结构
				let result = [];
				arr.forEach((item, index) => {
					if (item.parent_id == 0) {
						result.push(item);
					}
				});

				result.forEach((item) => {
					let children = arr.filter((cate) => cate.parent_id == item.id);
					item.children = children;
				});
				return result;
			}





			// //遍历父级id，如果是0的话
			// this.data[0].children.push({ 'label', 当前name });


			// // 增加节点的函数
			// append(data) {
			// 	const newChild = { id: id++, label: 'testtest', children: [] };
			// 	if (!data.children) {
			// 		this.$set(data, 'children', []);
			// 	}
			// 	data.children.push(newChild);
			// },
		}
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
