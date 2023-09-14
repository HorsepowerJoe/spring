import axios from 'axios';
import { AdminPageProps } from 'model/props';
import { Intro } from 'model/types';
import React, { ButtonHTMLAttributes, useEffect, useState } from 'react';
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

    const deleteIntroHandler = (image:Intro)=>{
      const answer = window.confirm('정말로 삭제하시겠습니까?');
      if(answer == true){
        axios.post('/api/admin/deleteIntro', image, axiosConfig).then(data=>{
          if(data.status == 200){
            setIntroImages(JSON.parse(JSON.stringify(data.data)));
            alert('삭제되었습니다.');
          }
        })
      }
    }


    const onSubmitHandler = (event:React.FormEvent):void => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget as HTMLFormElement);
      const usedData = formData.getAll('isUsed');
      const usedDataArray: { introNum: FormDataEntryValue; }[] = [];
      usedData.forEach((data) =>{
        const introData = {
          introNum: data
      };
      usedDataArray.push(introData);
      })      
      axios.post('/api/admin/chooseIntro', usedDataArray, axiosConfig).then(data=>{
        if(data.status == 200){
          alert("수정되었습니다.");
          navi('/admin');
        }
      })

    }




    const previewImage = introImages?.map((image, index) =>(
        <li key={image.introNum}>
            <label>사용하기  <input type="checkbox" name='isUsed' value={image.introNum} /></label><br /> 
            <p>
                {image.introFileOriName}<br />{image.introFileName}
            </p>
            <button id='myHoverBtn' type='button' onClick={()=>{deleteIntroHandler(image)}}>삭제하기</button>
            <br />
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
            <option value="handler">훈련사 소개 편집</option>
            <option value="groomer">미용사 소개 편집</option>
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