import axios from 'axios';
import { Message } from 'element-ui';
import router from '../router';

import store from '../store';
// create an axios instance
axios.defaults.withCredentials = true;
const service = axios.create({
	baseURL: process.env.VUE_APP_URL,
	// timeout: 15000
});


service.interceptors.request.use(config => {
	return config;
}, error => {
	console.log(error);
	Promise.reject(error);
});


service.interceptors.response.use(
	response => {
		return response.data;
	},
	error => {
		console.log('err' + error);
		Message({
			message: error.message,
			type: 'error',
		});
		return Promise.reject(error);
	}
);



export default service;
