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
        //console.log(this.props.location);
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
                                return <Redirect to={`/list/${this.twoId}${this.props.location.state ? '/' + this.props.location.state : ''}`}/>
                            }}/>
                        </Switch>
                    </div> : this.props.match.params.id == 1 || this.props.match.params.id == 2 || this.props.match.params.id == 3 ?
                        <div className='list-content3'>
                            {
                                this.state.TypeTwoData.DefaultProducts.map((item) => (
                                    <div key={item.productID} className='flex-item'>
                                        <img src={item.img}/>
                                        <span>{item.productName}</span>
                                        <span>￥{item.price}</span>
                                    </div>
                                ))
                            }
                        </div> :
                        <div className='list-content45'>
                            <div className='list-content45-main'>
                                {
                                    this.state.TypeTwoData.DefaultProducts.map((item) => (
                                        <div key={item.productID} className='flex-item45'>
                                            <img src={item.img}/>
                                            <span>{item.productName}</span>
                                            <span>￥{item.price}</span>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='list-content45-info'>
                                <p>备注说明</p>
                                <p>两室一厅的窗帘面积约为20m²左右</p>
                                <p>北京市六环内均可提供上门拆装服务，六环外区域服务范围以电话确认为准</p>
                            </div>
                        </div>
                }
                <div className='list-typeOne-tab'>
                    <div className='list-tab-top'>
                        <div className='icon'>
                            <i className='iconfont icon-fuwujieshao'></i>
                            <span>高效服务</span>
                        </div>
                        <div className='icon'>
                            <i className='iconfont icon-fuwujieshao'></i>
                            <span>每单投保</span>
                        </div>
                        <div className='icon'>
                            <i className='iconfont icon-diqiu'></i>
                            <span>上门取件</span>
                        </div>
                    </div>
                    <div className='list-tab-main'>
                        <div>
                            <p>羽绒服、棉服等厚重衣物预计3-5天送回</p>
                            <p>皮衣、裘衣预计7-9天送回</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
import './index.less';