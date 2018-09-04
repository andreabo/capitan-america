import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import {api} from '../api'

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
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
                that.setState({data: response.data});
            })
            .catch(function (error) {
            })

        // this.setState({
        //   data: [{
        //     "id": 10,
        //     "name": "algo",
        //     "tpersona": "patrocinador"
        //   },
        //   {
        //     "id": 11,
        //     "name": "algo",
        //     "tpersona": "patrocinador"
        //   },
        //   {
        //     "id": 12,
        //     "name": "algo",
        //     "tpersona": "patrocinador"
        //   },
        //   {
        //     "id": 13,
        //     "name": "algo",
        //     "tpersona": "patrocinador"
        //   }]
        // })
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

    render() {
        const listItems = this.state.data.map((item) =>
            <li className='item-list__item' key={item.id.toString()}>
                {item.name}
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
                        <Link to={'/'}><i className="fa fa-plane fa-rotate-180"/> Back Home</Link>
                    </div>
                    <div className='button'>
                        <Link to={`/new/${this.props.match.params.list}`}><i
                            className="fa fa-star"/> Add {this.props.match.params.list}</Link>
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
