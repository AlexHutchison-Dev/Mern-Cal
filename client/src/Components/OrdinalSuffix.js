import React from "react";
import styled from "styled-components";

const OrdinalSuffixHeading = styled.div`
    font-size: 1.6rem;
  `;
  const OrdinalSuffixSubheading = styled.div`
    font-size: 1rem;
  `;

function OrdinalSuffix(props) {
  

  function getDateDecorator(number) {
    const suffixes = { 1: "st", 2: "nd", 3: "rd" };

    if (number / 10 < 1) {
      if (suffixes[number]) return suffixes[number];
    } else {
      const dateDigits = ("" + number).split("");
      const last = dateDigits.pop();
      if (dateDigits[dateDigits.length - 1] * 1 === 1) return "th";
      if (suffixes[last]) return suffixes[last];
    }
    return "th";
  }

  if (props.heading === "subheading") {
    return (
      <OrdinalSuffixSubheading>
        <sup>{`${getDateDecorator(props.date)}`}</sup>
      </OrdinalSuffixSubheading>
    );
  }
  return (
    <OrdinalSuffixHeading>
      <sup>{`${getDateDecorator(props.date)}`}</sup>
    </OrdinalSuffixHeading>
  );
}

export default OrdinalSuffix;
