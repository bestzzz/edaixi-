import React, {Component} from 'react';
// import './index.less'
import {comments} from '../../../../api'
import ReactIScroll from 'react-iscroll'
let iScroll=require('iscroll')

export default class Swiper extends Component {
    constructor() {
        super()
        this.state = {comment: []}
    }

    componentDidMount() {
        this.getComments()
    }

    async getComments() {
        let comment = await comments(1, 5);
        this.setState({comment:comment.coms});
    }

    render() {
        let options= {
            mouseWheel: true,
            momentum:true,
            freeScroll:true,
            disablePointer:true,
            disableTouch:false,
            disableMouse:false
        }
        return (
                <ReactIScroll iScroll={iScroll} options={{mouseWheel:false,
                    scrollX: true,
                    momentum:true,
                    freeScroll:true,
                    disablePointer:true,
                    disableTouch:false,
                    disableMouse:false}}>
                   <div>
                       {
                           this.state.comment.map((item, index) => (
                               <div key={index} className="comment-swiper"  style={{marginBottom:'0.2rem',
                                   color: '#bcbcbc',}}>
                                   <div className="swiper-name" style={{backgroundColor: '#ffffff',borderRadius:'10px'}}>
                                       <p className="swiper-tel" style={{padding: '0.2rem 0',
                                           fontSize: '0.2rem',
                                           textAlign: 'center'}}>{item.tel}</p>
                                       <i className="iconfont icon-icon-copy" style={{float:'left',fontSize:'0.4rem',padding:'0 0 0 0.4rem'}}></i>
                                          <span className="swiper-content" style={{display:'block',width:'85%',marginLeft:'15%',padding: '0.2rem 0',
                                              color: '#838383',
                                              textAlign: 'left',
                                              fontSize: '0.2rem'}}>
                                              {item.content}
                                              <i className="iconfont icon-icon-copy-copy" style={{float:'right',fontSize:'0.4rem',padding:'0 0.4rem 0 0'}}></i>
                                          </span>

                                       <p className="swiper-time" style={{ padding: '0.2rem 0.2rem 0.2rem 0',
                                           textAlign: 'right',
                                           fontSize: '0.2rem'}}>{item.time}</p>
                                   </div>
                               </div>

                           ))
                       }
                   </div>

                </ReactIScroll>
        )
    }
}
