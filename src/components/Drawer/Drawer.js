import axios from 'axios';
import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { Info } from '../Info';
import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {
  const [orderId, setOrderId] = useState(null);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { cartItems, setCartItems, totalPrice } = useCart();
  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        'https://6284d2603060bbd3473fd6d8.mockapi.io/orders',
        {
          items: cartItems,
        }
      );

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          'https://6284d2603060bbd3473fd6d8.mockapi.io/cart/' + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      alert('fail order');
    }
    setIsLoading(false);
  };
  return (
    <div className={`${styles.overlay} ${opened ? styles.overlyVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="mb-30 justify-between d-flex ">
          Shoping cart{' '}
          <img
            onClick={onClose}
            className="cu-p"
            src="img/btn-remove.svg"
            alt="Remove"
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-item mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} $</b>
                  </div>
                  <img
                    className="removeBtn"
                    src="img/btn-remove.svg"
                    alt="Remove"
                    onClick={() => onRemove(obj.id)}
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Total:</span>
                  <div></div>
                  <b>{totalPrice} $</b>
                </li>
                <li>
                  <span>Tax 5%:</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} $</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Go to checkout
                <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? 'Order complete!' : 'Cart empty'}
            image={
              isOrderComplete ? 'img/complete-order.jpg' : 'img/empty-cart.jpg'
            }
            description={
              isOrderComplete
                ? `Your order #${orderId} will be delivered by courier soon`
                : 'Add at least one pair of sneakers to make an order.'
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
