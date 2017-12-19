import React,{Component} from 'react';
import Tab from "./components/Tab/index";
import {Route,HashRouter as Router} from 'react-router-dom';

import {ConnectedRouter} from 'react-router-redux';
import './style/comm.less'
import Home from "./container/Home/index";
import Profile from "./container/Profile/index";
import Login from "./container/Login/index";
import Reg from "./container/Reg/index";
import Address from "./container/Address/index";
import AddAddress from "./container/AddAddress/index";
import createHashHistory from 'history/createHashHistory'



let  history = createHashHistory();
export default class App extends Component{
    render(){
        return (
            <ConnectedRouter history={history}>
                <div>
                    <Tab/>
                    <Route exact  path="/" component={Home}/>
                    <Route exact  path="/profile" component={Profile}/>
                    <Route exact  path="/login" component={Login}/>
                    <Route exact  path="/reg" component={Reg}/>
                    <Route exact  path="/address" component={Address}/>
                    <Route exact  path="/addadress" component={AddAddress}/>
                </div>
            </ConnectedRouter>
        )
    }
}