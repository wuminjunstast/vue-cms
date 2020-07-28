<template>
	<div>
		<el-card class="box-card">
			<div slot="header">
				<span>分类列表</span>
			</div>
			<!-- 树形组件 -->
			<el-tree ref="tree" node-key="id" lazy :load="loadNode" :default-expanded-keys="[0]" :props="defaultProps">
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span>{{ node.label }}</span>
					<span>
						<el-button type="text" icon="el-icon-edit" :disabled="node.level==1" size="mini" @click.stop="() => openEditModal(node,data)">
							编辑
						</el-button>
						<el-button type="text" icon="el-icon-plus" size="mini" @click.stop="() => openInsertModal(node,data)">
							添加
						</el-button>
						<el-button type="text" icon="el-icon-delete" size="mini" @click.stop="() => remove(node, data)">
							删除
						</el-button>
					</span>
				</span>
			</el-tree>
		</el-card>
		<!-- 添加弹窗 -->
		<el-dialog title="添加分类" :visible.sync="insertModalShow">
			<el-form :model="insertForm">
				<el-form-item label="分类名称" label-width="120px">
					<el-input v-model="insertForm.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="insertModalShow = false">取 消</el-button>
				<el-button type="primary" @click="handleInsertNode">添 加</el-button>
			</div>
		</el-dialog>
		<!-- 编辑弹窗 -->
		<el-dialog title="编辑分类" :visible.sync="editModalShow">
			<el-form :model="editForm">
				<el-form-item label="分类名称" label-width="120px">
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editModalShow = false">取 消</el-button>
				<el-button type="primary" @click="handleUpdataNode">保 存</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script>
	import { Category } from '@/api/index.js'
	export default {
		data() {
			return {
				defaultProps: {
					label: 'name'
				},
				insertForm: {
					name: '',
					parent_id: '',
				},
				editForm: {
					id: '',
					name: '',
					parent_id: '',
				},
				nodeData: {}, //节点数据
				node: {}, //节点
				insertModalShow: false,
				editModalShow: false,
			};
		},
		methods: {
			async loadNode(node, resolve) {
				// node代表节点对象
				// resolve:用于把数据返回给树的方法
				if (node.level == 0) {
					return resolve([{ id: 0, name: '全部分类' }]);
				}

				let { id } = node.data;
				let { status, data } = await Category.subcate({ id });
				if (status) {
					return resolve(data);
				}
			},
			// 打开编辑节点的model
			openEditModal(node, data) {
				this.editForm = { ...data };
				this.node = node;
				this.editModalShow = true;
			},
			// 编辑节点
			async handleUpdataNode() {
				// 表单校验  ajax
				let { status, msg, data } = await Category.edit({ ...this.editForm });
				if (status) {
					this.$message.success(msg);
					// 更新节点
					this.node.data = this.editForm;
					this.editModalShow = false;
				}
			},
			// 打开插入节点model
			openInsertModal(node, data) {
				// data 是点击的节点里的数据
				this.node = node;
				this.insertForm.parent_id = data.id;
				this.insertModalShow = true;
			},
			// 插入节点
			async handleInsertNode() {
				// 表单校验  ajax
				let { status, msg, data } = await Category.insert({ ...this.editForm });
				if (status) {
					this.$message.success(msg);
					// 让页面显示出新的树节点
					// 这里的data是ajax返回来的，里边是一个id
					this.$refs.tree.append({ ...data, ...this.insertForm }, this.node);
					this.insertModalShow = false;
				}
			},
			// 删除节点
			async remove(node, data) {
				// let { status, msg, data } = await Category.remove({...data});
				
				// const parent = node.parent;
				// const children = parent.data.children || parent.data;
				// const index = children.findIndex(d => d.id === data.id);
				// children.splice(index, 1);
			}
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
