import React from 'react';
import axios from "../mixins/axios";
import { CinemaContext } from "../context/Cinema/cinemaContext";
import { CinemaItem } from "./CinemaItem";
import { CinemaFilter } from "./SinemaFilter";
import { Loader } from "./Loader";
import { TestElement } from "./TestElement";


class CinemaList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: true,
      cities: [],
      city: 1,
      total: 0,
      rangeStart: 0,
      cinemas: [],
      allLoaded: false,
      sort: '',
      latitude: '',
      longitude: ''
    }
    this.limit = 10;
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.load = this.load.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleChangeCity (city) {
    sessionStorage.setItem('city', city);
    this.setState({ city, allLoaded: false, cinemas: [] });
    this.load({
      city,
      page: 0
    });
  }


  load (payload) {
    axios
        .get(`cinemas?limit=${this.limit}&rangeStart=${payload.page}&city=${payload.city}&sort=${payload.sort}&latitude=${payload.latitude}&longitude=${payload.longitude}`)
        .then(({ data }) => {
          this.setState({
            total: data.meta.total,
            cinemas: [
              ...this.state.cinemas,
              ...data.data.map(cinema => ({
                id: cinema.id,
                title: cinema.attributes.title,
                link: cinema.attributes.link,
                address: cinema.attributes.address
              }))
            ],
            loading: false
          })
        });
  }

  handleNext () {
    const page = this.state.rangeStart + this.limit;
    this.setState({ loading: true, rangeStart: page });
    if (page >= this.state.total) {
      this.setState({ allLoaded: true });
    }
    this.load({
      city: this.state.city,
      page
    })
  }


  componentDidMount () {
    const city = +sessionStorage.getItem('city') || 1;
    const sort = sessionStorage.getItem('sort') || '';
    axios.get('cities').then(({ data }) => {
      this.setState({
        cities: data.data.map(currentCity => ({
          id: +currentCity.id,
          name: currentCity.attributes.name
        })),
        city,
        sort
      });

      this.load({
        city,
        page: 0
      });
    });
  }

  handleSort (sort) {
    sessionStorage.setItem('sort', sort);
    this.setState({ sort, loading: true, allLoaded: false, cinemas: [] });
    if (sort === 'position') {
      navigator.geolocation.getCurrentPosition(data => {
        const { coords: { latitude, longitude } } = data;
        this.load({
          city: this.state.city,
          sort: sort,
          latitude,
          longitude
        })
      });
    } else {
      this.load({
        city: this.state.city,
        sort: sort
      })
    }
  }


  render () {
    const value = {
      cities: this.state.cities,
      city: this.state.city,
      changeCity: this.handleChangeCity,
      loading: this.state.loading,
      sortBy: this.state.sort,
      changeSort: this.handleSort
    }
    return (
        <CinemaContext.Provider value={value}>
          <div className="uk-margin-top uk-margin-bottom">
            <CinemaFilter></CinemaFilter>
          </div>
          {this.state.cinemas.map(cinema => <CinemaItem key={cinema.id} cinema={cinema}></CinemaItem>)}

          {this.state.loading && <Loader></Loader>}

          {(!this.state.loading && !this.state.allLoaded) && <TestElement nextPage={this.handleNext}></TestElement>}
        </CinemaContext.Provider>
    )
  }
}

export default CinemaList;


