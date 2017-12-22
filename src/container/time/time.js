import React, {Component} from 'react';
import './time.less';
import {connect} from 'react-redux';
import NavHeader from "../../components/NavHeader/index";

export default class Time extends Component {

    render() {
        return (
            <div  className="box" >
                <form>

                    <div className="con">
                        <span className="name">礼堂费</span>
                        <span className="tel">131****131</span>
                        <span className="address">北京市北京市北京市北京市</span>
                        <i className="iconfont icon-jiantouyou">&gt;</i>
                    </div>


                    <div className="choose">
                        <a>
                            请选择取件时间：2017-12-22
                        </a>

                    </div>
                    <p >
                        <textarea placeholder="如有问题请备注信息">

                        </textarea></p>
                    <p>
                        <input type="submit" id='submit' value="立即预约"/>
                    </p>
                </form>
            </div>

        )
    }
}
