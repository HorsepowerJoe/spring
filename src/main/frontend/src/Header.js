function Header(props) {
  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid black",
        marginBottom: "10px",
      }}
    >
      {props.customerData == "" ? (
        <div>
          <button
            onClick={() => {
              props.navi("/sign/in");
            }}
          >
            로그인
          </button>
          <button
            onClick={() => {
              props.navi("/sign/up");
            }}
          >
            회원가입
          </button>
        </div>
      ) : (
        <div>{props.customerData?.customerId}님 안녕하세요.</div>
      )}
    </div>
  );
}
export default Header;
