/**
 * author: Tsong
 * time: 2024/2/5 14:32
 */
import { App, Button, Card, Statistic, Row, Col } from "antd";
import IntroBar from "@/component/IntroBar/IntroBar.jsx";
import { Link } from "react-router-dom";
import "./Home.less";

const Home = () => {
  const { message } = App.useApp();
  const handleAlert = () => {
    message.success("clicked", 2);
  };
  const user_data = {
    total_user: 17,
    apply_user: 1,
  };

  const practitioner_data = {
    total_cnt: 5,
    new_join: 1,
    gender: {
      f: 2,
      m: 3,
    },
    position: {
      doctor: 3,
      nurse: 2,
    },
  };

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
              <Statistic title="Active" value={user_data.total_user} />
            </Col>
            <Col span={12}>
              <Statistic title="Applying" value={user_data.apply_user} />
              <Button
                style={{
                  marginTop: 16,
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
              <Statistic title="Total" value={practitioner_data.total_cnt} />
            </Col>
            <Col span={12}>
              <Statistic title="New Join" value={practitioner_data.new_join} />
              <Button
                style={{
                  marginTop: 16,
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
