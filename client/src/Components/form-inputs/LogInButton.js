import React from "react";
import styled from "styled-components";

const SubmitBtn = styled.button`
    display: flex;
    align-self: center;
    margin: 20px;
    @media screen & (max-width: 992px;) {
    font-size: 2rem;
  `;

function LogInButton(props) {
  return (
    <SubmitBtn
      type="submit"
      onClick={props.handleSubmit}
      className="SubmitBtn btn btn-primary"
    >
      Log In
    </SubmitBtn>
  );
}

export default LogInButton;
