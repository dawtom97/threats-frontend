import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000/'});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
})

export const fetchThreat = (id) => API.get(`/threats/${id}`);
export const fetchThreats = () => API.get('/threats');
export const userLogin = (formData) => API.post('/user/signin',formData);
export const userRegister = (formData) => API.post('/user/signup',formData);
export const createThreat = (formData) => API.post('/threats', formData);
export const deleteThreat = (id) => API.delete(`/threats/${id}`);
export const updateThreat = (id,formData) => API.patch(`/threats/${id}`, formData);
