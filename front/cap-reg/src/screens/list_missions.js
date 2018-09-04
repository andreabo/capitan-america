import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { api } from '../api'

import './styles.css'
import moment from 'moment';

class ListMissions extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    /*
    const that = this;
    axios.get(`${api.url}`, {})
      .then(function (response) {
        that.setState({ data: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
    */
    this.setState({
      data: [
        {
          "id": 1,
          "fechaHora": "2025-08-06T00:00:00",
          "name": "Levantar el martillo de Thor."
        },
        {
          "id": 2,
          "fechaHora": "2025-08-06T00:00:00",
          "name": "Levantar el martillo de Thor."
        },
        {
          "id": 3,
          "fechaHora": "2025-08-06T00:00:00",
          "name": "Levantar el martillo de Thor."
        },
      ]
    });
  }

  confirmDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this mission?')) {
      console.log('PANCHO', id);
      axios.delete(`${api.url}${id}`, {})
        .then(function (response) {
          console.log(response);
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  };

  render() {
    const listItems = this.state.data.map((item) =>
      <li className='item-list__item' key={item.id.toString()}>
        <div>
          {item.name}<br />
          <span className="date-text">
            <i className="fa fa-history"></i> {moment().format('MMMM Do YYYY, h:mm:ss a', item.fechaHora)}
          </span>
        </div>
        <button className='item-list__item__delete-button' onClick={(id) => this.confirmDelete(item.id)}>
          <i className="fa fa-times-circle"></i>
        </button>
      </li>
    );

    return (
      <div>
        <h1>Listing all Misions</h1>
        <div className='buttons-grp'>
          <div className='button'>
            <Link to={'/'}><i className="fa fa-plane fa-rotate-180" /> Back Home</Link>
          </div>
          <div className='button'>
            <Link to={`/new/${this.props.match.params.list}`}><i className="fa fa-star" /> Add {this.props.match.params.list}</Link>
          </div>
        </div>
        <ul className='item-list'>
          <li className='item-list__header'>
            <span>Missions</span>
            <span>Delete</span>
          </li>
          {listItems}
        </ul>
      </div>
    );
  }
}

export default ListMissions;
