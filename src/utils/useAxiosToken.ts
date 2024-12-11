// import { useContext } from 'react'

// import { jwtDecode } from 'jwt-decode'

// import Cookies from 'js-cookie';

// import dayjs from 'dayjs'
// import domain from '@/constants/constants'
// import axios from 'axios'

const useAxios = () => {
    // const authTokens = localStorage.getItem('authTokens')
    // const baseURL = `${domain}/backend_api/`
    // const accessToken = JSON.parse(authTokens!)?.access;
    
    // //GET
    // const axiosInstanceGet = axios.create({
    //     baseURL,
    //     headers: {
    //        'Content-Type': 'application/json',
    //     }
    // })
    
    // const axiosInstanceAuthenticationGet = axios.create({
    //     baseURL,
    //     headers: {
    //        'Content-Type': 'application/json',
    //        "X-CSRFToken": Cookies.get('csrftoken'),	
    //        Authorization: `Bearer ${accessToken}`,
    //     }
    // })

    // //POST
    // const axiosInstancePost = axios.create({
    //     baseURL,
    //     headers: {
    //         "X-CSRFToken": Cookies.get('csrftoken'),	
    //         Authorization: `Bearer ${accessToken}`,
    //         "Content-Type": "application/json"
    //     }
    // })

    // //Function Interceptor
    // const RefreshToken = async (req) => {
    //     if(!user) return req
        
    //     const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 3

    //     if(!isExpired) return req

    //     await axios.get(`${baseURL}token/refresh/`, {
    //     withCredentials: true,
    //     headers: {
    //       "Content-Type": "application/json",
    //     }}).then((response) => {
    //         if(response.data.access === null) {
    //           logoutUser()
    //           return;
    //         }                   
    //         localStorage.setItem("authTokens", JSON.stringify(response.data))

    //         setAuthTokens(response.data)
    //         const token = response.data

    //         setUser(jwtDecode(token.access))

    //         req.headers.Authorization = `Bearer ${token.access}`       
    //     });
    //     return req;
    // }

    // //Use Interceptors
    // axiosInstancePost.interceptors.request.use(
    //     (req) => RefreshToken(req),
    //     (error) => Promise.reject(error)
    // );
    // axiosInstanceAuthenticationGet.interceptors.request.use(
    //     (req) => RefreshToken(req),
    //     (error) => Promise.reject(error)
    // );
    
    // return {
    //     axiosInstanceAuthenticationGet,
    //     axiosInstancePost,
    //     axiosInstanceGet,
    // }
}

export default useAxios;