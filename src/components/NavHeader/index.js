import React,{Component} from 'react';
import './index.less'
export default class NavHeader extends Component{
    render(){
        return (
            <div className="nav-header">
                {this.props.title}
                {this.props.show?<i onClick={()=>this.props.history.goBack()} className="iconfont icon-fanhui"></i>:null}
            </div>
        )
    }
}
