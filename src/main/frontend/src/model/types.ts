
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

export interface Reservation {
    r_num: number;
    r_regDate: string;
    visitDate: string;
    petNum: number;
    customerNum: number;
    g_num: number;
    r_expired: boolean;
    r_filnalAmount: number;
  }


  export interface PageInfo{
    pageNumber: number,
    pageSize: number,
    totalElement: number,
    totalPages: number,
  }
  