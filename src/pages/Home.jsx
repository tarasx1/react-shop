import { useContext } from 'react';
import Card from '../components/Card/Card';
import { AppContext } from '../context';

const Home = ({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchValue,
  onAddToFavorite,
  onAddToCart,
  cartItems,
  isLoading,
}) => {
  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        title={item?.title}
        price={item?.price}
        imageUrl={item?.imageUrl}
        id={item?.id}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        //{...item}
      />
    ));
  };
  return (
    <div className="content  p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Search: ${searchValue}` : 'All sneakers'}</h1>
        <div className="search-block d-flex">
          <img src="img/search.svg" alt="Search" />
          {searchValue && (
            <img
              className="clear cu-p"
              src="img/btn-remove.svg"
              alt="Clear"
              onClick={() => setSearchValue('')}
            />
          )}
          <input
            placeholder="Search..."
            value={searchValue}
            onChange={onChangeSearchValue}
          />
        </div>
      </div>
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
};

export default Home;
