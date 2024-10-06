export const HOST = import.meta.env.VITE_SERVER_URL;
export const AUTH_ROUTES = "/api/auth";
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`;
export const ADD_DP_ROUTE = `${AUTH_ROUTES}/add-dp`;
export const REMOVE_DP_ROUTE = `${AUTH_ROUTES}/remove-dp`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;

export const CONTACTS_ROUTES = "/api/contacts";
export const SEARCH_CONTACTS_ROUTE = `${CONTACTS_ROUTES}/search`;
export const GET_DUO_CONTACTS_ROUTE = `${CONTACTS_ROUTES}/get-duo-contacts`;
export const GET_ALL_CONTACTS_ROUTE = `${CONTACTS_ROUTES}/get-all-contacts`;

export const MESSAGES_ROUTE = "/api/messages";
export const GET_ALL_MESSAGES_ROUTE = `${MESSAGES_ROUTE}/get-messages`;
export const UPLOAD_FILE_ROUTE = `${MESSAGES_ROUTE}/upload-file`;

export const GATHERING_ROUTE = "/api/gathering";
export const CREATE_GATHERING_ROUTE = `${GATHERING_ROUTE}/create-gathering`;
export const GET_USER_GATHERINGS_ROUTE = `${GATHERING_ROUTE}/get-user-gatherings`;
