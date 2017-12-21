import React,{Component} from 'react';
import NavHeader from '../../components/NavHeader'
import './index.less'
export default class AddAddress extends Component{
    render(){
        return (
            <div>
                <NavHeader title='填写地址' show={true}/>
                <div className="panel">
                    <form>
                        <input type="text" name='province' id='province' placeholder='请输入城市'/>
                        <input type="text" name='city' id='city' placeholder='请输入区域'/>
                        <input type="text" name='address1' id='address1' placeholder='请输入小区名'/>
                        <input type="text" name='address2' id='address2' placeholder='请输入门牌号'/>
                        <br/>
                        <input type="text" name='name' id='name' placeholder='请输入姓名'/>
                        男士<input type="radio" id='sex' name='sex' value='male' checked />
                        女士<input type="radio" id='sex' name='sex' value='female' />
                        <input type="text" name='tel' id='tel' placeholder='请输入电话'/>
                        <input type="submit" />
                    </form>
                </div>
            </div>
        )
    }
}
