import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.css'

class Home extends Component {
  render() {
    return (
     <div className='page-container'>
       <h1>
         Hello Cap!
       </h1>
       <br/>
       <ul className='category-list'>
         <li className='category-list__item'>
           <Link to={`/list/sponsors`}>See sponsors</Link>
         </li>
         <li className='category-list__item'>
           <Link to={`/list/allies`}>See allies</Link>
         </li>
         <li className='category-list__item'>
           <Link to={`/list/teammates`}>See teammates</Link>
         </li>
         <li className='category-list__item'>
           <Link to={`/list/saves`}>See saves</Link>
         </li>
         <li className='category-list__item'>
           <Link to={`/list/enemies`}>See enemies</Link>
         </li>
       </ul>
     </div>
    );
  }
}

export default Home;