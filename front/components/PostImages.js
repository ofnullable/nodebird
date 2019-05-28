import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import ImageZoom from './ImageZoom';

const PostImages = ({ images }) => {
  const [showZoomImage, setShowZoomImage] = useState(false);

  const zoomImage = useCallback(() => {
    setShowZoomImage(true);
  }, []);

  const onClose = useCallback(() => {
    setShowZoomImage(false);
  }, []);

  if (images.length === 1) {
    return (
      <div>
        <img
          src={`http://localhost:8000/${images[0].src}`}
          onClick={zoomImage}
          width='100%'
        />
        {showZoomImage && <ImageZoom images={images} onClose={onClose} />}
      </div>
    );
  } else if (images.length === 2) {
    return (
      <div>
        <img
          src={`http://localhost:8000/${images[0].src}`}
          width='50%'
          onClick={zoomImage}
        />
        <img
          src={`http://localhost:8000/${images[1].src}`}
          width='50%'
          onClick={zoomImage}
        />
        {showZoomImage && <ImageZoom images={images} onClose={onClose} />}
      </div>
    );
  }
  return (
    <div>
      <img
        src={`http://localhost:8000/${images[0].src}`}
        width='50%'
        onClick={zoomImage}
      />
      <div
        style={{
          display: 'inline-block',
          width: '50%',
          textAlign: 'center',
          verticalAlign: 'middle',
          cursor: 'pointer',
        }}
        onClick={zoomImage}
      >
        <Icon type='plus' />
        <br />
        {images.length - 1}
        개의 사진 더 보기
      </div>
      {showZoomImage && <ImageZoom images={images} onClose={onClose} />}
    </div>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
    })
  ).isRequired,
};

export default PostImages;
