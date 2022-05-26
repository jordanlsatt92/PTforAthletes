/**
 * @author Jordan Satterfield
 * @description Sets the header of an HTTP request to the token to allow
 * access to private routes. If the token does not exist, the request will
 * be denied.
 */
import axios from "axios";

const setAuthToken = (token) => {
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token;
    }else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
};

export default setAuthToken;