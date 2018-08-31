import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {api} from '../api'

import './styles.css'

class ListMissions extends Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
    }

    componentDidMount() {
        const that = this;
        // axios.get(`${api.url}${this.props.match.params.list}`, {
        console.log(`${api.url}`);
        axios.get(`${api.url}`, {})
            .then(function (response) {
                console.log(response);
                that.setState({data: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    confirmDelete = (id) => {
        if (window.confirm('Are you sure you wish to delete this mission?')) {
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
                {item.name}
                <div>
                    {(item.fechaHora)}
                </div>
                <button className='item-list__item__delete-button' onClick={(id) => this.confirmDelete(item.id)}>
                    Delete
                </button>
            </li>
        );

        return (
            <div className='page-container'>
                <h1>
                    Listing all Misions
                </h1>
                <div className='buttons-grp'>
                    <div className='button'>
                        <Link to={'/'}>Back Home</Link>
                    </div>
                    <div className='button'>
                        <Link to={` / new /${this.props.match.params.list}`}>Add {this.props.match.params.list}</Link>
                    </div>
                </div>
                <ul
                    className='item-list'>
                    {listItems}
                </ul>
            </div>
        );
    }
}

export default ListMissions;