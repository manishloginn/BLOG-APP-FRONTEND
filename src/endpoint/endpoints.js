const baseUrl = 'https://blog-app-backend-m66w.onrender.com/'

const endpoint ={
    registration : `${baseUrl}userregister`,
    login : `${baseUrl}loginuser`,
    afterRegisteration : `${baseUrl}afterRegisteration`,
    userDetail : `${baseUrl}loginuserDetail`,
    myblog : `${baseUrl}getblog`,
    bloglike : `${baseUrl}bloglike`,
    blogcomment : `${baseUrl}blogcomment`,
    afterRegisteration : `${baseUrl}afterRegisteration`,
    allusers : `${baseUrl}allusers`,
    folower : `${baseUrl}folower`,
    addblog : `${baseUrl}userBlog`,
}

module.exports = endpoint