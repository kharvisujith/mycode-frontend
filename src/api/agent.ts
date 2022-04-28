import axios, { AxiosError, AxiosResponse } from "axios";
import { resolve } from "path";

import { toast } from 'react-toastify';
import { history } from './../index';

axios.defaults.baseURL = "https://localhost:44323/api"
axios.defaults.withCredentials = true

const resBody = (response: AxiosResponse) => response.data

const sleep = () => new Promise(resolve => setTimeout(resolve,500))

axios.interceptors.response.use(async response =>{
    await sleep()
    return response
},(error:AxiosError) => {
    const {data, status} = error.response!

    switch(status){
        case 400: 
        if(data.errors){
            const modelStateErrors : string [] = []
            for(const key in  data.errors){
                if(data.errors[key]){
                    modelStateErrors.push(data.errors[key])
                }       
            }
    
            throw modelStateErrors.flat()
            
        }
        toast.error(data.title)
        
        break
        case 404: 
        history.push('/not-found')
        break
        
        case 500: 
        // history.push('/server-error')
        history.push({
            pathname: '/server-error',
            state : {error: data}
        }
        )
        break
        
        case 401: toast.error(data.title)
        break

        default: break

    }
   // toast.error(data.title)

    return Promise.reject(error.response)
}
    )

const request = {
    get : (url : string) => axios.get(url).then(resBody),
    post : (url:string, body:{}) => axios.post(url, body).then(resBody),
    put : (url:string, body:{}) => axios.put(url, body).then(resBody),
    delete: (url:string) => axios.delete(url).then(resBody)
}

const catalog = {
    list : ()=>  request.get('products'),
    details : (id:number) => request.get(`products/${id}`)
}


const basket = {
    get : ()=> request.get('Basket'),
    addItem : (productId : number, quantity = 1)=> request.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeIt3em : (productId : number, quantity = 1)=> request.delete(`basket?productId=${productId}&quantity=${quantity}`)
}

const testErrors = {
    get400error: ()=>request.get('buggy/bad-request').catch(error => console.log(error)),
    get401error: ()=> request.get('buggy/unauthorised').catch(error=>console.log(error)),
    get404error: ()=> request.get('buggy/not-found').catch(error => console.log(error)),
    get500error: ()=> request.get('buggy/server-error').catch(error => console.log(error)),
    getvalidationerror: ()=> request.get('buggy/validation-error')
}




const agent = {
    catalog,
    testErrors,
    basket
}

export default agent;