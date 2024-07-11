import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "../qna/css/groomingQna.css";

function FreeBoard(props) {
  const [freeBoardList, setFreeBoardList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageInfo, setPageInfo] = useState([]);
  useEffect(() => {
    axios
      .get(
        `/api/board/findAllFreeBoard?page=${pageNumber}&size=${pageSize}`,
        props.axiosConfig
      )
      .then((data) => {
        setFreeBoardList(data.data.content);
        setPageInfo({
          pageNumber: data.data.number + 1,
          pageSize: data.data.size,
          totalElement: data.data.totalElement,
          totalPages: data.data.totalPages,
        });
      });
  }, [pageNumber, pageSize]);

  useEffect(() => {
    console.log(freeBoardList);
  }, [freeBoardList]);

  const viewFreeBoardDetails = (details) => {
    console.log("clicked", details.freeBoardNum);
    props.navi("/freeBoard/" + details.freeBoardNum);
  };

  const freeBoardContents = freeBoardList.map((contents) => (
    <tr
      className="clickable"
      key={contents.freeBoardNum}
      onClick={() => {
        viewFreeBoardDetails(contents);
      }}
      style={{ cursor: "pointer" }}
    >
      <td>{contents.freeBoardNum}</td>
      <td>{contents.freeBoardTitle}</td>
      <td>{contents.customerName}</td>
      <td>{contents.freeBoardReplyCount}</td>
      <td>{new Date(contents.freeBoardRegDate).toLocaleString()}</td>
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
            자유게시판
          </legend>
          <table
            style={{ width: "100%", textAlign: "center", minWidth: "500px" }}
          >
            <tr>
              <th style={{ minWidth: "100px" }}>번호</th>
              <th style={{ minWidth: "100px" }}>제목</th>
              <th style={{ minWidth: "100px" }}>작성자</th>
              <th style={{ minWidth: "100px" }}>댓글수</th>
              <th style={{ minWidth: "100px" }}>작성일</th>
            </tr>
            {freeBoardContents}
          </table>
          <button
            id="myHoverBtn"
            style={{ borderRadius: "5px", height: "25px", width: "100%" }}
            onClick={() => {
              props.navi("/freeBoardForm");
            }}
          >
            글쓰기
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
export default FreeBoard;
