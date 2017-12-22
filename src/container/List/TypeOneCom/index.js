import React, {Component} from 'react';
import {typeTwoOrProducts, getProducts} from "../../../api";
import ListSlider from "../ListSlider/index";
import {NavLink, Route, Switch, Redirect} from "react-router-dom";
import TypeTwoCom from "../TypeTwoCom/index";
import actions from '../../../store/actions/cart';
import {connect} from 'react-redux';
class TypeOneCom extends Component {
    constructor() {
        super();
        this.state = {
            TypeTwoData: {twoTypes: []},
            products: [],
            flag: false,
            cart: [],
            sum: 0,
            sumPrice: 0
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
        this.setState({cart: localStorage.getItem('cartLocal') ? JSON.parse(localStorage.getItem('cartLocal')) : []});
        let checkedCart = this.state.cart.filter(item => item.isChecked);
        let sum = checkedCart.reduce((prev, next) => {
            return prev + parseInt(next.counts);
        }, 0)
        let sumPrice = checkedCart.reduce((prev, next) => {
            return prev + (next.counts * next.pro.price);
        }, 0)
        this.setState({sum, sumPrice})
    }
//添加购物车
    addCart = (pro) => {
        this.updateCart(pro, 'counts', 1);
    }
    //更新购物车
    updateCart = (pro, curr, count, input) => {
        let cartTemp = this.state.cart;
        let Index = cartTemp.findIndex((item) => (item.pro.productID == pro.productID))
        if (Index >= 0) {
            if (curr === 'counts' && input && parseInt(count)) {
                //input值
                parseInt(count) > 0 ? cartTemp[Index][curr] = parseInt(count) : null;
            } else if (curr === 'counts') {
                // 加减
                cartTemp[Index][curr] + parseInt(count) > 0 ? cartTemp[Index][curr] = cartTemp[Index][curr] + parseInt(count) : null;
            } else if (curr === 'isChecked') {
                cartTemp[Index][curr] = !cartTemp[Index][curr];
            }
            this.setState({cart: cartTemp}, this.setStorage);
            return;
        }
        if (curr === 'counts') {
            this.setState({cart: [{pro, counts: 1, isChecked: true}, ...this.state.cart]}, this.setStorage);
        }
    }
    //添加购物车信息到reducer
    setStorage = () => {
        let cart = this.state.cart.map(item => {
            return ({proId: item.pro.productID, counts: item.counts})
        })
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('cartLocal', JSON.stringify(this.state.cart));
        localStorage.setItem('sumPrice', this.state.sumPrice);
        this.props.addCart(JSON.parse(localStorage.getItem('cart')), this.state.sumPrice)
    }
    changeCounts = (pro, count) => {
        this.updateCart(pro, 'counts', count);
    }
    changeCountsInput = (e, pro) => {
        let count = e.target.value;
        this.updateCart(pro, 'counts', count, 1);
    }
    changeChecked = (pro) => {
        this.updateCart(pro, 'isChecked');
    }
    clear = () => {
        localStorage.removeItem('cart');
        this.setState({cart: []});
        this.cartAll.style.display = 'none';
    }
    closeCart = () => {
        this.cartAll.style.height = '0';
        this.title.style.display = 'none'
    }
    showCart = () => {
        this.cartAll.style.height = '4rem';
        this.cartAll.style.display = 'block';
        this.title.style.display = 'block';
    }
    getCartSum = (pro) => {
        let cartTemp = this.state.cart;
        let Index = cartTemp.findIndex((item) => (item.pro.productID == pro.productID));
        if (Index >= 0) {
            return cartTemp[Index].counts;
        }
        return 0
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
                        <div className='list-content31'>
                            {
                                this.state.TypeTwoData.DefaultProducts.map((item) => (
                                    <div key={item.productID} className='flex-item' onClick={() => this.addCart(item)}> <span className='img'> <img src={item.img}/>{this.getCartSum(item) ?
                                        <span className='hasCart'>{this.getCartSum(item)}</span> : null}
                            </span>

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
                                        <div key={item.productID} className='flex-item45' onClick={() => this.addCart(item)}>
                                           <span className='img'> <img src={item.img}/>{this.getCartSum(item) ?
                                               <span className='hasCart'>{this.getCartSum(item)}</span> : null}
                            </span>
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
                {this.state.cart.length == 0 ?
                    <div className="cartPickUp"><NavLink to="/order">预约取件</NavLink></div> :
                    <div className="cart">
                    <span className="iconfont icon-wodegouwuche" onClick={this.showCart}>
                        <span className="sum">{this.state.sum}</span>
                    </span>
                        <span className="price">
                    <span><span className="jiage">预估价格：￥</span><span
                        className="sumPrice">{(this.state.sumPrice).toFixed(2)}</span></span>
                    <p className="ShippingCosts">不含运费</p></span>
                        <span className="pickUp"><NavLink to="/order">预约取件</NavLink></span>
                    </div>
                }
                <div className="cartAll" ref={input => this.cartAll = input}>
                    <div className="title" ref={input => this.title = input}><span onClick={this.clear}>清空</span> <span>价格预估</span>
                        <span
                            onClick={this.closeCart}>关闭</span></div>
                    <div className="cartList">
                        <ul>
                            {
                                this.state.cart.map((item, index) => (
                                    <li key={index}>
                                        <input type="checkbox" checked={item.isChecked}
                                               onChange={() => this.changeChecked(item.pro)}/>
                                        <img src={item.pro.img}/>
                                        <span>{item.pro.productName}</span>
                                        <span className="price">￥{item.pro.price.toFixed(2)}</span>
                                        <button onClick={() => this.changeCounts(item.pro, -1)}>-</button>
                                        <input type="text" className="counts" value={item.counts}
                                               onChange={event => this.changeCountsInput(event, item.pro)}/>
                                        <button onClick={() => this.changeCounts(item.pro, 1)}>+</button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
import './index.less';
export default connect(state => state.cart, actions)(TypeOneCom)