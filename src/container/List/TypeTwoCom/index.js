import React,{Component} from 'react';
export default class TypeTwoCom extends Component{
    constructor(){
        super();
        this.state = {product: []};
    }
    componentDidMount(){
        this.setState({product: this.props.location.state}, () => {
            console.log(this.state);
        });
    }
    render(){
        return (
            <div className='list-content3'>
                {
                    this.state.product.map((item, index) => (
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