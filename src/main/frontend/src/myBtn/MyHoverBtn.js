import { useState } from "react";

function MyHoverBtn(props) {
  const [isHoverLogin, setIsHoverLogin] = useState(false);
  const [isHoverJoin, setIsHoverJoin] = useState(false);

  const buttonStyle = {
    margin: "0px 0px 10px 0px",
    width: "200px",
    padding: "5px 10px",
    backgroundColor: "#c33586",
    color: "#ffffff",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.1s ease-in-out",
    position: "relative",
    zIndex: 9999,
  };

  const buttonHoverStyle = {
    backgroundColor: "#ff69b4",
  };

  return (
    <button
      style={{ ...buttonStyle, ...(isHoverJoin && buttonHoverStyle) }}
      onMouseOver={() => setIsHoverJoin(true)}
      onMouseOut={() => setIsHoverJoin(false)}
      onClick={() => {
        props.navi(props.onClick);
      }}
    >
      {props.name}
    </button>
  );
}
export default MyHoverBtn;
