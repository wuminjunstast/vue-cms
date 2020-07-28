import axios from 'axios';

// 封装接口的函数,方便以后修改
// 获取文章列表，返回promise
let list = (data) => axios.get('/article/list', { params: data });

let remove = (data) => axios.post('/article/delete', data);

//获取文章详细信息
let detail = (data) => axios.get('/article/detail', { params: data });

let add = (data) => axios.post('/article/add', data);

let edit = (data) => axios.post('/article/edit', data);

export default {
	list,
	remove,
	detail,
	add,
	edit,
}
