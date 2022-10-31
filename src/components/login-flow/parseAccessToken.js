import React, { useState } from "react";
import { Button } from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";

export default function ParseLoginAccessToken(props) {
  const { response, setResponse } = props;
  const [customParam, setCustomParam] = useState("");
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
    getOTPAccessToken({ AccessToken: response?.AccessToken })
  );
  console.log("is this changing", parseAccessToken);
  const getNewAccessToken = async (props) => {
    console.log("went in this one");
    if (isAuthenticated) {
      try {
        const data = await getAccessTokenSilently({
          ignoreCache: true,
          subrefid: props?.subrefid,
          id_token: response?.IdToken,
          access_token: response?.AccessToken,
        });
        const data2 = await getIdTokenClaims();
        console.log("old", response.AccessToken, "new", data);
        setResponse({ AccessToken: data, IdToken: data2?.__raw });
        setParseAccessToken(getOTPAccessToken({ AccessToken: data }));
      } catch (err) {
        console.log(err);
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
              <p>subrefid : {parseAccessToken?.subrefid}</p>
            ) : null}
            {parseAccessToken?.acctrefid ? (
              <p>acctrefid : {parseAccessToken?.acctrefid}</p>
            ) : null}
            {parseAccessToken?.prtnrrefid ? (
              <p>prtnrrefid : {parseAccessToken?.prtnrrefid}</p>
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
              value={response?.AccessToken}
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
        </div>
      </div>
    );
  }
}
