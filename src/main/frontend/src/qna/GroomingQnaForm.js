import axios from "axios";
import { useEffect, useState } from "react";

function GroomingqnaForm(props) {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const body = {
      customerNum: JSON.parse(localStorage.getItem("userInfo"))?.id,
      groomingQnaTitle: event.target.groomingQnaTitle.value,
      groomingQnaContent: event.target.groomingQnaContent.value,
    };
    axios
      .post("/api/board/writeGroomingQna", body, props.axiosConfig)
      .then((data) => {
        if (data.status == 200) {
          props.navi("/");
          alert("작성되었습니다.");
        }
      });
  };
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
          <legend style={{ textAlign: "center" }}>미용 문의</legend>
          <form
            style={{ display: "flex", flexDirection: "column", margin: "10px" }}
            onSubmit={onSubmitHandler}
          >
            <label style={{ textAlign: "center" }}>제목</label>
            <input name="groomingQnaTitle" type="text" />
            <br />
            <label style={{ textAlign: "center" }}>내용</label>
            <textarea
              name="groomingQnaContent"
              style={{ width: "800px", minHeight: "300px" }}
            />
            <br />
            <button>작성</button>
          </form>
        </fieldset>
      </div>
    </>
  );
}
export default GroomingqnaForm;
