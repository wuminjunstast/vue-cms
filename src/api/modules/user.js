import axios from 'axios';

// 获取用户列表
let list = (data) =>axios.get('/user/list');

let info = (data) =>axios.get('/user',{params:data});

let updata = (id,data) =>axios.put(`/user/${id}`,data);


export default {
	list,
	info,
	updata,
}
