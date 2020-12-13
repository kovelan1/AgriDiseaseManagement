import axios from 'axios';
import qs from 'qs';
import localStorageService from "./localStorageService"
// ------------------disease record APIs -----------------------
export const getAllRecords = async () => {

    let res = await axios({
        method: 'get',
        url: "http://localhost:8082/api/diseasesRecords",
    })

    return res
}

export const getCurrentIssuesRecords = async () => {

    let res = await axios({
        method: 'get',
        url: "http://localhost:8082/api/diseasesRecords/current",
    })

    return res
}

export const addDiseaseRequest = async (data) => {

    let res = await axios({
        method: 'post',
        url: "http://localhost:8082/api/diseasesRecord",
        data: data
    })

    return res
}

export const addResponceToRequest = async (data,id) => {

    let res = await axios({
        method: 'put',
        url: `http://localhost:8082/api/diseasesRecord/responce/${id}`,
        data: data
    })

    return res
}

export const getRecodeofAi = async (id) => {

    let res = await axios({
        method: 'get',
        url: `http://localhost:8082/api/diseasesRecord/ai/${id}`,
    })

    return res
}

export const getRecodeofFarmer = async (id) => {

    let res = await axios({
        method: 'get',
        url: `http://localhost:8082/api/diseasesRecord/farmer/${id}`,
    })

    return res
}

export const removeDiseaseRecord = async (id) => {

    let res = await axios({
        method: 'delete',
        url: `http://localhost:8082/api/diseasesRecord/${id}`,
    })

    return res
}

// ------------------section APIs request handle here-----------------------
export const getSections = async () => {

    let res = await axios({
        method: 'get',
        url: "http://localhost:8080/sections",
    })

    return res
}

export const addBooks = async (data) => {

    let res = await axios({
        method: 'post',
        url: "http://library.ap-southeast-1.elasticbeanstalk.com/api/v1/books",
        data: data
    })

    return res
}

export const removeBooks = async (id) => {

    let res = await axios({
        method: 'delete',
        url: `http://library.ap-southeast-1.elasticbeanstalk.com/api/v1/books/delete/${id}`,
    })

    return res
}



//---------- oauth services--------------

export const chkToken = async (email,password )=> {
    var data={
        'grant_type':'password',
        'username': email,
        'password':password
    }
    let res = await axios({
        method: 'post',
        url: "http://localhost:8080/oauth/token",
        data: qs.stringify(data),
    
        auth: {
            username: "web",
            password: "pin"
        },
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
            'Authorization': 'Basic bW9iaWxlOnBpbg=='
        },
    })
    return res;

    
}

export const getToken = async (email,password )=> {
    var data={
        'grant_type':'password',
        'username': email,
        'password':password
    }
    let res = await axios({
        method: 'post',
        url: "http://localhost:8080/oauth/token",
        data: qs.stringify(data),
    
        auth: {
            username: "web",
            password: "pin"
        },
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
            'Authorization': 'Basic bW9iaWxlOnBpbg=='
        },
    })

    return res
}

export const getUser = async () => {

    let res = await axios({
        method: 'get',  
        url: "http://localhost:8081/api/user",
    })

    return res
}

export const getUserById = async (id) => {

    let res = await axios({
        method: 'get',
        url: `http://localhost:8081/api/user/${id}`,
    })

    return res
}

export const signUp = async (data) => {

    let res = await axios({
        method: 'post',
        url: "http://localhost:8081/api/user/signup-user",
        data: data
    })

    return res
}

export const updateUserLocation = async (data) => {

    let res = await axios({
        method: 'post',
        url: "http://localhost:8081/api/user/update-user",
        data: data
    })

    return res
}

export const activateOfficer = async (id) => {

    let res = await axios({
        method: 'post',
        url: `http://localhost:8081/api/user/active/officer/${id}`,
    })

    return res
}

export const getOfficersS = async () => {

    let res = await axios({
        method: 'get',  
        url: "http://localhost:8081/api/user/all/officers",
    })

    return res
}

//-------------------- disease ---------------

export const createDisease = async (data) => {

    let res = await axios({
        method: 'post',
        url: "http://localhost:8082/api/disease",
        data: data
    })

    return res
}

export const getAllDiseases = async () => {

    let res = await axios({
        method: 'get',  
        url: "http://localhost:8082/api/diseases",
    })

    return res
}

export const diseaseById = async (id) => {

    let res = await axios({
        method: 'get',
        url: `http://localhost:8082/api/disease/${id}`,
    })

    return res
}

//-------- notifacations------

export const getNotificationCount = async (id) => {

    let res = await axios({
        method: 'get',
        url: `http://localhost:8083/api/notification/count/${id}`,
    })

    return res
}


export const getNotificationOfUser = async (id) => {

    let res = await axios({
        method: 'get',
        url: `http://localhost:8083/api/notification/${id}`,
    })

    return res.data
}

export const deleteNotificationById = async (id) => {

    let res = await axios({
        method: 'delete',
        url: `http://localhost:8083/api/notification/${id}`,
    })
    var user = localStorageService.getItem("auth_user");
    
   
    let ress = await axios({
        method: 'get',
        url: `http://localhost:8083/api/notification/${user.userId}`,
    })

    return ress.data
   
}


//------- get weather data-------

export const getwatherData = async (lat,lng) => {

    let res = await axios({
        method: 'get',
        url: `http://localhost:8082/api/weather/${lat}/${lng}`,
       
    })

    return res.data
}