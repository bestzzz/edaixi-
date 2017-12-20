import React, {Component} from 'react';
import {typeTwoOrProducts} from "../../../api";
import ListSlider from "../ListSlider/index";
import {NavLink, Route} from "react-router-dom";

export default class TypeOneCom extends Component {
    constructor() {
        super();
        this.state = {TypeTwoData: {}};
    }

    async componentDidMount() {
        typeTwoOrProducts(this.props.match.params.id).then(res => this.setState({TypeTwoData: res}, () => {
            this.props.history.listen((location) => {
                let pathname = location.pathname;
                let reg = /^\/list\/(\d+)/g;
                let test=reg.exec(pathname);
                let twoId = test&&test[1];
                typeTwoOrProducts(twoId).then(res => {
                    this.setState({TypeTwoData: res})
                });
            })
        }));
    }

    render() {


        return (
            <div className='list-type-one'>
                {
                    this.props.match.params.id === '1' || this.props.match.params.id === '2' || this.props.match.params.id === '3' ?
                        <ListSlider/> : null
                }
                {
                    this.state.TypeTwoData.twoTypes ? <div className='list-tab2'>
                        {
                            this.state.TypeTwoData.twoTypes.map((item, index) => (
                                <NavLink key={item.typeId}
                                         to={{pathname: `/list/${this.props.match.params.id}/${item.typeId}`, state: this.state.TypeTwoData.DefaultProducts}}>{item.typeName}</NavLink>
                            ))
                        }
                    </div> : null
                }
                <div className="list-content2">
                    <Route path='/list/:id/:bid' component={TypeTwoCom}/>
                </div>
            </div>
        )
    }
}
import './index.less';
import TypeTwoCom from "../TypeTwoCom/index";