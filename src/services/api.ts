import axios from 'axios'

const api = (baseURL: string) => {
  return axios.create({
    baseURL
  })
}

export default api
