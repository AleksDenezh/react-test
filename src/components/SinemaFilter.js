import React from 'react';
import { CinemaContext } from "../context/Cinema/cinemaContext";

export const CinemaFilter = () => {
  return (
      <CinemaContext.Consumer>
        {({ cities, city, changeCity, sortBy, changeSort }) => (
            <div className="uk-flex uk-margin-medium-bottom">
              <div className="uk-margin-right">
                <div uk-form-custom="target: > * > span:first-child">
                  <select onChange={e => changeCity(e.target.value)} value={city}>
                    {cities.map(option => (
                        <option value={option.id} key={option.id}>{option.name}</option>
                    ))}
                  </select>
                  <button className="uk-button uk-button-default" type="button" tabIndex="-1">
                    <span></span>
                    <span uk-icon="icon: chevron-down"></span>
                  </button>
                </div>
              </div>

              <div className="uk-flex uk-flex-middle">
                <div className="uk-margin-right">Сортировка:</div>
                <button
                    type="button"
                    className={`uk-button uk-button-small ${sortBy === '' ? 'uk-button-primary' : ''}`}
                    onClick={() => changeSort('')}
                >
                  Без сортировки
                </button>
                <button
                    type="button"
                    className={`uk-button uk-button-small ${sortBy === 'title' ? 'uk-button-primary' : ''}`}
                    onClick={() => changeSort('title')}
                >
                  По названию
                </button>
                <button
                    type="button"
                    className={`uk-button uk-button-small ${sortBy === 'position' ? 'uk-button-primary' : ''}`}
                    onClick={() => changeSort('position')}
                >
                  По расстоянию
                </button>
              </div>

            </div>
        )}
      </CinemaContext.Consumer>
  )
}
