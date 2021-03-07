import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faGlobeAmericas} from '@fortawesome/free-solid-svg-icons'

import {FooterContainer, Row} from './FooterElements';

//TODO Add links to icons

function Footer() {
  return (
    <section id="footer">
      <FooterContainer>
        <Row className="row">
        
        <FontAwesomeIcon icon={faCoffee} pull="left" />
        <FontAwesomeIcon icon={faGlobeAmericas} pull="right"/>
        </Row>
        <Row className="row">
        © Copyright 2020 Alex Hutchison
        </Row>
      </FooterContainer>
    </section>
  )
  }
export default Footer;
