import React, { Component } from "react";
import ReactModal from "react-modal";
import { CloseButton } from "./ModalComponents";
import { background } from "styled-system";



function DisplayComponentModal(props) {

  let customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        // width                 : '570px',
        // height                : '400px',
        padding               : '0px',
        overflow              : 'hidden',
        transform             : 'translate(-50%, -50%)',
        borderRadius          : '5px',
        border                : 'none',
        boxShadow             : '0 4px 8px 0 rgba(0,0,0,0.2)',
        background            : props.transparentBackground ? 'none':'#fff'
      },
      overlay: {
        backgroundColor: 'rgba(0,0,0,0.6)'
      },
};
  let { overrideStyle, shouldCloseOnOverlayClick, hide, modalIsOpen, hideCloseButton } = props;
  customStyles = overrideStyle
    ? { ...customStyles, ...overrideStyle }
    : customStyles;
  shouldCloseOnOverlayClick =
    typeof shouldCloseOnOverlayClick === "undefined" ? false : true;
  // console.log(shouldCloseOnOverlayClick)
  // console.log(customStyles)
  return (
    <ReactModal
      isOpen={modalIsOpen}
    //   onAfterOpen={this.afterOpenModal}
    //   onRequestClose={this.closeModal}
      style={customStyles}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
      contentLabel={"NOTIFICATION"} //This is for screen readers for the blind.
    >
      <CloseButton
        onClick={()=>{console.log("hey")}}
        iconClassName="gb-white-close-btn-background"
        backgroundColor="white"
        hideCloseButton={hideCloseButton}
      />
      <div className="modal-container">{props.children}</div>
    </ReactModal>
  );
}

export default DisplayComponentModal;
