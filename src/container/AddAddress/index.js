import React, {Component} from 'react';
import NavHeader from '../../components/NavHeader'
import './index.less'
import {connect} from 'react-redux'
import actions from '../../store/actions/address'
import {withRouter} from 'react-router-dom'

class AddAddress extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        let userId=this.props.session.user.userId ||null;
        let province=this.province.value;
        let city=this.city.value;
        let address1=this.address1.value;
        let address2=this.address2.value;
        let name=this.name.value;
        let sex=this.male.checked?'男':'女';
        let tel=this.tel.value;
        let reg=/^\/addadress\/(\d+)$/;
        let num=reg.exec(this.props.router.location.pathname)[1];
        this.props.router.location.pathname=='/addadress'?this.props.addAddress({userId,province,city,address1,address2,name,sex,tel}):this.props.reviseAddress({userId,province,city,address1,address2,name,sex,tel,ID:num})
    };
    render() {
        let item=this.props.location.state?this.props.location.state.item:{userId:'',province:'',city:'',address1:'',address2:'',name:'',sex:'男',tel:''};
        return (
            <div>
                <NavHeader title='填写地址' show={true}/>
                <div className="panel">
                    <form method='POST' onSubmit={this.handleSubmit}>
                        <input type="text" name='province' id='province' placeholder='请输入城市'  defaultValue={item.province}
                               ref={input => this.province = input}/>
                        <input type="text" name='city' id='city' placeholder='请输入区域' ref={input => this.city = input} defaultValue={item.city}/>
                        <input type="text" name='address1' id='address1' placeholder='请输入小区名' defaultValue={item.address1}
                               ref={input => this.address1 = input}/>
                        <input type="text" name='address2' id='address2' placeholder='请输入门牌号' defaultValue={item.address2}
                               ref={input => this.address2 = input}/>
                        <br/>
                        <input type="text" name='name' id='name' placeholder='请输入姓名' ref={input => this.name = input} defaultValue={item.name}/>
                        男士<input type="radio" id='sex' name='sex' value='male' ref={input => this.male = input} defaultChecked={item.sex=='男'}/>
                        女士<input type="radio" id='sex' name='sex' value='female' defaultChecked={item.sex=='女'} />
                        <input type="text" name='tel' id='tel' placeholder='请输入电话' ref={input => this.tel = input} defaultValue={item.tel}/>
                        <input type="submit" id='submit'/>
                    </form>
                </div>
            </div>
        )
    }
}
export default connect(
    state=>state,
    actions
)
(withRouter(AddAddress))