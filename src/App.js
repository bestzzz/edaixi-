import React,{Component} from 'react';
import Tab from "./components/Tab/index";
import {Route} from 'react-router-dom';
import history from './store/history'
import {ConnectedRouter} from 'react-router-redux';
import './style/comm.less'
import Home from "./container/Home/index";
import Profile from "./container/Profile/index";
import Login from "./container/Login/index";
import Reg from "./container/Reg/index";
import Address from "./container/Address/index";
import AddAddress from "./container/AddAddress/index";
import ProtectRoute from './ProtectRoute';
import BackD from "./container/BackD/index";
export default class App extends Component{
    render(){
        return (
            <ConnectedRouter history={history}>
                <div>
                    <Tab/>
                    <Route exact  path="/" component={Home}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/reg" component={Reg}/>
                    <Route path="/back" component={BackD}/>
                    <ProtectRoute path="/address" component={Address}/>
                    <ProtectRoute path="/addadress" component={AddAddress}/>
                </div>
            </ConnectedRouter>
        )
    }
}