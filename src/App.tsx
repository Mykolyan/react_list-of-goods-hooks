import React, { useMemo } from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  Alphabetically = 'alphabetically',
  Length = 'length',
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortField, setSortField] = useState<SortType | null>(null);

  const visibleGoods = useMemo(() => {
    const goods = [...goodsFromServer];

    if (sortField === SortType.Alphabetically) {
      goods.sort();
    } else if (sortField === SortType.Length) {
      goods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      goods.reverse();
    }

    return goods;
  }, [sortField, isReversed]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setIsReversed(!isReversed);
    } else {
      setSortField(field as SortType);
    }
  };

  const resetGoods = () => {
    setSortField(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-primary', {
            'is-light': sortField !== 'alphabetically',
          })}
          onClick={() => handleSort('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-link', {
            'is-light': sortField !== 'length',
          })}
          onClick={() => handleSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-success"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
