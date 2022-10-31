import React, { useState } from "react";
import { Button, Alert } from "reactstrap";
import Highlight from "../components/Highlight";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { getConfig } from "../config";
import Loading from "../components/Loading";
import axios from "axios";

export const CustomClaimsComponent = (props) => {
  const { apiOrigin = "http://localhost:3001", audience } = getConfig();
  const config = getConfig();
  const obj = localStorage.getItem(
    `@@auth0spajs@@::${config.clientId}::https://api.mcafee.com::openid profile email offline_access`
  );
  const { Subscription = [] } = props;

  const [selectedValue, setSelectedValue] = useState(
    Object.keys(Subscription)[0]
  );
  const jObj = JSON.parse(obj);
  const ref_token = jObj?.body?.refresh_token;
  const [state, setState] = useState({
    showResult: false,
    apiMessage: "",
    error: null,
  });
  const [subrefValue, setSubrefValue] = useState("");
  const { getAccessTokenSilently, loginWithPopup, getAccessTokenWithPopup } =
    useAuth0();

  // const handleConsent = async () => {
  //   try {
  //     await getAccessTokenWithPopup();
  //     setState({
  //       ...state,
  //       error: null,
  //     });
  //   } catch (error) {
  //     setState({
  //       ...state,
  //       error: error.error,
  //     });
  //   }

  //   await callApi();
  // };

  // const handleLoginAgain = async () => {
  //   try {
  //     await loginWithPopup();
  //     setState({
  //       ...state,
  //       error: null,
  //     });
  //   } catch (error) {
  //     setState({
  //       ...state,
  //       error: error.error,
  //     });
  //   }

  //   await callApi();
  // };

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${apiOrigin}/api/external`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      setState({
        ...state,
        showResult: true,
        apiMessage: responseData,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }
  };

  const callMFAApi = async () => {
    console.log(subrefValue);
    try {
      console.log("D");
      const token = await getAccessTokenSilently({
        subrefid: subrefValue,
        ignoreCache: true,
      });
      console.log(token);
    } catch (error) {
      console.log(error);
    }
  };
  const handle = (e, fn) => {
    e.preventDefault();
    fn();
  };
  const getToken = async (e) => {
    e.preventDefault();
    const optionsLogin = {
      "content-type": "application/x-www-form-urlencoded",
    };
    const jsonBody = {
      client_id: config.clientId,
      grant_type: "refresh_token",
      refresh_token: ref_token,
      subrefid: Subscription[selectedValue],
    };
    const data = new URLSearchParams(jsonBody).toString();
    try {
      const token = await axios.post(
        `https://${config.domain}/oauth/token`,
        data,
        {
          headers: optionsLogin,
        }
      );
      console.log(token.data.access_token);
      //   setFinalTextBox(token.data.access_token);
      //   setAnchor(`https://jwt.io/#access_token=${token.data.access_token}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="mb-5">
        {/* {state.error === "consent_required" && (
          <Alert color="warning">
            You need to{" "}
            <a
              href="#/"
              class="alert-link"
              onClick={(e) => handle(e, handleConsent)}
            >
              consent to get access to users api
            </a>
          </Alert>
        )}

        {state.error === "login_required" && (
          <Alert color="warning">
            You need to{" "}
            <a
              href="#/"
              class="alert-link"
              onClick={(e) => handle(e, handleLoginAgain)}
            >
              log in again
            </a>
          </Alert>
        )} */}

        <h1>Custom Claims</h1>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input
            type="text"
            onChange={(e) => setSubrefValue(e.target.value)}
          ></input>
          <Button
            color="primary"
            className="mt-5"
            onClick={(e) => getToken(e)}
            disabled={!audience}
          >
            Refresh token
          </Button>
        </div>
      </div>

      <div className="result-block-container">
        {state.showResult && (
          <div className="result-block" data-testid="api-result">
            <h6 className="muted">Result</h6>
            <Highlight>
              <span>{JSON.stringify(state.apiMessage, null, 2)}</span>
            </Highlight>
          </div>
        )}
      </div>
    </>
  );
};

export default withAuthenticationRequired(CustomClaimsComponent, {
  onRedirecting: () => <Loading />,
});
