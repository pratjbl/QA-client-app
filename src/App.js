import React, { useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import OTP from "./components/otp";
import Tokens from "./components/Tokens";
import OTPFill from "./components/OTPFill";
import ID from "./components/ID";
import Access from "./components/Access";
import Refresh from "./components/Refresh";
initFontAwesome();

const App = () => {
  const [detailsState, setDetailsState] = useState({
    email: "",
    otp: "",
    accessToken: "",
    idToken: "",
    refreshToken: "",
  });
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={() => Home()} />
            <Route path="/profile" component={Profile} />
            <Route path="/external-api" component={ExternalApi} />
            <Route path="/otp" exact>
              <OTP
                detailsState={detailsState}
                setDetailsState={setDetailsState}
              />
            </Route>
            <Route path="/verify" exact>
              <OTPFill
                detailsState={detailsState}
                setDetailsState={setDetailsState}
              />
            </Route>
            <Route path="/token" exact>
              <Tokens
                detailsState={detailsState}
                setDetailsState={setDetailsState}
              />
            </Route>
            <Route path="/parseAccessToken" exact>
              <Access
                detailsState={detailsState}
                setDetailsState={setDetailsState}
              />
            </Route>
            <Route path="/parseIDToken" exact>
              <ID
                detailsState={detailsState}
                setDetailsState={setDetailsState}
              />
            </Route>
            <Route path="/parseRefreshToken" exact>
              <Refresh
                detailsState={detailsState}
                setDetailsState={setDetailsState}
              />
            </Route>
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
