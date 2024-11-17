import axios from 'axios';
import React, { useEffect, useState } from 'react';
import endpoint from '../endpoint/endpoints';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

import "./search.css";
import { notification } from 'antd';
import { Navigate } from 'react-router-dom';

const SearchPerson = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [searchuser, setsearchuser] = useState([])
    const token = Cookies.get("userDetail")

    let decodetoken = null;
    try {
        decodetoken = token ? jwtDecode(token) : null;
    } catch (error) {
        console.error("Invalid token:", error);
    }

    console.log(decodetoken)

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await axios.get(endpoint.allusers);
                if (response.status === 200) {
                    setAllUsers(response.data.data); // Ensure data is an array of user objects
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchAllUsers();
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        const userFilter = allUsers.filter((user) =>
            user.username && user.username.toLowerCase().includes(value.toLowerCase())
        );


        setsearchuser(userFilter); // Logs the filtered users
    };


    const sendfollow =  async(e) => {
        
        const detail = {
            folowerid:e.target.id,
            userid:decodetoken.id
        }

        const response = await axios.post(endpoint.folower, detail)
        console.log(response)

        if(response.status === 200){
            notification.success({
                message:'follow success'
            })
            Navigate('/profile')
        }
        if(response.status === 400) {
            notification.warning({
                message:"allreaddy followed"
            })
        }

    }

    // console.log(searchuser)
    return (
        <>
            <div className='searchbar'>
                <input
                    type='text'
                    onChange={handleChange}
                    value={inputValue}
                    placeholder="Search users..."
                />
            </div>

            <div className='friendscontainer'>
                {inputValue.length > 0 && searchuser.map((value) => (
                    <div className='frinds'>
                        <p id={value._id}>{value.name}</p>
                        <button id={value._id} onClick={sendfollow}>Follow</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SearchPerson;
