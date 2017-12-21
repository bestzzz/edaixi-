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
        let reg = /^\/list\/(\d+)(\/(\d+))?/;
        this.twoId = reg.exec(this.props.history.location.pathname)[1];
        let TypeTwoData = await typeTwoOrProducts(this.twoId);
        this.setState({TypeTwoData});
    }

    render() {
        return (
            <div className='list-type-one'>
                {
                    this.props.match.params.id === '1' || this.props.match.params.id === '2' || this.props.match.params.id === '3' ?
                        <ListSlider/> : null
                }
                {
                    this.state.TypeTwoData.twoTypes ? <div className="list-content2">
                        <div className='list-tab2'>
                            {
                                this.state.TypeTwoData.twoTypes.map((item, index) => {
                                    //console.log(this.state.TypeTwoData.twoTypes);
                                    return <NavLink
                                        key={item.typeId}
                                        to={{
                                            pathname: `/list/${this.props.match.params.id}/${item.typeId}`,
                                            state: this.state.TypeTwoData.DefaultProducts
                                        }}
                                    >{item.typeName}</NavLink>
                                })
                            }
                        </div>
                        <Switch>
                            <Route path='/list/:id/:bid' component={TypeTwoCom}/>
                            <Route render={() => {
                                return <Redirect to={`/list/${this.twoId}/${this.props.location.state}`}/>
                            }}/>
                        </Switch>
                    </div> : <div className='list-content3'>
                        {
                            this.state.TypeTwoData.DefaultProducts.map((item) => (
                                <div key={item.productID} className='flex-item'>
                                    <img src={item.img}/>
                                    <span>{item.productName}</span>
                                    <span>￥{item.price}</span>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        )
    }
}
import './index.less';
