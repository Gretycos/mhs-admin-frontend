/**
 * author: Tsong
 * time: 2024/2/5 14:29
 */
import "./TopBar.less";
import { UserOutlined } from "@ant-design/icons";
import {Layout, Avatar, Dropdown} from "antd";
import {useEffect, useState} from "react";
import {getAdminInfo, logout} from "@/service/user/admin.js";
import {store} from "@/redux/store.js";
import {useDispatch} from "react-redux";
import {save} from "@/redux/slice/globalSlice.js";
import {useNavigate} from "react-router-dom";

const { Header } = Layout;


const TopBar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [fullName, setFullName] = useState("")

    useEffect(() => {
        getUserInfo()
    }, []);

    const getUserInfo = async () => {
        // const userId = store.getState()?.globalSlice.userId
        const {data} = await getAdminInfo()
        const name = `${data.givenName} ${data.familyName == null ? "" : data.familyName}`
        setFullName(name)
    }

  const dropdownItemsLoggedIn = [
    {
      key: '0',
      label: (
          <div className="top-bar-login-dropdown">
            Sign out
          </div>
      ),
    },
  ]

    const onClickLoggedIn = (e) => {
        // console.log(e.key)
        // console.log(typeof e.key)
        if (e.key === "0") {
            // sign out
            const params = {
                token: store.getState()?.globalSlice.token
            }
            logout(params)
            dispatch(save({ adminId: '' }))
            dispatch(save({ token: '' }))
            navigate("/")
        }
    }


  // console.log(data, TitleList);
  return (
    <Header className="top-bar">
        <Dropdown
            menu={
                {
                    items: dropdownItemsLoggedIn,
                    onClick: onClickLoggedIn,
                }
            }
            placement="bottom"
        >
            <div className="top-bar-user-info">
                <span>Welcome, {fullName}</span>
                <Avatar icon={<UserOutlined/>} className="icon"/>
            </div>
        </Dropdown>
    </Header>
  );
};

export default TopBar;
