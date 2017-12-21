import React,{Component} from 'react';
import NavHeader from '../../components/NavHeader';
import ListSlider from "./ListSlider/index";
import {NavLink, Route, HashRouter as Router,Redirect,Switch} from "react-router-dom";
import {typeOne} from "../../api/index";
import {ConnectedRouter} from "react-router-redux";
import TypeOneCom from "./TypeOneCom/index";

export default class List extends Component{
    constructor(){
        super();
        this.state = {

        };
    }
    async componentDidMount(){
        let typeOneData = await typeOne();
        this.setState({typeOne: typeOneData});
    }
    render(){
        return (
            <div className='list'>
                <NavHeader title='专业清洗' show={true}/>
                <div className='list-content'>
                    <div className='list-tab1'>
                        {
                            this.state.typeOne ? this.state.typeOne.map(item => (
                                <NavLink key={item.typeId} to={`/list/${item.typeId}`}>{item.typeName}</NavLink>
                            )):null
                        }
                    </div>
                    <Switch>
                        <Route path='/list/:id' component={TypeOneCom}/>
                        {
                            this.state.typeOne ? this.state.typeOne.map((item, index) => {
                                return <Route key={index} render={()=><Redirect to={`/list/${item.typeId}`}/>}/>
                        }): null
                        }
                    </Switch>

                </div>
            </div>
        )
    }
}
import './index.less';