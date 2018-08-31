import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './screens/home';
import AddItem from './screens/add_item';
import ListItem from './screens/list_items';
import ListMission from './screens/list_missions'

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/list/:list" component={ListItem} />
            <Route path="/new/:item" component={AddItem} />
            <Route path="/mlist" component={ListMission} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
