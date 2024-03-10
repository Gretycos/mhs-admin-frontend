/**
 * author: Tsong
 * time: 2024/2/5 14:32
 */
import {useEffect} from "react";
import './WorkShift.less'

const WorkShift = () => {

    useEffect(() => {
        // 组件挂载和依赖变动后
        return () => {
            // 依赖变动后和组件卸载
        }
    }, []); // 依赖为空表示挂载后和卸载前不会调用该函数

    return (
        <div>
            This is work shift
            <div></div>
        </div>
    )
}

export default WorkShift
