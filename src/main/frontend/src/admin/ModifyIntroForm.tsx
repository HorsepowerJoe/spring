import React, { useState } from 'react';
import { AdminPageProps } from 'model/props';

const ModifyIntroForm:React.FC<AdminPageProps> = ({navi, userInfo, getToken, axiosConfig}) => {
    const [images, setImages] = useState<File[]>([]);
    const [isHoveredLabel, setIsHoveredLabel] = useState<boolean>(false);

    const onSubmitHandler = (event:React.FormEvent):void => {
        event.preventDefault();
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
            </button>
          </form>
        </fieldset>
      </div>
    </>
  )
}


export default ModifyIntroForm