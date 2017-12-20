import React,{Component} from 'react';
import Tab from "../../components/Tab/index";
import NavHeader from "../../components/NavHeader/index";
import './index.less';

export default class BackD extends Component{

    render(){
        return (
            <div className="all">
                <NavHeader/>
              <Tab/>
                <div className="back">
                <p>e袋洗致力为您提供专业、高效、高品质的洗护服务 <br/>
                    欢迎您提供宝贵的意见和建议</p>
                    <i>反馈类型</i>
                    <div id="ul">
                        <ul className="border">
                            <li>洗护质量</li>
                            <li>服务态度</li>
                            <li>物流速度</li>
                        </ul>

                        <ul className="border">
                            <li>产品易用性</li>
                            <li>付款流程</li>
                            <li>其他</li>
                        </ul>

                    </div>
                <i>反馈内容</i>
                <textarea></textarea>
                <button>提交</button>
                <p>客服热线：400-818-7171</p>
                <p>（周一到周日 8:30-22:00）</p>
                <p>您也可以在微信搜索“e袋洗”官方公众号与我们服务</p>
                </div>
            </div>
        )
    }
}