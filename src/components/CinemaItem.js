import React from 'react';

export const CinemaItem = ({ cinema }) => {
  return (
      <div className="cinema">
        <div className="cinema__name">
          <a href={cinema.link} target="_blank">
            {cinema.title}
          </a>
        </div>
        <div className="cinema__address">{cinema.address}</div>
      </div>
  )
}
