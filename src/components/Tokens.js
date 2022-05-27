import React from "react";
import { useHistory } from "react-router-dom";

const Tokens = (props) => {
  const history = useHistory();
  const { detailsState, setDetailsState } = props;

  const getParse = (e) => {
    if (e.target.id === "access") {
      history.push("/parseAccessToken");
    } else if (e.target.id === "Access") {
      history.push("/Access");
    }
  };

  const getOTP = async (e) => {
    e.preventDefault();
    console.log("get-otp", detailsState);
    history.push("/verify");
  };
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }}>
        AccessToken:
        <input
          type="text"
          value={detailsState.accessToken}
          onChange={(e) => {
            setDetailsState({ ...detailsState, accessToken: e.target.value });
          }}
        ></input>
        <button
          style={{ with: "50%" }}
          type="button"
          id="access"
          onClick={(e) => getParse(e)}
        >
          Parse Access Token
        </button>
        IdToken:
        <input
          type="text"
          value={detailsState.idToken}
          onChange={(e) => {
            setDetailsState({ ...detailsState, idToken: e.target.value });
          }}
        ></input>
        <button
          style={{ with: "50%" }}
          type="button"
          id="id"
          onClick={(e) => getParse(e)}
        >
          Parse ID Token
        </button>
        RefreshToken:
        <input
          type="text"
          value={detailsState.refreshToken}
          onChange={(e) => {
            setDetailsState({ ...detailsState, refreshToken: e.target.value });
          }}
        ></input>
        <button
          style={{ with: "50%" }}
          type="button"
          onClick={(e) => getOTP(e)}
        >
          Some change
        </button>
      </form>
    </div>
  );
};
export default Tokens;
