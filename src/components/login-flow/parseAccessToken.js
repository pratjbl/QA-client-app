import React, { useState } from "react";
import { Button } from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";

export default function ParseLoginAccessToken(props) {
  const { response, setResponse } = props;
  const [customParam, setCustomParam] = useState("");
  const { isAuthenticated, getAccessTokenSilently, getIdTokenClaims } =
    useAuth0();
  const getOTPAccessToken = ({ AccessToken }) => {
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
  };
  const [parseAccessToken, setParseAccessToken] = useState(
    getOTPAccessToken({ AccessToken: response?.AccessToken })
  );
  console.log("is this changing", parseAccessToken);
  const getNewAccessToken = async (props) => {
    console.log("went in this one");
    if (isAuthenticated) {
      const data = await getAccessTokenSilently({
        ignoreCache: true,
        subrefid: props.subrefid,
      });
      const data2 = await getIdTokenClaims();
      console.log("old", response.AccessToken, "new", data);
      setResponse({ AccessToken: data, IdToken: data2?.__raw });
      setParseAccessToken(getOTPAccessToken({ AccessToken: data }));
    }
  };

  const getOTPIdToken = () => {
    console.log("e");
    var base64Url = response?.IdToken.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
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
  };

  const parse2 = getOTPIdToken();
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
          Issuer : {parseAccessToken.iss}
          <br />
          Subject : {parseAccessToken.sub}
          <br />
          Issued at : {parseAccessToken.iat}
          <br />
          Expires in : {parseAccessToken.exp}
          <br />
          Client(Authorized party) : {parseAccessToken.azp}
          <br />
          Scopes : {parseAccessToken.scope}
          <br />
          {parseAccessToken.subrefid ? (
            <p>SubrefId : {parseAccessToken.subrefid}</p>
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
          Nickname : {parse2.nickname}
          <br />
          Name : {parse2.name}
          <br />
          Email : {parse2.email}
          <br />
          Is Email Verified : {parse2.email_verified}
          <br />
          Picture : {parse2.picture}
          <br />
        </div>
      </div>
      <div style={{ marginTop: "1rem" }}>
        Custom parameter:
        <input
          type="text"
          value={customParam}
          onChange={(e) => setCustomParam(e.target.value)}
        ></input>
        <br />
        <Button
          color="primary"
          className="mt-5"
          onClick={(e) => {
            getNewAccessToken({ subrefid: customParam });
          }}
        >
          Refresh token call
        </Button>
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
      </div>
    </div>
  );
}
