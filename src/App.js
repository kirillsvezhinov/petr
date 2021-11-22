import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  
} from "react-router-dom";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import "./App.css";

function App() {
  useEffect(() => {
    const checkAuth = () => {
      // if (localStorage.auth) {
      //   authSucces(localStorage.auth);
      // }
    };
    checkAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Router>
      <Container>
        <Row>
          <Col md={{ size: 3, offset: 1 }}>
            <Link to="/" exact>
              лого
              {/* <img className="logo" src={logo} alt="logo" /> */}
            </Link>
          </Col>
        </Row>
        <Switch>
        </Switch>
      </Container>
    </Router>
  );
}
const mapStateToProps = ({ auth }) => {
  return {
    // auth,
  };
};
const mapDispatchToProps = {
  
};

export default connect(null, null)(App);
