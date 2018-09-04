import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { api } from '../api';
import moment from 'moment';
import Container from '../components/hoc/Container';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      list: null
    };
  }

  componentDidMount() {
    this.fetchData();
    this.setState({ list: this.props.match.params.list });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.list !== this.props.match.params.list) {
      this.setState({ list: this.props.match.params.list, data: [] });
      this.fetchData();
    }
  }

  fetchData = () => {
    const that = this;
    const url = this.getFetchUrl(); // `${api.url}${this.props.match.params.list}`;
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
    axios.get(url, config).then(function (response) {
      that.setState({ data: response.data });
    }).catch(function (error) {
      console.log(error);
      return null;
    });
  }

  getFetchUrl = () => {
    const list = this.props.match.params.list;
    if (list === 'mision') {
      return `${api.url}${this.props.match.params.list}`;
    }
    let user = 0;
    switch (list) {
      case 'sponsors':
        user = 1; break;
      case 'allies':
        user = 2; break;
      case 'teammates':
        user = 3; break;
      case 'saves':
        user = 4; break;
      case 'enemies':
        user = 5; break;
    }
    return `${api.url}tusuario/${user}`;
  }


  confirmDelete = (Id) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      console.log('PANCHO', Id);
      axios.delete(`${api.url}${this.props.match.params.list}/${Id}`, {})
        .then(function (response) {
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  };

  renderDate = (item) => {
    if (!item.fechaHora) {
      return null;
    }
    return (
      <Container>
        <br />
        <span className="date-text">
          <i className="fa fa-history"></i> {moment().format('MMMM Do YYYY, h:mm:ss a', item.fechaHora)}
        </span>
      </Container>
    );
  };

  render() {
    const listItems = this.state.data.map((item) =>
      <li className='item-list__item' key={item.id.toString()}>
        <div>
          {item.name}
          {this.renderDate(item)}
        </div>
        <button className='item-list__item__delete-button' onClick={(id) => this.confirmDelete(item.id)}>
          <i className="fa fa-times-circle"></i>
        </button>
      </li>
    );

    return (
      <div>
        <h1>Listing all {this.props.match.params.list}</h1>
        <div className='buttons-grp'>
          <div className='button'>
            <Link to={'/'}><i className="fa fa-plane fa-rotate-180" /> Back Home</Link>
          </div>
          <div className='button'>
            <Link to={`/new/${this.props.match.params.list}`}><i
              className="fa fa-star" /> Add {this.props.match.params.list}</Link>
          </div>
        </div>
        <ul className='item-list'>
          <li className='item-list__header'>
            <span>{this.props.match.params.list}</span>
            <span>Delete</span>
          </li>
          {listItems}
        </ul>
      </div>
    );
  }
}

export default ListItem;
