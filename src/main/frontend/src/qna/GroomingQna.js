import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./css/groomingQna.css";

function GroomingQna(props) {
  const [groomingQnaList, setGroomingQnaList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageInfo, setPageInfo] = useState([]);
  useEffect(() => {
    axios
      .get(
        `/api/board/findAllGroomingQna?page=${pageNumber}&size=${pageSize}`,
        props.axiosConfig
      )
      .then((data) => {
        setGroomingQnaList(data.data.content);
        setPageInfo({
          pageNumber: data.data.number + 1,
          pageSize: data.data.size,
          totalElement: data.data.totalElement,
          totalPages: data.data.totalPages,
        });
      });
  }, [pageNumber, pageSize]);

  useEffect(() => {
    console.log(groomingQnaList);
  }, [groomingQnaList]);

  const viewQnaDetails = (qna) => {
    console.log("clicked", qna.groomingQnaNum);
    props.navi("/groomingQna/" + qna.groomingQnaNum);
  };

  const groomingQna = groomingQnaList.map((qna) => (
    <tr
      className="clickable"
      key={qna.groomingQnaNum}
      onClick={() => {
        viewQnaDetails(qna);
      }}
      style={{ cursor: "pointer" }}
    >
      <td>{qna.groomingQnaNum}</td>
      <td>{qna.groomingQnaTitle}</td>
      <td>{qna.customerName}</td>
      <td>{qna.answered ? "답변완료" : "대기중"}</td>
      <td>{new Date(qna.groomingQnaRegDate).toLocaleString()}</td>
    </tr>
  ));

  const handlePageClick = (selectedPage) => {
    setPageNumber(selectedPage.selected);
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
        <fieldset style={{ width: "100%" }}>
          <legend
            style={{
              textAlign: "center",
              border: "1px solid black",
              borderBottom: "0px",
              backgroundColor: "lightgray",
              minWidth: "500px",
            }}
          >
            미용 문의
          </legend>
          <table
            style={{ width: "100%", textAlign: "center", minWidth: "500px" }}
          >
            <tr>
              <th style={{ minWidth: "100px" }}>번호</th>
              <th style={{ minWidth: "100px" }}>제목</th>
              <th style={{ minWidth: "100px" }}>작성자</th>
              <th style={{ minWidth: "100px" }}>답변</th>
              <th style={{ minWidth: "100px" }}>작성일</th>
            </tr>
            {groomingQna}
          </table>
          <button
            id="myHoverBtn"
            style={{ borderRadius: "5px", height: "25px", width: "100%" }}
            onClick={() => {
              props.navi("/groomingqnaForm");
            }}
          >
            문의하기
          </button>
        </fieldset>
      </div>
      <ReactPaginate
        previousLabel="이전"
        nextLabel="다음"
        pageCount={pageInfo.totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        activeClassName={"active"}
      />
    </>
  );
}
export default GroomingQna;
