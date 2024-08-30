import axios from "axios"; 

let BASE_URL = "http://127.0.0.1:8000/"

const axiosInstance = axios.create({
    baseURL:BASE_URL, 
    headers :{
        // Authorization:localStorage.getItem('access_token')
        //     ? "JWT "+ localStorage.getItem('access_token')
            // :null,
        'Content-Type' : "application/json",
        Accept:'application/json',
    }
})

export default axiosInstance;