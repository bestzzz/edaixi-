import React,{Component} from 'react';
import ReactSwipe from 'react-swipe';

export default class ListSlider extends Component{
    render(){
        return (
            <div>
                <ReactSwipe className="carousel" swipeOptions={{continuous: false}}>
                    <div><img src="https://m.360buyimg.com/mobilecms/s1125x549_jfs/t15928/191/616906053/190780/d721aa1b/5a378afcN7037bdcc.jpg!q70.jpg" alt=""/></div>
                    <div><img src="https://img1.360buyimg.com/da/jfs/t15943/14/531910942/299274/3ebab8da/5a333540N85317105.jpg" alt=""/></div>
                    <div><img src="https://m.360buyimg.com/mobilecms/s1125x549_jfs/t16225/48/502013417/118702/3269e00/5a3374caN7d197f94.jpg!q70.jpg" alt=""/></div>
                </ReactSwipe>
            </div>
        )
    }
}
import './index.less';