const baseUrl = 'http://localhost:5000/'

const endpoint ={
    registration : `${baseUrl}userregister`,
    login : `${baseUrl}loginuser`,
    afterRegisteration : `${baseUrl}afterRegisteration`,
    userDetail : `${baseUrl}loginuserDetail`,
    myblog : `${baseUrl}getblog`,
    bloglike : `${baseUrl}bloglike`,
    blogcomment : `${baseUrl}blogcomment`,
}

module.exports = endpoint