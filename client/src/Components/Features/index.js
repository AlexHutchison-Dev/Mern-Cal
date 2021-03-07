import React from "react";
import {
  FeaturesContainer,
  Collumn,
  Row,
  IconContainer,
  FeatureTitle,
  FeatureDescription,
} from "./FeaturesElements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStopwatch,
  faCalendar,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
function Features() {
  return (
    <section id="features">
      <FeaturesContainer className="container-fluid">
        <Row className="row"></Row>
        <Row className="row">
          <Collumn className="col-lg-4">
            <IconContainer>
              <FontAwesomeIcon icon={faStopwatch} size="4x" />
            </IconContainer>
            <FeatureTitle>Keep track of your engagements</FeatureTitle>
            <FeatureDescription>
              Never miss an event again, with a fully featured calendat to
              organise your days.
            </FeatureDescription>
          </Collumn>
          <Collumn className="col-lg-4">
            <IconContainer>
              <FontAwesomeIcon icon={faCalendar} size="4x" />
            </IconContainer>
            <FeatureTitle>Clean Calendar look</FeatureTitle>
            <FeatureDescription>
              View, Add and Edit your engagements on our fresh calendar layout.
            </FeatureDescription>
          </Collumn>
          <Collumn className="col-lg-4">
            <IconContainer>
              <FontAwesomeIcon icon={faEdit} size="4x" />
            </IconContainer>
            <FeatureTitle>All important information in one place</FeatureTitle>
            <FeatureDescription>
              Add notes to your events, so you never forget the address of your meeting.
            </FeatureDescription>
          </Collumn>
        </Row>
      </FeaturesContainer>
    </section>
  );
}

export default Features;
