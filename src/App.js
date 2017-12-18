import React,{Component} from 'react';
import Tab from "./components/Tab/index";
import NavHeader from "./components/NavHeader/index";
import BackD from "./container/BackD/index";
import {Route} from 'react-router-dom';
import history from './store/history'
import {ConnectedRouter} from 'react-router-redux';
import './style/comm.less'
import InforD from "./container/InforD/index";
export default class App extends Component{
    render(){
        return (
            <ConnectedRouter history={history}>
                <div>
                    <NavHeader/>
                    <InforD/>
                    <Tab/>
                </div>
            </ConnectedRouter>
        )
    }
}