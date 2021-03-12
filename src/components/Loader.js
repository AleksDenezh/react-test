import React from 'react';
import Spinner from '../assets/spinner.svg';

export const Loader = () => {
  return (
      <div className="uk-flex uk-flex-middle uk-flex-center">
        <img src={Spinner}/>
      </div>
  )
}
