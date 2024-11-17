import React, { useState } from 'react'
import './login.css'
import Cookies from 'js-cookie'


import Loginjpg from './login.png'
import axios from 'axios'
import endpoint from '../endpoint/endpoints'
import { notification } from 'antd'
import { useNavigate } from 'react-router-dom'





const Login = ({ login, setlogin }) => {
    const [data, setdata] = useState({
        username: '',
        password: ''
    })
    const handelchange = (e) => {
        const { name, value } = e.target;
        setdata((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const navigate = useNavigate()
    const handelsubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post(endpoint.login, data)
        // console.log(response)
        if (response.status === 200) {
            navigate('/')
            Cookies.set("userDetail", response.data.token)
        }
    }

    return (
        <form className='form' onSubmit={handelsubmit}>
            <label htmlFor='username'>username</label>
            <input type='text' placeholder='enter username or password' name='username' id='username' onChange={handelchange} value={data.username} required />
            <label htmlFor='password'>password</label>
            <input type='text' id='password' placeholder='enter password' name='password' onChange={handelchange} value={data.password} required />
            <button type='submit'>Log in</button>
            <p onClick={() => setlogin((prev) => !prev)}>Don't have an account .. ?</p>
        </form>
    )
}


const Signup = ({ login, setlogin }) => {
    const [data, setdata] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    const handelchange = (e) => {
        const { name, value } = e.target;
        setdata((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    const handelsubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post(endpoint.registration, data)
        if (response.status === 200) {
            notification.success({
                message: "Registeration successfull"
            })
            setlogin(true)
        }
        if (response.status === 400) {
            notification.warning({
                message: "email and password allreaddy registeres"
            })
        }
    }

    return (
        <form className='form' onSubmit={handelsubmit}>

            <label htmlFor='name'>Name</label>
            <input type='text' placeholder='enter name or password' name='name' id='name' onChange={handelchange} value={data.name} required />

            <label htmlFor='username'>username</label>
            <input type='text' placeholder='enter username or password' name='username' id='username' onChange={handelchange} value={data.username} required />

            <label htmlFor='email'>email</label>
            <input type='text' placeholder='enter email or password' name='email' id='email' onChange={handelchange} value={data.email} required />

            <label htmlFor='password'>password</label>
            <input type='text' id='password' placeholder='enter password' name='password' onChange={handelchange} value={data.password} required />

            <button type='submit'>Sign up</button>

            <p onClick={() => setlogin((prev) => !prev)}>Allreaddy have an account .. ?</p>

        </form>
    )
}



const LoginPage = () => {

    const [login, setlogin] = useState(true)



    return (
        <div className='logincontainer'>
            <div>
                <img src={Loginjpg} alt='img' />
            </div>
            <div className='loginform'>

                {
                    login ? <Login login={login} setlogin={setlogin} /> : <Signup login={login} setlogin={setlogin} />
                }

            </div>
        </div>
    )
}

export default LoginPage
