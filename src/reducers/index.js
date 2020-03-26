import { SET_MESSAGE } from "../constants/base-constants";
import { TOGGLE_SIDEBAR, 
    TOGGLE_SHOW,
    TOGGLE_NOTIFY,
    NOTIFY_CLOSE,
    TOGGLE_CAMPAIGN,
    TOGGLE_LIST,
    TOGGLE_ACCOUNT } from "../constants/animate-constants";
import { 
    AUTH_SET_LOGGEDIN,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    SET_AUTH } from "../constants/auth-constants";
import {
    RECEIVE_FETCH_DATA
} from "../constants/fetch-constants";

const initialState = {
    animate: {
        toggleSidebar:true,
        toggleNotify:false,
        menuOne:false,
        menuTwo:false,
        menuThree:false,
        isCheckingAuth:false,
    },
    auth: {
        isLoggedin: false,
        is_admin: 0,
        user_id: 0
    },
    data: {
        headers: {},
        dashboard: {},
        campains: {},
        domains: {},
    }
};

function rootReducer(state = initialState, action) {

    // Basic actions.
    switch (action.type) {
        case SET_MESSAGE:
            return { ...state,
                message: { ...state.message,  ...action.message } 
            };
    }

    // Animate actions.
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            state.animate['toggleSidebar']=!state.animate.toggleSidebar;
            return { ...state };

        case TOGGLE_SHOW:
            state.animate['toggleSidebar']=true;
            return { ...state };

        case TOGGLE_NOTIFY:
            state.animate['toggleNotify']=!state.animate.toggleNotify;
            return { ...state };

        case NOTIFY_CLOSE:
            state.animate['toggleNotify']=false;
            return { ...state };

        case TOGGLE_CAMPAIGN:
            state.animate['menuOne']=!state.animate.menuOne;
            state.animate['menuTwo']=false;
            state.animate['menuThree']=false;
            return { ...state };

        case TOGGLE_LIST:
            state.animate['menuOne']=false;
            state.animate['menuTwo']=!state.animate.menuTwo;
            state.animate['menuThree']=false;
            return { ...state };

        case TOGGLE_ACCOUNT:
            state.animate['menuOne']=false;
            state.animate['menuTwo']=false;
            state.animate['menuThree']=!state.animate.menuThree;
            return { ...state };
    }

    // Auth actions.
    switch (action.type) {
        case AUTH_SET_LOGGEDIN:
            if (action.user_data) state.auth = JSON.parse(action.user_data); 
            state.animate.isCheckingAuth = false;
            return { ...state };

        case AUTH_LOGIN:
            localStorage.setItem('send_sms-frontend-auth-user', JSON.stringify(action.user_data));
            state.auth = action.user_data;
            return { ...state };

        case AUTH_LOGOUT:
            localStorage.removeItem('send_sms-frontend-auth-user');
            state.auth = [];
            return { ...state };

        case SET_AUTH:
            return { ...state,
                auth: { ...state.auth,
                    ...action.user_data
                }
            };
    }

    // Fetch actions.
    switch (action.type) {
        case RECEIVE_FETCH_DATA:
            return { ...state,
                data: { ...state.data,  ...action.fetch_data } 
            };
    }

    return { ...state }
}

export default rootReducer;