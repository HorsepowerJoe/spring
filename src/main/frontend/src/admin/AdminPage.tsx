import React, { useEffect } from 'react'
import {AdminPageProps} from '../model/props';
import axios from 'axios';

const AdminPage:React.FC<AdminPageProps> = ({navi, userInfo, getToken, axiosConfig}) => {
    

  return (
    <>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "80%",
      }}
    >
     <fieldset style={{ border: "1px solid black" }}>
          <legend style={{ textAlign: "center", backgroundColor: "lightgray" }}>
            Admin Page
          </legend>
          <div
            style={{ display: "flex", flexDirection: "column", margin: "10px", minWidth: "500px" }}
>
    <p style={{textAlign:'center'}}>소개 편집</p>
       <button id='myHoverBtn' style={{borderBottom:"1px solid black"}}>회사 소개 편집</button>
       <button id='myHoverBtn' style={{borderBottom:"1px solid black"}}>훈련사 소개 편집</button>
       <button id='myHoverBtn' style={{borderBottom:"1px solid black"}}>미용사 소개 편집</button>
       <button id='myHoverBtn'>호텔 소개 편집</button>
       <hr />
       <p style={{textAlign:'center'}}>목록</p>
       <button id='myHoverBtn' style={{borderBottom:"1px solid black"}}>예약 목록 보기</button>
       <button id='myHoverBtn'>회원 목록 보기</button>
       </div>
      </fieldset>
    </div>
  </>
  )
}

export default AdminPage