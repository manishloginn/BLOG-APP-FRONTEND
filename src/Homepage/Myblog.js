import axios from 'axios'
import React, { useEffect, useState } from 'react'
import endpoint from '../endpoint/endpoints'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { notification } from 'antd'
import "./blog.css"
import { LikeFilled, MessageFilled } from '@ant-design/icons'

const Myblog = () => {

    const token = Cookies.get("userDetail")

    const [myblog, setmyblog] = useState([])

    const [commentToggles, setCommentToggles] = useState({});

    let decodetoken = null;
    try {
        decodetoken = token ? jwtDecode(token) : null;
    } catch (error) {
        console.error("Invalid token:", error);
    }

    useEffect(() => {
        if (!decodetoken) {
            console.error("No valid token decoded");
            return;
        }
        const { id } = decodetoken;
        const fetmyblog = async () => {
            try {
                const response = await axios.get(`${endpoint.myblog}?userid=${id}`);
                notification.success({
                    message: "Blog Fetch successful"
                })
                setmyblog(response.data.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        }

        fetmyblog()
    }, []);


    const handleLike = async (blogId) => {
        try {
            const response = await axios.post(endpoint.bloglike,
                {
                    blogId: blogId,
                    userId: decodetoken?.id,
                });
           
                if(response.status === 200){
                    notification.success({
                        message:"You like this post"
                    })
                    setmyblog((prevBlogs) =>
                        prevBlogs.map((blog) =>
                            blog._id === blogId
                                ? { ...blog, likes: response.data.likes }
                                : blog
                        )
                    );
                }            
        } catch (error) {
            console.error("Error adding like:", error);
        }
    };

    const handleCommentToggle = (id) => {
        setCommentToggles((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const [comment, setcomment] = useState('')

    const handelcommentsubmit = async ({e, id}) => {
        e.preventDefault()

        const output = {
            blogid:id,
            comment:comment,
            userid:decodetoken?.id
        }

       const response = await  axios.post(endpoint.blogcomment, output )
       if(response.status === 200){
        setcomment('')
        notification.success({
            message:'comment success'
        })
       }
       console.log(response)

    }

    console.log(myblog);
    return (
        <div className='myblogcontainer'>
            {myblog && myblog.length > 0 ? (
                myblog.map((blog, index) => (
                    <div key={index} className="blog-item">
                        <h2>{blog.title}</h2>
                        <p>{blog.textBody}</p>
                        <small>Created by: {blog.userId.name} ({blog.userId.email})</small>
                        <p>Created at: {new Date(blog.createdAt).toLocaleDateString()}</p>
                        <div className="likecomment">
                            <div className="like">
                                <LikeFilled
                                    id={blog._id}
                                    onClick={(e) => handleLike(blog._id)} />
                                <span>{blog.likes && blog.likes.length > 0 ? blog.likes.length : 0}</span>
                            </div>
                            <div className="comment-section">

                                <span onClick={() => handleCommentToggle(blog._id)} ><MessageFilled /> Comments</span>
                                {commentToggles[blog._id] && (
                                    blog.comments && blog.comments.length > 0 ? (
                                        blog.comments.map((comment, index) => (
                                            <div key={index} className="comment">
                                                <p>{comment.user.name}</p>
                                                <p>{comment.text}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No comments yet</p>
                                    )

                                )}
                                {
                                    commentToggles[blog._id] && (
                                        <form onSubmit={(e) => handelcommentsubmit({e, id:blog._id})}>
                                            <input type='text' placeholder='write new comment' onChange={(e) => setcomment(e.target.value)} value={comment} />
                                            <button id={blog.id} type='submit'> Comment</button>
                                        </form>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No blogs found</p>
            )}
        </div>
    );
};

export default Myblog;
