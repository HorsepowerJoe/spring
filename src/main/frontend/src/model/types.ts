
import { EnumType } from "typescript";

export interface CommonUserInfo{
    sub: String,
    exp: number,
    id: number,
    iat?: number,
    username: String,
    customerEmail: String,
    customerName: String,
}


export interface Intro{
    introNum:number,
    introFileName:String,
    introFileOriName:String,
    introFileUrl:string,
    introCategory:String,
    isUsed:boolean
}