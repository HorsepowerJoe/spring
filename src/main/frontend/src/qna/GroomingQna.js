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
    props.navi(qna.groomingQnaNum);
  };

  const groomingQna = groomingQnaList.map((qna) => (
    <tr key={qna.groomingQnaNum}>
      <td>{qna.groomingQnaNum}</td>
      <td onClick={viewQnaDetails}>{qna.groomingQnaTitle}</td>
      <td>{qna.customerName}</td>
      <td>{qna.isAnswered ? "답변완료" : "대기중"}</td>
      <td>{qna.groomingQnaRegDate}</td>
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
        <fieldset>
          <legend style={{ textAlign: "center" }}>미용 문의</legend>
          <table style={{ width: "800px", textAlign: "center" }}>
            <tr>
              <th style={{ minWidth: "50px" }}>번호</th>
              <th style={{ minWidth: "50px" }}>제목</th>
              <th style={{ minWidth: "50px" }}>작성자</th>
              <th style={{ minWidth: "50px" }}>답변</th>
              <th style={{ minWidth: "50px" }}>작성일</th>
            </tr>
            {groomingQna}
          </table>
          <button
            style={{ width: "100%" }}
            onClick={() => {
              props.navi("/writeGroomingQnaFrom");
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
