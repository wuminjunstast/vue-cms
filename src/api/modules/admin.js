import axios from 'axios';

// 封装接口的函数,方便以后修改
// 登录
let login = (data) => axios.post('/admin/login', data);
// 注册
let register = (data) => axios.post('/admin/register', data);
// 获取管理员个人资料
let info = (data) => axios.get('/admin/info',{params:data});
// 获取管理员列表
let list = (data) =>axios.get('/admin/list');
// 删除管理员
let remove = (data) => axios.post('/admin/delete', data);
// 编辑管理员个人资料
let edit = (data) => axios.post('/admin/info', data);


export default {
	login,
	register,
	info,
	list,
	remove,
	edit,
}
