import React, { useState } from 'react'
import './login.css'
import Cookies from 'js-cookie'


import Loginjpg from './login.png'
import axios from 'axios'
import endpoint from '../endpoint/endpoints'
import { notification } from 'antd'
import { useNavigate } from 'react-router-dom'





const Login = ({ login, setlogin }) => {


    const [loader, setloader] = useState(false)

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
        setloader(true)
        try {
            const response = await axios.post(endpoint.login, data)
            if (response.status === 200) {
                navigate('/')
                Cookies.set("userDetail", response.data.token)
                setloader(false)
            } else {
                console.log('Login failed with status:', response.status);
            }
        } catch (error) {
            notification.error({
                message: "Login Failed",
                description: error.response?.data?.message || 'An error occurred, please try again later.',

            })
        }
        finally {

            setloader(false);
        }


    }



    return (

        <form className='form' onSubmit={handelsubmit}>
            {loader ? <div className="loader">
                <div className='loading'></div>
            </div> :
                <>
                    <label htmlFor='username'>username</label>
                    <input type='text' placeholder='enter username or password' name='username' id='username' onChange={handelchange} value={data.username} required />
                    <label htmlFor='password'>password</label>
                    <input type='text' id='password' placeholder='enter password' name='password' onChange={handelchange} value={data.password} required />
                    <button disabled={loader} type='submit'>Log in</button>
                    <p onClick={() => setlogin((prev) => !prev)}>Don't have an account .. ?</p>
                </>
            }

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
        e.preventDefault();
        try {
            const response = await axios.post(endpoint.registration, data);
            if (response.status === 200) {
                notification.success({
                    message: "Registration successful"
                });
                setlogin(true);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                notification.warning({
                    message: "Email and password already registered"
                });
            } else {
                notification.error({
                    message: "Registration failed",
                    description: error.message
                });
            }
        }
    };


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
