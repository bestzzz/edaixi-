import React, {Component} from 'react';
import Tab from "../../components/Tab/index";
import NavHeader from "../../components/NavHeader/index";
import './index.less';
import {connect} from "react-redux";
import {addComment} from "../../api";
import {Link} from 'react-router-dom';


class BackD extends Component {
    constructor() {
        super();
        this.state = {typeId: null};
    }

    componentWillMount() {
        this.type = [
            {typeName: '洗护质量', typeId: 1},
            {typeName: '服务态度', typeId: 2},
            {typeName: '物流速度', typeId: 3},
            {typeName: '产品易用性', typeId: 4},
            {typeName: '付款流程', typeId: 5},
            {typeName: '其他', typeId: 6}
        ];
    }

    handleSubmit = () => {
        //{userId:,typeId:,content:,tel}
        let userId = this.props.user ? this.props.user.userId : null;
        let content = this.textarea.value;
        let typeId = this.state.typeId;
        let tel = this.input.value;
        let comment = {userId, typeId, content, tel};
        if (!typeId){
            alert('请选择反馈类型');
            return;
        }
        if (!tel){
            alert('请填写电话号码');
            this.input.focus();
            return;
        }
        if (!content){
            alert('请填写反馈信息');
            this.textarea.focus();
            return;
        }
        addComment(comment);
    };

    render() {
        return (
            <div className="all">
                <NavHeader title='意见反馈' show={true}/>
                <div className="back">
                    <p>e袋洗致力为您提供专业、高效、高品质的洗护服务 <br/>
                        欢迎您提供宝贵的意见和建议</p>
                    <i>反馈类型</i>
                    <div id="ul">
                        <ul className="border">
                            {
                                this.type.map(item => (
                                    <li onClick={() => this.setState({typeId: item.typeId})} key={item.typeId} className={this.state.typeId == item.typeId ? 'active' : ''}>{item.typeName}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <i>反馈内容</i>
                    <div className='tel'>
                        <input onChange={(e) => {this.setState({input: e.target.value})}} placeholder='请填写您的电话...' type="text" ref={input => this.input = input}/>
                    </div>
                    <textarea onChange={(e) => {this.setState({textarea: e.target.value})}} placeholder='请填写您的评价...' ref={textarea => this.textarea = textarea}></textarea>
                    <Link to={this.state.typeId && this.state.input && this.state.textarea ? `/comments/${this.state.typeId}` : `/back`} onClick={this.handleSubmit}>提交</Link>
                    <p>客服热线：400-818-7171</p>
                    <p>（周一到周日 8:30-22:00）</p>
                    <p>您也可以在微信搜索“e袋洗”官方公众号与我们服务</p>
                </div>
                <Tab/>
            </div>
        )
    }
}

export default connect(
    state => state.session
)(BackD);