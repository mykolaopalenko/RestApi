import axios from 'axios';


const instance = axios.create({
   baseURL: 'https://jsonplaceholder.typicode.com/posts'
})

export const getPosts = async(page = 1) =>{
   const {data} = await instance.get(`/?_page=${page}&_limit=12`)
   return data
}

export const searchPosts = async(q, _page=1) =>{
   const {data} = await instance.get(`?_page=${_page}${q}=internet`)
   return data
}