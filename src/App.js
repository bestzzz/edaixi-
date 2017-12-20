import React,{Component} from 'react';
import Tab from "./components/Tab/index";
import {Route, HashRouter as Router,Switch,Redirect} from 'react-router-dom';
import history from './store/history'
import {ConnectedRouter} from 'react-router-redux';
import './style/comm.less'
import List from './container/List';

export default class App extends Component{
    render(){
        return (
            <Router>
                <div>
                        <Route path='/list' component={List}/>
                    <Tab/>
                </div>
            </Router>
        )
    }
}