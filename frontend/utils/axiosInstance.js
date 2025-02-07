import axios from 'axios'
const BASE_URL='https://note-taker-qz1j-o4qfie8gc-yihunies-projects-d4703010.vercel.app';
const axiosInstance=axios.create({
    baseURL:BASE_URL,
    timeout:10000,
    headers:{
        "Content-Type":"application/json",
    },

});
axiosInstance.interceptors.request.use((config)=>{
    const accessToken=localStorage.getItem("token");
    if(accessToken){
        config.headers.Authorization=`Bearer ${accessToken}` ;
    }
    return config;

},
(error)=>{
    return Promise.reject(error);
})

export default axiosInstance;
