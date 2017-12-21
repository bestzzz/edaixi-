import React, {Component} from 'react';
import {typeTwoOrProducts, getProducts} from "../../../api";
import ListSlider from "../ListSlider/index";
import {NavLink, Route, Switch, Redirect} from "react-router-dom";
import TypeTwoCom from "../TypeTwoCom/index";

export default class TypeOneCom extends Component {
    constructor() {
        super();
        this.state = {
            TypeTwoData: {twoTypes: []}
        };
    }

    async componentDidMount() {


        //获取二级类以及默认产品
        if (this.props.match.params.id) {
            let TypeTwoData = await typeTwoOrProducts(this.props.match.params.id);
            this.setState({TypeTwoData});
        }

    }

    async componentWillReceiveProps() {
        if (this.props.match.params.id) {
            let TypeTwoData = await typeTwoOrProducts(this.props.match.params.id);
            this.setState({TypeTwoData});
        }

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
                            this.state.TypeTwoData.twoTypes.map((item, index) => {
                                return <NavLink
                                    key={item.typeId}
                                    to={{
                                        pathname: `/list/${this.props.match.params.id}/${item.typeId}`,
                                        state: this.state.TypeTwoData.DefaultProducts
                                    }}
                                >{item.typeName}</NavLink>
                            })
                        }
                    </div> : null
                }
                <div className="list-content2">
                    <Switch> <Route exact path='/list/:id/:bid' component={TypeTwoCom}/>
                        {
                            this.state.TypeTwoData.twoTypes.map((item, index) => {
                                return <Route key={index} render={() => <Redirect to={`/list/${item.pid}/${item.typeId}`}/>}/>
                            })
                        }
                    </Switch>
                </div>
            </div>
        )
    }
}
import './index.less';
