import axios from 'axios';
import { AdminPageProps } from 'model/props';
import { AutomationDto } from 'model/types';
import React, { useState } from 'react';
import './css/ReservationListStyle.css';
import MyHoverBtn from 'myBtn/MyHoverBtn';

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
      }
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      // 오류 처리
    }
  }

  return (
    <>
      <textarea name="keyword" id="keyword" onChange={keywordChangeHandler} placeholder='키워드'></textarea>
      <br />
      <textarea name="comment" id="comment" onChange={commentChangeHandler} placeholder='코멘트'></textarea>
      <button id='myHoverBtn' type='button' onClick={onSubmitHandler}>제출</button>
    </>
  );
}

export default AutomationSettings;
