/**
 * author: Tsong
 * time: 09/03/2024 01:54
 * 如果axios里面的用不了可以用这个
 */
import ReactDOM from "react-dom/client";
import {useEffect} from "react";
import {message} from "antd";

const Msg = (props) => {
    const {content, duration, type, to} = {...props}
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        messageApi
            .open({
                type: type,
                content: content,
                duration: duration / 1000
            })
            .then(() => {
                if (to != null && to !== '') {
                    window.location.href = to
                }
            })
    }, []);
    return (
        <div>
            {contextHolder}
        </div>
    )
}

const createMsg = (content, duration, to, type) => {
    const dom = document.createElement('div')
    const JSXdom = (
        <Msg content={content} duration={duration} to={to} type={type}/>
    )
    ReactDOM.createRoot(dom).render(JSXdom)
    document.getElementById('app').appendChild(dom)
    // document.body.appendChild(dom)
}

const msg = {
    success: (content, duration, to) => {
        createMsg(content, duration, to, 'success')
    },
    error: (content, duration, to) => {
        createMsg(content, duration, to, 'error')
    },
    warning: (content, duration, to) => {
        createMsg(content, duration, to,'warning')
    },
    info: (content, duration, to) => {
        createMsg(content, duration, to, 'info')
    },
}

export default msg;
