import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const placeholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';

const Image = styled.img`
  display: block;
  width: 375px;
  height: 237px;

  @keyframes loaded {
    0% {
      opacity: 0.1;
    }
    100% {
      opacity: 1;
    }
  }
  // utility classes instead of props to avoid style regenerating
  &.loaded:not(.has-error) {
    animation: loaded 300ms ease-in-out;
    height: 100%;
    width: 100%;
  }
  &.has-error {
    // fallback to placeholder image on error
    content: url(${placeholder});
  }
`;


export const LazyImage = ({src, alt, imageStyle}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState(null);

  const onLoad = event => {
    event.target.classList.add('loaded');
  };

  const onError = event => {
    event.target.classList.add('has-error');
  };

  useEffect(() => {
    let observer, didCancel = false;

    if (imageRef && imageSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!didCancel && (entry.intersectionRatio > 0 || entry.isIntersecting)) {
              setImageSrc(src);
              observer.unobserve(imageRef);
            }
          });
        }, {
          threshold: 0.01,
          rootMargin: '75%'
        });
        observer.observe(imageRef);
      } else {
        setImageSrc(src);
      }
    }

    return () => {
      didCancel = true;
      // on component cleanup, we remove the listner
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageSrc, imageRef]);

  LazyImage.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    imageStyle: PropTypes.any
  };

  return <Image
    ref={setImageRef}
    src={imageSrc ? imageSrc : '/themes/custom/cornell/assets/i/placeholders/affiliates.jpg'}
    alt={alt}
    style={imageStyle}
    onLoad={onLoad}
    onError={onError} />;
};
