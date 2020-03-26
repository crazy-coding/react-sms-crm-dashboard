import config from '../config/index';
import axios from 'axios';

import { 
    SET_MESSAGE } from "../constants/base-constants";
import { 
    AUTH_SET_LOGGEDIN,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    SET_AUTH } from "../constants/auth-constants";

import { NOTIFY_CLOSE, 
    TOGGLE_SIDEBAR,
    TOGGLE_SHOW,
    TOGGLE_CAMPAIGN,
    TOGGLE_NOTIFY,
    TOGGLE_LIST,
    TOGGLE_ACCOUNT } from '../constants/animate-constants'

import {
    RECEIVE_FETCH_DATA } from '../constants/fetch-constants'

export function setMessage(message) {
    return {type: SET_MESSAGE, message}
}

export function login(user_data) {
    return {type: AUTH_LOGIN, user_data}
}

export function logout() {
    return {type: AUTH_LOGOUT}
}

export function setAuth(user_data) {
    return {type: SET_AUTH, user_data}
}

export function setLoggedIn(user_data) {
    return {type: AUTH_SET_LOGGEDIN, user_data}
}

export function toggleNotifyClose () {
    return {type: NOTIFY_CLOSE}
}

export function toggleNotify () {
    return {type: TOGGLE_NOTIFY}
}

export function toggleMenu () {
    return {type: TOGGLE_SIDEBAR}
}

export function toggleShow () {
    return {type: TOGGLE_SHOW}
}

export function toggleMenuOne () {
    return {type: TOGGLE_CAMPAIGN}
}

export function toggleMenuTwo () {
    return {type: TOGGLE_LIST}
}

export function toggleMenuThree () {
    return {type: TOGGLE_ACCOUNT}
}

export function setAuthVars (user_data) {
    return {type: AUTH_SET_LOGGEDIN, user_data}
}

export function receiveFetchData (fetch_data) {
    return {type: RECEIVE_FETCH_DATA, fetch_data}
}
