
import { EnumType } from "typescript";

export interface CommonUserInfo{
    sub: string,
    exp: number,
    id: number,
    iat?: number,
    username: string,
    customerEmail: string,
    customerName: string,
}


export interface Intro{
    introNum:number,
    introFileName:string,
    introFileOriName:string,
    introFileUrl:string,
    introCategory:string,
    isUsed:boolean
}