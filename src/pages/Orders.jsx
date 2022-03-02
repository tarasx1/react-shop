import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Card from '../components/Card/Card';
import { AppContext } from '../context';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { onAddToFavorite, onAddToCart } = useContext(AppContext);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/orders');
        //console.log(data.map((obj) => obj.items).flat());
        //console.log(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setOrders(data.map((obj) => obj.items).flat());
        setIsLoading(false);
      } catch (error) {
        alert('something fail');
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="content  p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>My orders</h1>
      </div>
      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card
            key={index}
            //onFavorite={(obj) => onAddToFavorite(obj)}
            //onPlus={(obj) => onAddToCart(obj)}
            loading={isLoading}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;
