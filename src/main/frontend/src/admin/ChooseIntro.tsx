import axios from 'axios';
import { AdminPageProps } from 'model/props';
import { Intro } from 'model/types';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const ChooseIntro:React.FC<AdminPageProps> = ({navi, userInfo, getToken, axiosConfig}) => {
    const [isChoiced, setisChoiced] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<String>();
    const [introImages, setIntroImages] = useState<Intro[]>();

    const categoryChangeHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCategory(e.target.value);
      axios.get(`/api/admin/getIntroImages?category=${e.target.value}`, axiosConfig).then( data =>{
        setIntroImages(JSON.parse(JSON.stringify(data.data)));
      }
      )
    }

    useEffect(() => {
        setisChoiced(true);
    },[introImages])


    const onSubmitHandler = (event:React.FormEvent):void => {
      event.preventDefault();
      console.log(event.target)

    }

    const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement>):void => {
      
    };


    const previewImage = introImages?.map((image, index) =>(
        <li key={image.introNum}>
            <label>사용하기  <input type="checkbox" /></label>
            <p>
                {image.introFileOriName}<br />{image.introFileName}
            </p>
            <br />
            <img src={'/api'+image.introFileUrl.replace('/Users/jml/Documents','')} alt={`privew${image.introFileName}`} width={600} height={400} />
            <hr />
        </li>
    ));

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
      <fieldset>
        <legend
          style={{
            textAlign: "center",
            backgroundColor: "lightgray",
            border: "1px solid black",
            borderBottom: "0",
          }}
        >
          회사 소개 선택
        </legend>
        <form
          style={{ display: "flex", flexDirection: "column", margin: "10px", textAlign: "center", minWidth: "600px" }}
          onSubmit={onSubmitHandler}
        >
          <label >카테고리</label>
          <br />
          <select name="category" onChange={categoryChangeHandler}>
            <option value="" selected disabled>카테고리 선택</option>
            <option value="intro">회사 소개 편집</option>
            <option value="groomer">미용사 소개 편집</option>
            <option value="handler">훈련사 소개 편집</option>
            <option value="hotel">호텔 소개 편집</option>
          </select>
          <br />
          { isChoiced == true ?
          <>
          <label style={{ textAlign: "center", fontWeight:"bold" }}>선택</label>
          <hr />
          <ul>
              {previewImage}
          </ul>
          <br />

          <button
            id="myHoverBtn"
            style={{ borderRadius: "5px", height: "25px" }}
          >
            업로드 및 변경
          </button> </>: null}
        </form>
      </fieldset>
    </div>
  </>
  )
}

export default ChooseIntro