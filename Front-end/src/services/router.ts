import { getUserCredentials, isAuthenticated } from "./auth"

export const router = ():string => {
    const isLoggedIn = isAuthenticated();
    if(!isLoggedIn){
        return '/login'
    }
    const credits = getUserCredentials();
    if(credits == null){
        return '/login'
    }
    if(credits.userType.toLowerCase() == 'buyer'){
        return '/home'
    }
    return '/admin'
}