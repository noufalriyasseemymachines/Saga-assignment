import axios from 'axios'
const Base_Url="http://localhost:8000/api"

const api=axios.create({
    baseURL:Base_Url,
    headers:{
        'Content-Type':'application/json',
    }
})

export default api