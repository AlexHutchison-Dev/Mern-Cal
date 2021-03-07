import React from 'react'
import {useHistory} from "react-router-dom";
import {CTAContainer, CTAText, SignUpButton} from './CTAElememnts';

function CTA() {

  const history = useHistory();

  function handleClick(event) {
    event.preventDefault();
    history.push("/register");
  }
  return (
    <section id="CTA">
      <CTAContainer className="container-fluid" >
        <div className="row">
          <CTAText>Join now and start organising!! </CTAText>
        </div>
        <div className="row">
          <SignUpButton className="btn btn-primary" onClick={handleClick} >Sign Up</SignUpButton>
        </div>
      </CTAContainer>
      
    </section>
  )
}

export default CTA
