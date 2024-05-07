import { BASE_URL } from "./baseUrl"
import { commonAPI } from "./commonAPI"


// request to register user
export const registerAPI=async(reqBody)=>{
     return   await commonAPI('POST',`${BASE_URL}/user/register`,reqBody,"")
}

//request to login
export const loginAPI=async(reqBody)=>{
     return await commonAPI('POST',`${BASE_URL}/user/login`,reqBody,"")
}

//request to add project
export const AddProjectAPI=async(reqBody,reqHeader)=>{
     return await commonAPI('POST',`${BASE_URL}/add-project`,reqBody,reqHeader)
}

// request to get home project
export const HomeProjectAPI=async()=>{
     return await commonAPI('GET',`${BASE_URL}/home-project`,"","")
}

// request to get all project

// query parameter =path?key=value
// https://www.bing.com/search?q=india

export const allProjectAPI=async(searchkey,reqHeader)=>{
     return await commonAPI('GET',`${BASE_URL}/all-project?search=${searchkey}`,"",reqHeader)
}


// request to get user project

export const userProjectAPI=async(reqHeader)=>{
     return await commonAPI('GET',`${BASE_URL}/user/all-project`,"",reqHeader)
}

// request to delete user project
export const deleteUserProjectAPI=async(id,reqHeader)=>{
     return await commonAPI('DELETE',`${BASE_URL}/user-project/delete/${id}`,{},reqHeader)
}

// request to edt the user project
export const editUserProject=async(projectId,reqBody,reqHeader)=>{
     return await commonAPI('PUT',`${BASE_URL}/project/edit/${projectId}`,reqBody,reqHeader)
}

// request to update userprofile
export const updateProfileAPI=async(reqBody,reqHeader)=>{
     return await commonAPI('PUT',`${BASE_URL}/profile-update`,reqBody,reqHeader)
}

