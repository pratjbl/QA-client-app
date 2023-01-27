import React, { useState } from "react";
import { Button } from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { ThreeDots } from "react-loader-spinner";
export default function ParseLoginAccessToken(props) {
  const { response, setResponse } = props;
  const [customParam, setCustomParam] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const { isAuthenticated, getAccessTokenSilently, getIdTokenClaims } =
    useAuth0();
  const getOTPAccessToken = ({ AccessToken }) => {
    try {
      var base64Url = AccessToken.split(".")[1];
      var base64 = base64Url?.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const ans = JSON.parse(jsonPayload);
      return ans;
    } catch (err) {
      console.log(err);
    }
  };
  const [parseAccessToken, setParseAccessToken] = useState(
    getOTPAccessToken({ AccessToken: response?.AccessToken?.access_token })
  );
  console.log("is this changing", parseAccessToken);
  const getNewAccessToken = async (props) => {
    setIsLoading(true);
    console.log("went in this one");
    if (isAuthenticated) {
      try {
        const data = await getAccessTokenSilently({
          ignoreCache: true,
          subrefid: props?.subrefid,
          id_token: response?.IdToken,
          access_token: response?.AccessToken?.access_token,
        });
        const data2 = await getIdTokenClaims();
        console.log("old", response.AccessToken, "new", data);
        setResponse({ AccessToken: data, IdToken: data2?.__raw });
        setParseAccessToken(getOTPAccessToken({ AccessToken: data }));
        setStatusMessage("Claims are updated");
        setIsLoading(false);
      } catch (err) {
        if (
          err.error === "unauthorized" ||
          err?.error_description?.rootCause?.code === "Invalid Parameter"
        ) {
          setStatusMessage("Incorrect value for subrefid");
        } else {
          setStatusMessage("Something went wrong ...");
        }
        setIsError(true);
        console.log(err);
        setIsLoading(false);
      }
    }
  };

  const getOTPIdToken = () => {
    try {
      var base64Url = response?.IdToken.split(".")[1];
      var base64 = base64Url?.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      const ans = JSON.parse(jsonPayload);
      console.log(ans);
      return ans;
    } catch (err) {
      console.log(err);
    }
  };

  const parse2 = getOTPIdToken();
  if (!isAuthenticated) {
    return <div>Please Login to get access token & ID token</div>;
  } else if (!parseAccessToken) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Something went wrong try to reload the application ...
      </div>
    );
  } else {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ padding: "1rem", border: "1px solid blue" }}>
            <b>Claims of Access token</b>
            <br />
            iss : {parseAccessToken?.iss}
            <br />
            sub : {parseAccessToken?.sub}
            <br />
            iat : {parseAccessToken?.iat}
            <br />
            exp : {parseAccessToken?.exp}
            <br />
            azp : {parseAccessToken?.azp}
            <br />
            scope : {parseAccessToken?.scope}
            <br />
            {parseAccessToken?.subrefid ? (
              <p style={{ margin: "0" }}>
                subrefid : {parseAccessToken?.subrefid}
              </p>
            ) : null}
            {parseAccessToken?.acctrefid ? (
              <p style={{ margin: "0" }}>
                acctrefid : {parseAccessToken?.acctrefid}
              </p>
            ) : null}
            {parseAccessToken?.prtnrrefid ? (
              <p style={{ margin: "0" }}>
                prtnrrefid : {parseAccessToken?.prtnrrefid}
              </p>
            ) : null}
          </div>
          <div
            style={{
              padding: "1rem",
              marginRight: "1rem",
              border: "1px solid blue",
            }}
          >
            <b>Claims of ID token</b>
            <br />
            Nickname : {parse2?.nickname}
            <br />
            Name : {parse2?.name}
            <br />
            Email : {parse2?.email}
            <br />
            Is Email Verified : {parse2?.email_verified}
            <br />
            Picture : {parse2?.picture}
            <br />
          </div>
        </div>
        <div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ fontWeight: "bold" }}>AccessToken: </p>
            <input
              type="text"
              style={{ width: "100%" }}
              value={response?.AccessToken?.access_token}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ marginTop: "0.5rem", wordBreak: "break-all" }}>
              <span style={{ fontWeight: "bold" }}>IdToken:</span>{" "}
            </p>
            <input type="text" value={response?.IdToken} />
          </div>
        </div>
        <div style={{ marginTop: "1rem" }}>
          {`subRefId: `}
          <input
            type="text"
            value={customParam}
            onChange={(e) => setCustomParam(e.target.value)}
          ></input>
          <br />
          <div
            style={{
              display: "flex",
              alignItems: "flex",
            }}
            className="mb-2"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                st
                color="primary"
                className="mt-2"
                onClick={(e) => {
                  getNewAccessToken({ subrefid: customParam });
                }}
              >
                Refresh token call
              </Button>
              <div
                className="ml-3"
                style={{
                  height: "10px",
                }}
              >
                {isLoading ? (
                  <ThreeDots height="25" width="25" />
                ) : isError ? (
                  <p style={{ color: "red" }}>{statusMessage}</p>
                ) : (
                  <p style={{ color: "green" }}>{statusMessage}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
