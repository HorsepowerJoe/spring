import axios from 'axios';
import { AdminPageProps } from 'model/props';
import { AutomationDto } from 'model/types';
import React, { useState } from 'react';
import './css/ReservationListStyle.css';

const AutomationSettings: React.FC<AdminPageProps> = ({ navi, userInfo, getToken, axiosConfig }) => {
  const [keyword, setKeyword] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const keywordChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setKeyword(event.target.value);
  }

  const commentChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  }

  const onSubmitHandler = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    try {
      const currentSettings: AutomationDto = { keyword, comment };
      const response = await axios.post('/api/admin/webAutomation', currentSettings, axiosConfig);

      if (response.status === 200) {
        console.log("크롤링 동작 성공");
        //얼럿 없으면 허전함
        alert("완료되었습니다.");
      }
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      //오류 처리
      alert("오류 발생! 키워드가 검색되지 않았거나 서버에 문제가 있어 API 호출 중 오류가 발생하였습니다.");
    }
  }

  return (
    <>
      <textarea name="keyword" id="keyword" onChange={keywordChangeHandler} placeholder='키워드' style={{ width: "90%", margin: "5%", minHeight: "100px" }}></textarea>
      <br />
      <textarea name="comment" id="comment" onChange={commentChangeHandler} placeholder='코멘트' style={{ width: "90%", margin: "5%", minHeight: "100px" }}></textarea>
      <br />
      <button id='myHoverBtn' type='button' onClick={onSubmitHandler} style={{ width: "100px", height: "30px", borderRadius: "4px", margin: "0px 37%" }}>제출</button>
    </>
  );
}

export default AutomationSettings;
