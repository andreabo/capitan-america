import './Sidebar.css';

import React from 'react';
import { Link } from 'react-router-dom';
import Shield from './Captain_America_Shield.png';

const Sidebar = (props) => {
  return (
    <nav className="navbar navbar-dark bg-primary" id="sideNav">

      <img className="img-fluid img-profile rounded-circle mx-auto mb-2 logo" src={Shield} alt="" />

      <ul className='navbar-nav'>
        <li className='nav-item'>
          <Link className="nav-link js-scroll-trigger" to={`/list/sponsors`}>See sponsors</Link>
        </li>
        <li className='nav-item'>
          <Link className="nav-link js-scroll-trigger" to={`/list/allies`}>See allies</Link>
        </li>
        <li className='nav-item'>
          <Link className="nav-link js-scroll-trigger" to={`/list/teammates`}>See teammates</Link>
        </li>
        <li className='nav-item'>
          <Link className="nav-link js-scroll-trigger" to={`/list/saves`}>See saves</Link>
        </li>
        <li className='nav-item'>
          <Link className="nav-link js-scroll-trigger" to={`/list/enemies`}>See enemies</Link>
        </li>
        <li className='nav-item'>
          <Link className="nav-link js-scroll-trigger" to={`/mlist`}>See missions</Link>
        </li>
      </ul>
    </nav>
  );
};

export { Sidebar };
