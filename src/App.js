import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Routes, Switch } from 'react-router-dom';
import Drawer from './components/Drawer/Drawer';
import Header from './components/Header';
import { AppContext } from './context';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Orders from './pages/Orders';

function App() {
  const itemsRes = [
    {
      id: 1,
      title: 'Мужские Кроссовки Nike Blazer Mid Suede',
      price: 12999,
      imageUrl: 'img/sneakers/1.jpg',
    },
    {
      id: 2,
      title: 'Мужские Кроссовки Nike Air Max 270',
      price: 16500,
      imageUrl: 'img/sneakers/2.jpg',
    },
    {
      id: 3,
      title: 'Мужские Кроссовки Nike Blazer Mid Suede',
      price: 8499,
      imageUrl: 'img/sneakers/3.jpg',
    },
    {
      id: 4,
      title: 'Кроссовки Puma X Aka Boku Future Rider',
      price: 8999,
      imageUrl: 'img/sneakers/4.jpg',
    },
  ];
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            // axios.get('http://localhost:3001/cart'),
            // axios.get('http://localhost:3001/favorites'),
            // axios.get('http://localhost:3001/items'),
            axios.get('https://6284d2603060bbd3473fd6d8.mockapi.io/cart'),
            axios.get('https://6284d2603060bbd3473fd6d8.mockapi.io/favorites'),
            axios.get('https://6284d2603060bbd3473fd6d8.mockapi.io/items'),
          ]);
        // const cartResponse = await axios.get('http://localhost:3001/cart');
        // const favoritesResponse = await axios.get(
        //   'http://localhost:3001/favorites'
        // );
        // const itemsResponse = await axios.get('http://localhost:3001/items');

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('error on the get request ;(');
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) != Number(obj.id))
        );
        await axios.delete(
          `https://6284d2603060bbd3473fd6d8.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          'https://6284d2603060bbd3473fd6d8.mockapi.io/cart',
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert('error adding to cart ;(');
      console.log(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://6284d2603060bbd3473fd6d8.mockapi.io/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert('error remove to cart ;(');
      console.log(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://6284d2603060bbd3473fd6d8.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          'https://6284d2603060bbd3473fd6d8.mockapi.io/favorites',
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('could not be added to favorites');
      console.log(error);
    }
  };

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

        <Header onClickCart={setCartOpened} />
        {/* <Route path="/favorites" render={<div>12345</div>} /> */}
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchValue={onChangeSearchValue}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          ></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
