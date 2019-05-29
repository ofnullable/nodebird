import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import {
  Overlay,
  Header,
  CloseIcon,
  SlickWrapper,
  ImageWrapper,
  Indicator,
} from './ImageZoomStyle';

const ImageZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <Overlay>
      <Header>
        <h1>Detail Image</h1>
        <CloseIcon type='close' onClick={onClose} />
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            afterChange={silde => setCurrentSlide(silde)}
            infinite={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((v, i) => {
              return (
                <ImageWrapper key={i}>
                  <img src={`http://localhost:8000/${v.src}`} />
                </ImageWrapper>
              );
            })}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1} / {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImageZoom.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
    })
  ).isRequired,
};

export default ImageZoom;
