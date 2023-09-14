import React, { useEffect, useState } from 'react';
import { AdminPageProps } from 'model/props';
import axios, { AxiosRequestConfig } from 'axios';



const ModifyIntroForm:React.FC<AdminPageProps> = ({navi, userInfo, getToken, axiosConfig}) => {
    const [images, setImages] = useState<File[]>([]);
    const [isChoiced, setisChoiced] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<String>();


    const categoryChangeHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
      setisChoiced(true);
      setSelectedCategory(e.target.value);
    }


    const onSubmitHandler = (event:React.FormEvent):void => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget as HTMLFormElement);
      const formDataConfig = axiosConfig;
      formDataConfig.headers = {
        ...axiosConfig.headers,
        'Content-Type': 'multipart/form-data',
      };
      console.log("", formDataConfig);

     


        axios.post(`/api/admin/modifyIntro/${selectedCategory}`,formData,formDataConfig as AxiosRequestConfig).then(data=>{
          if(data.status == 200){
            alert("변경되었습니다.");
            navi('/admin');
          }
        })
    }


    const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement>):void => {
       const files = event.target.files;
       if(files){
        const fileList = Array.from(files);
        setImages(fileList);
       }
    };


    const previewImage = images?.map((image, index) =>(
        <li key={index}><p>{image.name}</p><img src={URL.createObjectURL(image)} alt={`privew${image.name}`} width={600} height={400} /></li>
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
            회사 소개 변경
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
            <input name="images" type='file' accept='image/*' onChange={onChangeHandler} required multiple style={{margin:"0 auto"}}/>
            <hr />
            <br />

            <label style={{ textAlign: "center" }}>미리보기</label>
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


export default ModifyIntroForm