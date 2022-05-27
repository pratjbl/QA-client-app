import React from "react";
import { useHistory } from "react-router-dom";

const OTP = (props) => {
  const history = useHistory();
  const { detailsState, setDetailsState } = props;
  const getOTP = async (e) => {
    e.preventDefault();
    console.log("get-otp", detailsState);
    history.push("/verify");
  };
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }}>
        EMAIL:
        <input
          type="text"
          value={props.email}
          onChange={(e) => {
            setDetailsState({ ...detailsState, email: e.target.value });
          }}
        ></input>
        <button
          style={{ with: "50%" }}
          type="button"
          onClick={(e) => getOTP(e)}
        >
          <p onClick={(e) => getOTP(e)}>start-otp-flow</p>
        </button>
      </form>
    </div>
  );
};
export default OTP;
