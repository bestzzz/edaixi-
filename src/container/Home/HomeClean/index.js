import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import './index.less'
import {typeOne} from '../../../api/index'
import HomeCleanImg from './HomeCleanImg'
export default class HomeClean extends Component{
    constructor(){
        super();
        this.state={type:[]}
    }
    async componentDidMount(){
        let type=await typeOne()
        this.setState({type:type.slice(0,type.length-1)})
    }
    render(){
        return (
            <div className="home-clean">
                <p className="clean">- 专 业 清 洗 -</p>
                <div className="home-title">
                    {
                        this.state.type.map((item,index)=>(
                            <Link to={`/list/${item.typeId}/${item.defaultTypeId}`} key={index} className="clean-title">
                                <span className="title">{item.typeName}</span>
                                <img className="title-ground" src={HomeCleanImg[index]} alt=""/>
                            </Link>
                        ))
                    }
                </div>
            </div>
        )
    }
}