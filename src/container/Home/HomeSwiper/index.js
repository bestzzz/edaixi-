import React,{Component} from 'react';
import ReactSwipe from 'react-swipe'
import './index.less'
import sliders from '../img'
export default class HomeSwiper extends Component{
    constructor(){
        super()
        this.state={index:0}
    }
    render(){
        let swipeOptions={
            auto:2000,
            continuous:true,
            callback:(index,elem)=> {
                this.setState({index})
            }
        };
        let swiper=(<ReactSwipe swipeOptions={swipeOptions}>
            {
                sliders.map((item,index)=>(
                   <img key={index}  src={item} alt=""/>
                ))
            }
        </ReactSwipe>)
        return (
            <div className="swiper">
                {
                    swiper
                }
                <div className="dots">
                    {
                        sliders.map((item,index)=>(
                            <span className={"dot "+(this.state.index==index?'active':'')} key={index}></span>
                        ))
                    }
                </div>
            </div>
        )
    }
}
