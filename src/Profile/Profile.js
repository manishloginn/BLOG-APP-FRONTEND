import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import endpoint from '../endpoint/endpoints'

const Profile = () => {

    const token = Cookies.get("userDetail")
    const [userDetail, setuserDetail] = useState()
    let decodetoken = null;
    try {
        decodetoken = token ? jwtDecode(token) : null;
    } catch (error) {
        console.error("Invalid token:", error);
    }


    useEffect(() => {

        const getuserdetail = async () => {
            if (!decodetoken) {
                console.error("No valid token decoded");
                return;
            }
            const { id } = decodetoken;

            try {

                const response = await axios.get(`${endpoint.userDetail}?id=${id}`);
                setuserDetail(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        getuserdetail();
    }, [])

    console.log(userDetail)
    return (
        <form className='form' >
            <label htmlFor='username'>username</label>
            <input type='text' placeholder='enter username or password' name='username' id='username' required />
            <label htmlFor='password'>password</label>
            <input type='text' id='password' placeholder='enter password' name='password' required />
            <button type='submit'>Log in</button>
        </form>
    )
}

export default Profile
