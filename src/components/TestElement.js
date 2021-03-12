import React, { useEffect } from 'react';
import { CinemaContext } from "../context/Cinema/cinemaContext";

export const TestElement = ({ nextPage }) => {

  const ref = React.createRef();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  });

  const handleScroll = () => {
    if (ref.current && checkInView(ref.current)) {
      nextPage();
    }
  }

  const checkInView = (target) => {
    const targetPosition = {
          top: window.pageYOffset + target.getBoundingClientRect().top,
          left: window.pageXOffset + target.getBoundingClientRect().left,
          right: window.pageXOffset + target.getBoundingClientRect().right,
          bottom: window.pageYOffset + target.getBoundingClientRect().bottom
        },
        // Получаем позиции окна
        windowPosition = {
          top: window.pageYOffset,
          left: window.pageXOffset,
          right: window.pageXOffset + document.documentElement.clientWidth,
          bottom: window.pageYOffset + document.documentElement.clientHeight
        };

    return targetPosition.bottom > windowPosition.top && targetPosition.top < windowPosition.bottom && targetPosition.right > windowPosition.left && targetPosition.left < windowPosition.right;

  }

  return (
      <CinemaContext.Consumer>
        {({ loading, nextPage }) => (
            <div ref={ref}>
              <br/>
            </div>
        )}
      </CinemaContext.Consumer>
  )
}
