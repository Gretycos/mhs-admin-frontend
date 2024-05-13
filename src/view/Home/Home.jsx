/**
 * author: Tsong
 * time: 2024/2/5 14:32
 */
import { App, Button, Card, Statistic, Row, Col } from "antd";
import IntroBar from "@/component/IntroBar/IntroBar.jsx";
import { Link } from "react-router-dom";
import "./Home.less";
import {
  getRegisteringNumber,
  getEmployeeNumber,
} from "@/service/user/admin.js";
import { useState, useEffect } from "react";

const Home = () => {
  const [applyUser, setApplyUser] = useState(0);
  const [practNum, setPractNum] = useState({
    Doctor: 0,
    Nurse: 0,
    Tester: 0,
    Other: 0,
  });

  const getRequestNumber = async () => {
    const { data } = await getRegisteringNumber();
    setApplyUser(data);
  };

  const practRole = {
    0: "Doctor",
    1: "Nurse",
    2: "Tester",
    3: "Other",
  };

  const getPractitionerNumber = async () => {
    const { data } = await getEmployeeNumber();
    setPractNum({
      Doctor: data.filter((item) => item.role === 0)[0].number,
      Tester: data.filter((item) => item.role === 1)[0].number,
      Nurse: data.filter((item) => item.role === 2)[0].number,
      Other: data.filter((item) => item.role === 3)[0].number,
    });
  };

  useEffect(() => {
    getRequestNumber();
    getPractitionerNumber();
  }, []);

  useEffect(() => {}, [applyUser, practNum]);

  return (
    <div className="home-pg">
      <IntroBar title="Home" />
      <div className="card-list">
        <Card
          title="Register Patients"
          style={{
            width: 300,
          }}
          className="card"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="Applying" value={applyUser} />
              <Button
                style={{
                  marginTop: 16,
                  marginLeft: 120,
                }}
                type="primary"
              >
                <Link to="/request" onClick={(e) => e.stopPropagation()}>
                  View Request
                </Link>
              </Button>
            </Col>
          </Row>
        </Card>

        <Card
          title="Practitioners"
          style={{
            width: 300,
          }}
          className="card"
        >
          <Row gutter={16}>
            <Col span={12}>
              <div className="position">
                <Statistic
                  title="Doctor"
                  value={practNum.Doctor}
                  className="item"
                />
                <Statistic
                  title="Nurse"
                  value={practNum.Nurse}
                  className="item"
                />
                <Statistic
                  title="Tester"
                  value={practNum.Tester}
                  className="item"
                />
                <Statistic
                  title="Other"
                  value={practNum.Other}
                  className="item"
                />
              </div>

              <Button
                style={{
                  marginTop: 16,
                  marginLeft: 160,
                }}
                type="primary"
              >
                <Link
                  to="/manage-employee"
                  onClick={(e) => e.stopPropagation()}
                >
                  View All
                </Link>
              </Button>
            </Col>
          </Row>
        </Card>
      </div>

      {/* <Button onClick={handleAlert}>alert</Button> */}
    </div>
  );
};

export default Home;
