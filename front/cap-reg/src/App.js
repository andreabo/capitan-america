import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from './screens/home';
import AddItem from './screens/add_item';
import ListItem from './screens/list_items';
import ListMission from './screens/list_missions'
import Container from './components/hoc/Container';
import {Sidebar} from './components/layout/Sidebar';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="app-container">
                <BrowserRouter>
                    <Container>
                        <Sidebar/>
                        <div className="app-program">
                            <section className="app-section">
                                <Switch>
                                    <Route path="/list/:list" component={ListItem}/>
                                    <Route path="/new/:item" component={AddItem}/>
                                    <Route path="/misions" component={ListMission}/>
                                    <Route path="/" component={Home}/>
                                </Switch>
                            </section>
                            <hr className="m-0"/>
                        </div>
                    </Container>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
