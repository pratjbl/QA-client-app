import React from "react";
import { useHistory } from "react-router-dom";

const Tokens = (props) => {
  const history = useHistory();
  const { detailsState, setDetailsState } = props;

  const getOTP = async (e) => {
    e.preventDefault();
    console.log("get-otp", detailsState);
    history.push("/token");
  };
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }}>
        EMAIL:
        <input
          type="text"
          value={detailsState.email}
          onChange={(e) => {
            setDetailsState({ ...detailsState, email: e.target.value });
          }}
        ></input>
        Enter OTP:
        <input
          type="text"
          value={detailsState.otp}
          onChange={(e) => {
            setDetailsState({ ...detailsState, otp: e.target.value });
          }}
        ></input>
        <button
          style={{ with: "50%" }}
          type="button"
          onClick={(e) => getOTP(e)}
        >
          <p onClick={(e) => getOTP(e)}>Some change</p>
        </button>
      </form>
    </div>
  );
};
export default Tokens;
