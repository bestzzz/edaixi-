import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import './index.less'
import HomeCareImg from './HomeCare'
export default class HomeCare extends Component{
    render(){

        return (
            <div className="home-care">
              <p className="care">- 高 端 洗 护 -</p>
                <div className="care-titles">
                    <Link to='/list/1' className="care-title">
                        <span className="title">奢饰品养护</span>
                        <img className="title-care" src={HomeCareImg[0]} alt=""/>
                    </Link>
                    <Link to='/list/2' className="care-title">
                        <span className="title">高端成衣家纺</span>
                        <img className="title-care" src={HomeCareImg[1]} alt=""/>
                    </Link>
                </div>
            </div>
        )
    }
}
