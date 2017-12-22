import React,{Component} from 'react';
import {compressImage} from '../../utils';

export default class UploadImg extends Component{
    //上传图片
    changeImage = (e) => {
        let target = e.target;
        if (!target.value) return;
        let imageSrc = URL.createObjectURL(target.files[0]);
        compressImage(imageSrc, 0.6, (img) => {
            //从引用组件的地方传过来的方法，用来执行获得图片以后的操作
            this.props.uploadImge({img});
            //释放内存
            URL.revokeObjectURL(imageSrc);
        });

    };
    render(){
        return (
            <div style={{width:'30%',height:'100%',position:'absolute'}}>
                <input type="file" onChange={this.changeImage} className='upFile'/>
            </div>
        )
    }
}
import './uploadImg.less'