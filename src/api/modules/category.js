import axios from 'axios';

// 获取子集分类
let subcate = (data) => axios.get('/category/sub',{params:data});

// 获取所有集分类
// let list = {data} => axios.get('/category/sub',{params:data});

// 新增节点
let insert = (data) => axios.post('/category/add', data);

// 编辑节点
let edit = (data) => axios.post('/category/edit', data);

// 删除节点
let remove = (data) => axios.post('/category/delete', data);

export default {
	subcate,
	insert,
	edit,
	remove,
}	
