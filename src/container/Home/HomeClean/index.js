import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import './index.less'
import {typeOne} from '../../../api/index'
export default class HomeClean extends Component{
    async componentDidMount(){
        let type=await typeOne()
        console.log(type);
    }
    render(){

        return (
            <div className="home-clean">
              <p className="clean">- 专 业 清 洗 -</p>

            </div>
        )
    }
}
