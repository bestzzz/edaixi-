import React,{Component} from 'react';
import './index.less'
export default class Comments extends Component{
    constructor(){
        super();
        this.state={
            comments:[
            {
                title:'北京用户：183****2973',
                comment:'一直他们家的服务，很不错，很专业',
                sub:'洗鞋服务  2017.10.18'
            },
            {
                title:'上海用户：187****2555',
                comment:'一直他们家的服务，很不错，很专业',
                sub:'洗鞋服务  2017.10.17'
            },
            {
                title:'吉林用户：183****2475',
                comment:'一直他们家的服务，很不错',
                sub:'洗鞋服务  2017.10.16'
            },
            {
                title:'山东用户：135****2000',
                comment:'一直他们家的服务，很不错，很专业',
                sub:'洗鞋服务  2017.10.12'
            },
            {
                title:'河北用户：182****2971',
                comment:'一直他们家的服务，很不错，很专业',
                sub:'洗鞋服务  2017.10.8'
            },
            {
                title:'北京用户：183****2973',
                comment:'一直他们家的服务，很不错，很专业',
                sub:'洗鞋服务  2017.10.18'
            },
            {
                title:'上海用户：187****2555',
                comment:'一直他们家的服务，很不错，很专业',
                sub:'洗鞋服务  2017.10.17'
            },
            {
                title:'吉林用户：183****2475',
                comment:'一直他们家的服务，很不错',
                sub:'洗鞋服务  2017.10.16'
            },
            {
                title:'山东用户：135****2000',
                comment:'一直他们家的服务，很不错，很专业',
                sub:'洗鞋服务  2017.10.12'
            },
            {
                title:'河北用户：182****2971',
                comment:'一直他们家的服务，很不错，很专业',
                sub:'洗鞋服务  2017.10.8'
            },
            {
                title:'北京用户：183****2973',
                comment:'一直他们家的服务，很不错，很专业',
                sub:'洗鞋服务  2017.10.18'
            },
            {
                title:'上海用户：187****2555',
                comment:'一直他们家的服务，很不错，很专业',
                sub:'洗鞋服务  2017.10.17'
            },
            {
                title:'吉林用户：183****2475',
                comment:'一直他们家的服务，很不错',
                sub:'洗鞋服务  2017.10.16'
            },
            {
                title:'山东用户：135****2000',
                comment:'一直他们家的服务，很不错，很专业',
                sub:'洗鞋服务  2017.10.12'
            },
            {
                title:'河北用户：182****2971',
                comment:'一直他们家的服务，很不错，很专业',
                sub:'洗鞋服务  2017.10.8'
            }
        ]}

    }

    render(){
        return (
            <div className="comments">

                {
                    this.state.comments.map((item,index)=>(
                        <ul key={index}>
                            <li className="title">{item.title}</li>
                            <p></p>
                            <li className="comment">{item.comment}</li>
                            <p></p>
                            <li className="sub">{item.sub}</li>
                        </ul>
                    ))
                }
            </div>
        )
    }
}