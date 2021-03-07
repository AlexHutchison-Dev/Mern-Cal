import styled from "styled-components";

export const FeaturesContainer = styled.div`
  color: white;
  padding: 10vh 0;
`;

export const Row = styled.div`
  padding: 0 15%;
`;

export const Collumn = styled.div`
  padding: 2%;
  color: #555;

  text-align: center;
  @media (max-width: 1000px) {
    margin-bottom: 5%;
  }
`;

export const IconContainer = styled.div`
  color: #2ea1ff;
  margin-bottom: 10%;
  @media (max-width: 1000px) {
    margin-bottom: 5%;
  }
`;

export const FeatureTitle = styled.h4`
  margin: 5%;
  font-family: Roboto;
`;

export const FeatureDescription = styled.p`
  font-size: 1rem;
  font-family: Roboto;
`;
