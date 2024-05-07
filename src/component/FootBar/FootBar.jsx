/**
 * author: Tsong
 * time: 2024/2/5 14:29
 */
import "./FootBar.less"
import {Divider, Layout} from "antd";
const {Footer} = Layout
const FootBar = () => {

    return (
        <Footer className="foot-bar">
            <Divider/>
            Copyright © 2024 Hanyu Li, Yu-chu Lai, Yaocong Huang. All rights reserved.
        </Footer>
    )
}

export default FootBar
