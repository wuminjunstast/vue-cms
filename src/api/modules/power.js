import axios from 'axios';

// 获取角色
let list = (data) =>axios.get('/role/list');

// 添加角色
let insert = (data) =>axios.post('/role',data);

// 删除角色
let remove = (id) =>axios.delete(`/role/${id}`);

let updata = (id,data) =>axios.put(`/role/${id}`,data);



export default {
	list,
	insert,
	remove,
	updata,
}
