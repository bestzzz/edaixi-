import React, {Component} from 'react';
import ReactSwipe from 'react-swipe'
import './index.less'
import {comments} from '../../../../api'
import sliders from '../../img'

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
        let swipeOptions = {

            callback: (index, elem) => {
            }
        };
        let swiper = (<ReactSwipe className="carousel" key={this.state.comment.length}>
            {
                this.state.comment.map((item, index) => (
                    <div key={index} className="comment-swiper">
                        <div className="swiper-name">
                            <p className="swiper-tel">{item.tel}</p>
                            <p className="swiper-content">“{item.content}”</p>
                            <p className="swiper-time">{item.time}</p>
                        </div>
                    </div>

                ))
            }

        </ReactSwipe>)
        return (
            <div>
                {
                    swiper
                }

            </div>
        )
    }
}
