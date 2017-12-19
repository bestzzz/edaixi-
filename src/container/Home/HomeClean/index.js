import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import './index.less'
import {typeOne} from '../../../api/index'
import HomeCleanImg from './HomeCleanImg'
export default class HomeClean extends Component{
    constructor(){
        super()
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
                {
                    this.state.type.map((item,index)=>(
                        <div key={index} className="clean-title">
                            <span className="title">{item.typeName}</span>
                            <img className="title-ground" src={HomeCleanImg[index]} alt=""/>
                        </div>
                    ))
                }
            </div>
        )
    }
}
