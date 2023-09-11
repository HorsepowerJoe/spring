import { AxiosRequestConfig } from "axios";
import { CommonUserInfo } from "./types";

export interface AdminPageProps{
    navi(url:String):void
    userInfo:CommonUserInfo,
    axiosConfig:AxiosRequestConfig,
    getToken:String,
    role:String,
}



