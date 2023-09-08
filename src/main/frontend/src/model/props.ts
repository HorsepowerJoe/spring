export interface AdminPageProps{
    navi(url:String):void
    userInfo:CommonUserInfo,
    axiosConfig:AxiosConfig,
    getToken:String,
    role:String,
}


export interface CommonUserInfo{
    sub: String,
    exp: number,
    id: number,
    iat?: number,
    username: String,
    customerEmail: String,
    customerName: String,
}

export type AxiosConfig = {
    headers:{
        Authorization:{
            jwtToken:String
        }
    }
}
