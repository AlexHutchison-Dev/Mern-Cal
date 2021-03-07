import React from "react";
import {
  TestimonialContainer,
  TestimonialImage,
  TestimonialText,
  CaroselItems,
  Name,
} from "./TestimonialsElements";

function Testimonials() {
  return (
    <section id="testimonials">
      <TestimonialContainer className="container-fluid">
        <div id="testimonial-carousel" className="carousel slide" data-ride="false">
          <div className="carousel-inner">
            <CaroselItems>
              <div className="carousel-item active">
                <TestimonialText>
                  Pretend praise, for a pretend SaaS web application. Not a real
                  testimonial.
                </TestimonialText>
                <TestimonialImage
                  src={require("./images/Man.jpg")}
                  alt="picture of a man"
                />
                <Name>David, New York</Name>
              </div>

              <div className="carousel-item">
                <TestimonialText>
                  If this were a real app I would probably just use the calendar
                  on my phone.
                </TestimonialText>
                <TestimonialImage
                  src={require("./images/Woman.jpg")}
                  alt="Picture of a woman"
                />
                <Name>Beverly, Illinois</Name>
              </div>
            </CaroselItems>
          </div>
          <a
            className="carousel-control-prev"
            href="#testimonial-carousel"
            data-slide="prev"
            role="button"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#testimonial-carousel"
            data-slide="next"
            role="button"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </TestimonialContainer>
    </section>
  );
}

export default Testimonials;
