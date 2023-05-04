import * as React from "react";
import { createPortal } from "react-dom";
import styled, { keyframes} from "styled-components";
import {curObj} from "../App.jsx";
import "../App.css";

//referenced from this tutorial: https://medium.com/swlh/building-modals-in-react-64d92591f4b

const SModalOverlay = styled.div`
  background-color: #999999;
  height: 100vh;
  left: 0;
  opacity: 0.5;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 500;
`;

const SModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  left: 0;
  outline: 0;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 25%;
  width: 100%;
  z-index: 1000;
`;

const SModal = styled.div`
  align-items: center;
  background: white;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  margin: 1.875rem;
  max-width: 500px;
  position: relative;
  z-index: 100;
`;

const SHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 1.875rem 0.9375rem 1.875rem 0.9375rem;
`;

const STitle = styled.h5`
  margin-bottom: 0.3125rem;
`;

const buttonanimation = keyframes`
  from { text-shadow: 0 0 2px black;
    -webkit-text-fill-color: black;}
  to { 
    text-shadow: 0 0 2px ${curObj => curObj.color};
     -webkit-text-fill-color: ${curObj => curObj.color};
  }
`;

const SButton = styled.button`
  color: ${curObj => curObj.color};
  cursor: pointer;
  font-size: 28px;
  font-family: 'Monoton', cursive;
  padding: 0.9375rem;
  width: 100%;
  -webkit-text-fill-color: ${curObj => curObj.color};
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: black;
  animation: ${buttonanimation} 1s infinite alternate;
`;

const SDescription = styled.span`
  color: #C1C1C1;
  text-align: center;
`;

const Modal = ({ isVisible, hideModal }) => {
  // console.log("course in modal", curCourse);
  // console.log("link in modal", curLink);
  // console.log("in modal, curcolor is ");
  console.log("curobj.color", curObj.color);
  // console.log("video link is:", curObj.video);
  return isVisible
    ? createPortal(
        <React.Fragment>
          <SModalOverlay />
          <SModalWrapper
            aria-modal={true}
            aria-hidden={true}
            tabIndex={-1}
            role="dialog"
          >
            <SModal>
              <SHeader>
                <STitle>{curObj.course}</STitle>
                <SDescription>
                  {curObj.university}
                </SDescription>
                <iframe  className="youtubeVideo"
                    src={curObj.video}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media;   gyroscope; picture-in-picture"
                    allowFullScreen
                />
              </SHeader>
              <SButton onClick={hideModal} color={curObj.color}>
                Back
              </SButton>
            </SModal>
          </SModalWrapper>
        </React.Fragment>,
        document.body,
      )
    : null;
};

 
export default Modal;