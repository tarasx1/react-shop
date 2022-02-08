import React from 'react';

function Drawer() {
  return (
    <div style={{ display: 'none' }} className="overlay">
      <div className="drawer">
        <h2 className="mb-30 justify-between d-flex ">
          Shoping cart{' '}
          <img className="cu-p" src="/img/btn-remove.svg" alt="Remove" />
        </h2>
        <div className="items">
          <div className="cartItem d-flex align-item mb-20">
            <div
              style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }}
              className="cartItemImg"
            ></div>
            <div className="mr-20 flex">
              <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 rub.</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
          </div>

          <div className="cartItem d-flex align-item mb-20">
            <div
              style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }}
              className="cartItemImg"
            ></div>
            <div className="mr-20 flex">
              <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 rub.</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
          </div>

          <div className="cartItem d-flex align-item mb-20">
            <div
              style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }}
              className="cartItemImg"
            ></div>
            <div className="mr-20 flex">
              <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 rub.</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
          </div>
        </div>
        <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Total:</span>
              <div></div>
              <b>21 498 rub.</b>
            </li>
            <li>
              <span>Tax 5%:</span>
              <div></div>
              <b>1074 rub.</b>
            </li>
          </ul>
          <button className="greenButton">
            Go to checkout
            <img src="/img/arrow.svg" alt="Arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
