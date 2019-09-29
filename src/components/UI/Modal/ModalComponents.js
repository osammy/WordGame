import React from "react";
import { IoIosClose } from "react-icons/io";
import "./modal.css";

export const CloseButton = ({
  backgroundColor,
  className,
  iconClassName,
  onClick,
  iconColor,
  hideCloseButton
}) => {
  iconClassName = iconClassName ? iconClassName : "color-white mod-font";
  backgroundColor = backgroundColor ? backgroundColor : "#fff";
  // className = className ? className : "modal-close-button";
  iconColor = iconColor ? iconColor : "#000";
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: backgroundColor,
        display: hideCloseButton ? "none" : "flex"
      }}
      className="modal-close-button"
    >
      <div>
        <IoIosClose
          style={{ fontSize: "2em", cursor: "pointer", color: iconColor }}
          className={iconClassName}
        />
      </div>
    </div>
  );
};
