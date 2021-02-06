import React from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from
"mdbreact";
import './navbar.css';
//import {children,dis,exam, high, offer,school} from '../book-cover';

const CarouselPage = () => {
  return (

<div className="w-100"> 
    <MDBContainer>
      <MDBCarousel
        activeItem={1}
        length={3}
        showControls={true}
        showIndicators={true}
        className="z-depth-1"
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <img
                className="h-25 d-block container-fluid"
                src="https://jaxpubliclibrary.org/files/Read-a-book-day-E-News-Banner.jpg"
                alt="First slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://jaxpubliclibrary.org/files/Read-a-book-day-E-News-Banner.jpg"
                alt="Second slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://jaxpubliclibrary.org/files/Read-a-book-day-E-News-Banner.jpg"
                alt="Third slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="4">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://jaxpubliclibrary.org/files/Read-a-book-day-E-News-Banner.jpg"
                alt="Fourth slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="5">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://jaxpubliclibrary.org/files/Read-a-book-day-E-News-Banner.jpg"
                alt="Fifth slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="6">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://jaxpubliclibrary.org/files/Read-a-book-day-E-News-Banner.jpg"
                alt="Sixth slide"
              />
            </MDBView>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
    </div>
  );
}

export default CarouselPage;