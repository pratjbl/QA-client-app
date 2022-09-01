import React from "react";
import { Button } from "reactstrap";
export default function ParseLoginIdToken(props) {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ fontWeight: "bold" }}>AccessToken: </p>
        <input
          type="text"
          style={{ width: "100%" }}
          value={props.response.AccessToken}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ marginTop: "0.5rem", wordBreak: "break-all" }}>
          <span style={{ fontWeight: "bold" }}>IdToken:</span>{" "}
        </p>
        <input type="text" value={props.response.IdToken} />
      </div>{" "}
      <div>
        {" "}
        <p style={{ fontWeight: "bold" }}> Custom parameter:</p>
        <input type="text" onChange={(e) => {}}></input>
        <br />
        <Button color="primary" className="mt-5" onClick={() => {}}>
          Refresh token call
        </Button>
      </div>
    </div>
  );
}
