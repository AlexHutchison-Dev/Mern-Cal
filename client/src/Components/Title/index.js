import React from "react";
import { useHistory } from "react-router-dom";

import {
  Title,
  TitleImage,
  BigHeading,
  ContentContainer,
  TitleTexts,
  ContentRow,
  ButtonContainer,
  SignUpButton
} from "./TitleElements.js";

function TitleElements() {
  const history = useHistory();

  function handleSignUpClick(event) {
    console.log("signup called from title button");
    event.preventDefault();
    history.push("/register");
  }

  return (
    <section id="title">
      <Title >
        <ContentContainer>
          <ContentRow className="row">
            <div className="col-lg-6 ">
              <TitleTexts>
                <BigHeading>Organise your life, </BigHeading>
                <ButtonContainer>
                  <SignUpButton
                    className="btn"
                    type="button"
                    onClick={handleSignUpClick}
                  >
                    Sign Up
                  </SignUpButton>
                </ButtonContainer>
              </TitleTexts>
            </div>

            <div className="col-lg-6">
              <div>
                <TitleImage src={require("./images/title-image.png")} />
              </div>
            </div>
          </ContentRow>
        </ContentContainer>
      </Title>
    </section>
  );
}

export default TitleElements;
