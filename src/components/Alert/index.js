import React,{Component} from 'react';
import './index.less'
import {connect} from 'react-redux'
import actions from '../../store/actions/session'

class Alert extends Component{
    static defaultProps={
        level:'default'
    };
    //在组件销毁之前,把redux中的消息给清除掉
    componentDidMount(){
       setTimeout(()=>{
           this.props.clearMessages();
       },3000)
    }
    render(){
        if(this.props.success){
            return <div className='alert success'>{this.props.success}</div>
        }else if(this.props.err){
            return <div className='alert error'>{this.props.err}</div>
        }else {
            return null;
        }
    }
}

export default connect(
    state=>state.session,
    actions
)(Alert)
