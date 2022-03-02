import React, { useContext } from 'react';
import { AppContext } from '../context';

export const Info = ({ title, image, description }) => {
  const { setCartOpened } = useContext(AppContext);
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img
        className="mb-20"
        width="120px"
        height="120px"
        src={image}
        alt="Empty-cart"
      />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button className="greenButton" onClick={() => setCartOpened(false)}>
        <img src="/img/arrow.svg" alt="Arrow" />
        Go to back
      </button>
    </div>
  );
};
