import styled from "styled-components";

export const Title = styled.div`
  background-color: #007bff;
  color: white;
  width: 90%;
  text-align: left;
  padding: 3% 25% 7%;
  flex-grow: 1;
  overflow: visible;
`;

export const ContentRow = styled.div`
  height: 90%;
  padding: 0 10%;
`;
export const TitleImage = styled.img`
  width: calc(30vw);
  position: relative;
  transform: rotate(25deg);
  top: 30%;
  padding-top: 10%;
  margin: auto;
  display: block;

  @media (max-width: 1330px) {
    transform: rotate(0deg);
    padding-top: 15%;
  }
  @media (max-width: 1100px) {
    width: calc(45vw);
    transform: rotate(0deg);
    margin-right: auto;
    margin-left: auto;
    position: relative;
    bottom: 10%;
  }
  @media (max-width: 600px) {
    width: calc(65vw);
  }
`;
export const TitleTexts = styled.div`
  position: relative;
  top: 50%;
  margin-top: -20%;
  padding-left: 15%;
  justify-content: flex-start;
  text-shadow: 2px 2px 2px #555;
  @media (max-width: 1100px) {
    align-items: center;
  }
`;
export const BigHeading = styled.h1`
  color: white;
  font-size: 3.5rem;
  line-height: 1.5;
  margin: 0;
  display: block;
`;

export const ContentContainer = styled.div`
  margin-top: 10%;
  /* height: calc((30vw / 1.8) + 400px); */
  background-color: #007bff;
  @media (max-width: 1000px) {
    height: calc(30vw + 800px);
  }
`;

export const ButtonContainer = styled.div`
  text-align: center;
`;

export const SignUpButton = styled.button`
margin: 10% 0 ;
`;


