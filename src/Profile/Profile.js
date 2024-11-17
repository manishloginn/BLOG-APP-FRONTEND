import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import "./profile.css"
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import endpoint from '../endpoint/endpoints'
import { notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import Myblog from '../Homepage/Myblog'

const Profile = () => {

    const token = Cookies.get("userDetail")
    const [useritem, setuseritem] = useState()
    const [userDetail, setuserDetail] = useState({
        bio: '',
        coverImg: '',
        profileImg: '',
        username: ''
    })

    const navigate = useNavigate()
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
                setuseritem(response.data)
                const { username, bio, coverImg, profileImg } = response.data; // Ensure these fields exist in the API response
                setuserDetail((prev) => ({
                    ...prev,
                    username,
                    bio,
                    coverImg,
                    profileImg,
                }));
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        getuserdetail();
    }, [])

    console.log(useritem)

    const handelchange = (e) => {
        const { name, value } = e.target;
        setuserDetail((prev) => ({
            ...prev,
            [name]: value,
        }));

    }

    const handelsubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post(endpoint.afterRegisteration, userDetail)

        if (response.status === 200) {
            notification.success({
                message: 'Profile Updated successfully'
            })
            navigate('/')
        }
        // console.log(response)
    }

    // console.log(userDetail)
    return (
        <>
            {
                <div className='folowers-section'>
                    <div className='folowe'>
                        <span>Followers</span>
                        <span >{useritem?.folowers?.length}</span>
                    </div >
                    <div className='folowe'>
                        <span>Following</span>
                        <botton >{useritem?.folowing?.length}</botton>
                    </div>
                </div>
            }
            <form className='form' onSubmit={handelsubmit}>
                <div className='inputdiv'>
                    <label htmlFor='username'>username</label>
                    <input type='text' value={userDetail.username} placeholder='enter username or password' name='username' id='username' readOnly required />
                </div>

                <div className='inputdiv'>
                    <label htmlFor='bio'>bio</label>
                    <input type='text' value={userDetail.bio} placeholder='enter bio' onChange={handelchange} name='bio' id='bio' />
                </div>
                <div className='inputdiv'>
                    <label htmlFor='coverImg'>coverImg link</label>
                    <input type='text' value={userDetail.coverImg} placeholder='enter coverImg link ' onChange={handelchange} name='coverImg' id='coverImg' />
                </div>
                <div className='inputdiv'>
                    <label htmlFor='profileImg'>profile Img link</label>
                    <input type='text' value={userDetail.profileImg} placeholder='enter profileImg link ' name='profileImg' onChange={handelchange} id='profileImg' />
                </div>


                <button type='submit'>updated</button>
            </form>

            <div className='blogs'>
                <h1>My Posts</h1>
                <Myblog />
            </div>
        </>
    )
}

export default Profile
