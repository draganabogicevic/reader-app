import Axios from 'axios'

import { BASE_API_ENDPOINT } from '../constants'



export const Api = Axios.create({
  baseURL: BASE_API_ENDPOINT
})

console.log(Api)