import axios from 'axios';
const API_URL = 'http://192.168.110.101:5000';


export const postApi = async(url: string, post: object, token?: string ) => {
   const res = await axios.post( `${API_URL}/api/${url}`, post, {
      headers: { Authorization: token}
   })
   return res;
}

export const getApi = async(url: string, token?: string ) => {
   const res = await axios.get(`${API_URL}/api/${url}`, {
      headers: { Authorization: token}
   })
   return res;
}

export const patchApi = async(url: string, post: object, token?: string ) => {
   const res = await axios.patch( `${API_URL}/api/${url}`, post, {
      headers: { Authorization: token}
   })
   return res;
}

export const putApi = async(url: string, post: object, token?: string ) => {
   const res = await axios.put( `${API_URL}/api/${url}`, post, {
      headers: { Authorization: token}
   })
   return res;
}

export const delApi = async(url: string, token?: string ) => {
   const res = await axios.delete( `${API_URL}/api/${url}`, {
      headers: { Authorization: token}
   })
   return res;
}