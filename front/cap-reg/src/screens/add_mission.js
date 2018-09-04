import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import {api} from '../api'

class AddMision extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    };

    handleSubmit = (event) => {
        const that = this;
        axios.post(`${api.url}${this.props.match.params.item}/mision`, {
            name: this.state.value,
        })
            .then(function (response) {
                console.log(response);
                that.props.history.goBack();
            })
            .catch(function (error) {
                console.log(error);
            });
        event.preventDefault();
    };

    render() {
        return (
            <div>
                <h1>
                    Adding {this.props.match.params.item} Cap?
                </h1>
                <div>
                    <div className='buttons-grp'>
                        <div className='button'>
                            <Link to={`/list/${this.props.match.params.item}`}><i
                                className="fa fa-plane fa-rotate-180"/> Back to {this.props.match.params.item}</Link>
                        </div>
                    </div>
                    <form className='add-item-form' onSubmit={this.handleSubmit}>
                        <label>
                            <input type="text" value={this.state.value}
                                   placeholder={`Add a new ${this.props.match.params.item}`}
                                   onChange={this.handleChange} className='input'/>
                        </label>
                        <input type="submit" value="Submit" className='button submit'/>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddMision;
