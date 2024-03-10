/**
 * author: Tsong
 * time: 2024/2/5 14:32
 */
import {App, Button} from "antd";

const Home = () => {
    const {message} = App.useApp()
    const handleAlert = () => {
        message.success('clicked', 2)
    }
    return (
        <div>
            This is home
            <Button onClick={handleAlert}>
                alert
            </Button>
        </div>
    )
}

export default Home
