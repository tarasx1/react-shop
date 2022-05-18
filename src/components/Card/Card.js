import React, { useContext, useState } from 'react';
import style from './Card.module.scss';
import ContentLoader from 'react-content-loader';
import { AppContext } from '../../context';

function Card({
  id,
  imageUrl,
  title,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = useContext(AppContext);

  const [isFavorite, setIsFavorite] = useState(favorited);

  const obj = { id, parentId: id, imageUrl, title, price };

  const onClickPlus = () => {
    onPlus(obj);
  };
  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={style.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={165}
          height={265}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="-1" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="165" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="192" rx="5" ry="5" width="100" height="15" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
          <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
        </ContentLoader>
      ) : (
        <>
          <div className={style.favorite} onClick={onClickFavorite}>
            {onFavorite && (
              <img
                src={isFavorite ? 'img/liked.svg' : 'img/unliked.svg'}
                alt="Unliked"
              />
            )}
          </div>
          <img width="100%" height={135} src={imageUrl} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Price:</span>
              <b>{price} $</b>
            </div>
            {onPlus && (
              <img
                width={32}
                height={32}
                className={style.plus}
                onClick={onClickPlus}
                src={
                  isItemAdded(id) ? 'img/btn-complete.png' : 'img/btn-plus.png'
                }
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
