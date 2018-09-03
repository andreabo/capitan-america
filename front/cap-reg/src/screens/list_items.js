import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { api } from '../api'

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    const that = this;
    const url = `${api.url}${this.props.match.params.list}`;
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
    axios.get(url, config)
      .then(function (response) {
        console.log(response.data);
        that.setState({ data: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  confirmDelete = (Id) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      console.log('PANCHO', Id);
      axios.delete(`${api.url}${this.props.match.params.list}/${Id}`, {})
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
        {item.name}
        <button className='item-list__item__delete-button' onClick={(id) => this.confirmDelete(item.id)}>
          Delete
                </button>
      </li>
    );

    return (
      <div>
        <h1>
          Listing all {this.props.match.params.list}
        </h1>
        <div className='buttons-grp'>
          <div className='button'>
            <Link to={'/'}><i className="fa fa-plane fa-rotate-180" /> Back Home</Link>
          </div>
          <div className='button'>
            <Link to={`/new/${this.props.match.params.list}`}><i className="fa fa-star" /> Add {this.props.match.params.list}</Link>
          </div>
        </div>
        <ul className='item-list'>
          {listItems}
        </ul>
      </div>
    );
  }
}

export default ListItem;
