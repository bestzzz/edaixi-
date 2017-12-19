import React,{Component} from 'react';
import Tab from "./components/Tab/index";
import NavHeader from "./components/NavHeader/index";
import BackD from "./container/BackD/index";
import {Route} from 'react-router-dom';
import history from './store/history'
import {ConnectedRouter} from 'react-router-redux';
import './style/comm.less';
import Home from "./container/Home/index";
import Profile from "./container/Profile/index";
import Login from "./container/Login/index";
import Reg from "./container/Reg/index";
import Address from "./container/Address/index";
import AddAddress from "./container/AddAddress/index";
import Comments from "./container/CommentsD";

export default class App extends Component{
    render(){
        return (
            <ConnectedRouter history={history}>
                <div>
                    <NavHeader/>
                    <Tab/>
                    <Route exact  path="/" component={Home}/>
                    <Route exact  path="/profile" component={Profile}/>
                    <Route exact  path="/login" component={Login}/>
                    <Route exact  path="/reg" component={Reg}/>
                    <Route exact  path="/address" component={Address}/>
                    <Route exact  path="/addadress" component={AddAddress}/>
                    <Route exact  path="/comments" component={Comments}/>

                </div>
            </ConnectedRouter>
        )
    }
}