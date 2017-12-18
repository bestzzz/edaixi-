import React,{Component} from 'react';
import Tab from "./components/Tab/index";
import {Route} from 'react-router-dom';
import history from './store/history'
import {ConnectedRouter} from 'react-router-redux';
import './style/comm.less'
import Home from "./container/Home/index";
export default class App extends Component{
    render(){
        return (
            <ConnectedRouter history={history}>
                <div>
                    <Tab/>
                    <Route exact  path="/" component={Home}/>
                </div>
            </ConnectedRouter>
        )
    }
}