import React,{Component} from 'react';
import {getProducts} from "../../../api";

export default class TypeTwoCom extends Component{
    constructor(){
        super();
        this.state = {
            products: [],
            flag: false
        };
    }

    async componentWillReceiveProps(){
        if(this.props.match.params.bid){
            let products = await getProducts(this.props.match.params.bid);
            this.setState({products: products.Products, flag: true});
        }
    }
    render(){
        let defaultProducts = this.props.location.state||[];

        return (
            <div className='list-content3'>
                {
                    this.state.flag ? this.state.products.map((item, index) => (
                        <div key={item.productID} className='flex-item'>
                            <img src={item.img}/>
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
            </div>
        )
    }
}
import './index.less';