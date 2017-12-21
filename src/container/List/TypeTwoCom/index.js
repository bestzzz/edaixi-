import React, {Component} from 'react';
import {getProducts} from "../../../api";
import {connect} from 'react-redux';
import actions from '../../../store/actions/cart';

class TypeTwoCom extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            flag: false,
            cart: [],
            sum: 0,
            sumPrice: 0
        };
    }

    async componentWillReceiveProps() {
        if (this.props.match.params.bid) {
            let products = await getProducts(this.props.match.params.bid);
            this.setState({products: products.Products, flag: true});
        }
        this.setState({cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []});
        let checkedCart=this.state.cart.filter(item=>item.isChecked);
        let sum = checkedCart.reduce((prev, next) => {
            return prev +parseInt(next.counts) ;
        }, 0)
        let sumPrice = checkedCart.reduce((prev, next) => {
            return prev + (next.counts * next.pro.price);
        }, 0)
        this.setState({sum, sumPrice})

    }

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
                parseInt(count) > 0? cartTemp[Index][curr] = parseInt(count) : null;
            } else if (curr === 'counts') {
                // 加减
                cartTemp[Index][curr] + parseInt(count) > 0 ?cartTemp[Index][curr]= cartTemp[Index][curr] + parseInt(count) : null;
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
        localStorage.setItem('cart', JSON.stringify(this.state.cart));
        this.props.addCart(JSON.parse(localStorage.getItem('cart')))
    }
    changeCounts = (pro, count) => {
        this.updateCart(pro, 'counts', count);
    }
    changeCountsInput = (e, pro) => {
        let count = e.target.value;
        this.updateCart(pro, 'counts', count,1);
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
        this.title.style.display='none'
    }
    showCart = () => {
        console.log(1);
        this.cartAll.style.height = '4rem';
        this.cartAll.style.display = 'block';
        this.title.style.display='block';
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
        let defaultProducts = this.props.location.state || [];
        return (
            <div className='list-content3'>
                {
                    this.state.flag ? this.state.products.map((item, index) => (
                        <div key={item.productID} className='flex-item'  onClick={() => this.addCart(item)}>
                            <span className='img'>
                                <img src={item.img}/>
                                {this.getCartSum(item)?<span className='hasCart'>{this.getCartSum(item)}</span> : null}
                            </span>
                            <span>{item.productName}</span>
                            <span>￥{item.price}</span>
                        </div>
                    )) : defaultProducts.map((item, index) => (
                        <div key={item.productID} className='flex-item'>
                            <img src={item.img}/>
                            <span>{item.productName}</span>
                            <span>￥{item.price}</span>
                        </div>
                    ))
                }
                {this.state.cart.length == 0 ?
                    <div className="cartPickUp">预约取件</div> :
                    <div className="cart">
                    <span className="iconfont icon-wodegouwuche" onClick={this.showCart}>
                        <span className="sum">{this.state.sum}</span>
                    </span>
                        <span className="price">
                    <span><span className="jiage">预估价格：￥</span><span
                        className="sumPrice">{(this.state.sumPrice).toFixed(2)}</span></span>
                    <p className="ShippingCosts">不含运费</p></span>
                        <span className="pickUp">预约取件</span>
                    </div>
                }
                <div className="cartAll" ref={input => this.cartAll = input}>
                    <div className="title" ref={input => this.title = input}><span onClick={this.clear}>清空</span> <span>价格预估</span> <span
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

export default connect(state => state.cart, actions)(TypeTwoCom)