import React,{Component} from 'react';
import HomeSwiper from "./HomeSwiper/index";
import './index.less'
import NavHeader from '../../components/NavHeader/index'
import HomeClean from "./HomeClean/index";
import HomeCare from "./HomeCare/index";
import HomeComment from "./HomeComment/index";
export default class Home extends Component{
    componentDidMount(){
        this.downRefresh(this.content)
    }
    downRefresh=(dom) =>{
        let startY;
        let distance;
        let originTop=dom.offsetTop;
        dom.addEventListener('touchstart',touchStart)
        function touchStart(e) {
            startY=e.touches[0].pageY;
            if(dom.offsetTop==originTop&&dom.scrollTop==0){
                dom.addEventListener('touchmove',touchMove)
                dom.addEventListener('touchend',touchEnd)
            }
            function touchMove(e) {
                let pageY=event.touches[0].pageY;
                if(pageY>startY){
                    distance=pageY-startY;
                    if(distance>80){
                        distance=80
                    }
                    dom.style.top=originTop+distance+'px'
                }
            }
            function touchEnd() {
                dom.removeEventListener('touchmove',touchMove);
                dom.removeEventListener('touchend',touchEnd);
                let timer=setInterval(function () {
                    dom.style.top=originTop+(--distance)+'px';
                    if(distance<1){
                        dom.style.top=originTop+'px';
                        clearInterval(timer)
                    }
                },8);
            }
        }
    }
    render(){
        return (
                <div ref={content=>this.content=content} className="main">
                    <div className="logo"></div>
                    <HomeSwiper/>
                    <HomeClean/>
                    <HomeCare/>
                    <HomeComment/>
                </div>
        )
    }
}
