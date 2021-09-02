import React from "react";
import styled from "styled-components";

const DayContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  margin: 2%;
  justify-content: center
`;

function DayView () {

  return (
    <DayContainer className="DayView">
      <p> Hey dayview! </p>
    </DayContainer>
    );
}


export default DayView;       
