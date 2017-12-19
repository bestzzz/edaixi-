import React,{Component} from 'react';
import './index.less';
import actions from '../../store/actions/comments';
import {connect} from 'react-redux';
import {downRefresh,upMore} from '../../utils';

class Comments extends Component{
    componentDidMount(){
        this.props.axiosComments();

        downRefresh(this.content,this.props.axiosComments);
        upMore(this.content,this.props.refreshComments)
    }
    render(){
        return (
            <div className="comments" ref={content=>this.content=content}>
                <div className="main-logo"></div>
                {
                    this.props.coms.map((item,index)=>(
                        <ul key={index}>
                            <li className="title">{item.tel}</li>
                            <li className="comment">{item.content}</li>
                            <li className="sub">{item.time}</li>
                        </ul>
                    ))
                }
            </div>
        )
    }
}

export default connect(
    state=>state.comments,
    actions
)(Comments);