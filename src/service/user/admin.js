/**
 * author: Tsong
 * time: 15/03/2024 23:26
 */
import axios from "@/common/js/axios.js";

const PREFIX = '/user'

export const login = (params) => {
    return axios.post(PREFIX + '/login', params)
}

export const logout = (params) => {
    return axios.post(PREFIX + '/logout', params)
}

export const forgot = (params) => {
    return axios.post(PREFIX + '/forgot', params)
}

export const reset = (params) => {
    return axios.post(PREFIX + '/reset', params)
}

export const getAdminInfo = (params) => {
    return axios.get(PREFIX + '/info', {params})
}


// Register Request 
const PREFIX_REQ = '/userReq'

export const getRegisterPatients = (params) => {
    return axios.get(PREFIX_REQ + '/selectAll', {params})
}

export const getRegisterPatientDetails = (params) => {
    return axios.get(PREFIX_REQ + '/byId', {params})
}

export const rejectRegister = (params) => {
    return axios.put(PREFIX_REQ + '/reject', null, {params})
}

export const approveRegister = (params) => {
    return axios.put(PREFIX_REQ + '/approve', null, {params})
}

export const getRegisteringNumber = (params) => { 
    return axios.get(PREFIX_REQ + '/countRegister', {params})
}

// Manage Employee
const PREFIX_EMP = '/practitioner'
export const getEmployeeList = (params) => { 
    return axios.get(PREFIX_EMP + '/viewAll', {params})
}

export const addEmployee = (params) => {
    return axios.post(PREFIX_EMP + '/create', params)
}

export const getEmployeeInfo = (params) => {
    return axios.get(PREFIX_EMP + '/info', {params})
}

export const updateEmployee = (params) => {
    return axios.put(PREFIX_EMP + '/update', params)
}

export const deleteEmployee = (params) => {
    return axios.put(PREFIX_EMP + '/delete', null,{params})
}

export const getEmployeeNumber = (params) => { 
    return axios.get(PREFIX_EMP + '/countPractitionersRole', {params})
}

// Work Shift
const PREFIX_SHIFT = '/workShift'
export const createWorkShift = (params) => { 
    return axios.post(PREFIX_SHIFT + '/add',  params)
}

export const getDailyWorkShift = (params) => {
    return axios.get(PREFIX_SHIFT + '/personalWorkShift', {params})
}

export const getEveryoneWorkShiftByDate = (params) => { 
    return axios.get(PREFIX_SHIFT + '/selectAll', {params})
}

// GET 使用的是 params, 第二个参数传 {params}
// PUT 使用的是 params 而不是 body時, 第二个参数需传 null, 第三个参数传 {params}
// PUT 如果使用的是 Body, 第二个参数需传 params
// POST 使用的是 body, 则第二个参数传 params 
