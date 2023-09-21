
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
    r_regDate: Date;
    visitDate: Date;
    petNum: number;
    customerNum: number;
    customerName: string;
    petName: string;
    g_name: string;
    g_num: number;
    r_expired: boolean;
    r_filnalAmount: number;
  }
export interface Customer {
    customerNum: number;
    customerRegDate: Date;
    customerName: string;
    customerEmail: string;
    customerGender: string;
    customerAge: number;
    customerPhone: string;
    customerAddress: string;
    customerIsWithdrawal: boolean;
    role: string;
    provider: string;
    providerId: string;
  }


  export interface PageInfo{
    pageNumber: number,
    pageSize: number,
    totalElement: number,
    totalPages: number,
  }
  