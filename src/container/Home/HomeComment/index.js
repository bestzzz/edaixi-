import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import ReactSwipe from 'react-swipe'
import './index.less'
import Swiper from "./Swiper/index";

export default class HomeComment extends Component {
    render() {
        return (
            <div className="comment-main">
                <div className="comment-icons">
                    <div className="icon">
                        <i className="iconfont icon-fuwujieshao"></i>
                        <p>服务介绍</p>
                    </div>
                    <div className="icon">
                        <i className="iconfont icon-diqiu"></i>
                        <p>服务范围</p>
                    </div>
                    <div className="icon">
                        <i className="iconfont icon-jiage"></i>
                        <p>价目中心</p>
                    </div>
                    <div className="icon">
                        <i className="iconfont icon-yijian"></i>
                        <p>意见反馈</p>
                    </div>
                    <div className="icon">
                        <i className="iconfont icon-icon-test"></i>
                        <p>团体洗衣</p>
                    </div>
                </div>
                <div className="comment-setting">
                      <div className="setting">
                          <Swiper/>

                      </div>
                    <Link className="comment" to="/comments">[ 更 多 评 论 ]</Link>
                </div>
            </div>
        )
    }
}
