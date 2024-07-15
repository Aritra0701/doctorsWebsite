export const endpoints={
    auth:{
        register:"register",
        login:"login"
    },
    cms:{
        contact:"createcontact",
        allDoctor:"alldoctordepartment",
        service:"alldepartment",
        contact:"createcontact",
        department:"alldepartment",
        departmentWiseDoctor:"departmentidwisedoctor",
        doctorDetails:"doctordetails",
        createappointment:"createappointment",
        blogs:"allblog",
        singleBlog:"singleblog",
        recentBlog:"recentblog",
        searchBlog:"blogsearch"
    }
}

export const successNotificationEndPoints=[
    endpoints.auth.register,
    endpoints.auth.login,
    endpoints.cms.contact,
    endpoints.cms.allDoctor,
    endpoints.cms.doctorDetails,
    endpoints.cms.createappointment,
    endpoints.cms.service,
    endpoints.cms.department,
    endpoints.cms.departmentWiseDoctor,
    endpoints.cms.blogs,
    endpoints.cms.singleBlog,
    endpoints.cms.recentBlog,
    endpoints.cms.searchBlog,
    endpoints.cms.contact,

]