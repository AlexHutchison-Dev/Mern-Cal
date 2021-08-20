import React from "react";
import styled from "styled-components";

const NullCard = styled.div`
display: flex;
width: calc(100% / 7 - 0px);
border: 1px solid #555;
color: black;
height: 115px;
align-items: top;
justify-content: space-between;
background-color: rgba(108, 178, 213, 0.15) !important;
`;

function DateCardNull(props) {
  return <NullCard key={Math.random()}></NullCard>;
}

export default DateCardNull;
