import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
// import { useHistory } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { getConfig } from "../../config";

const config = getConfig();

function MainComponent(props) {
  // const { setSubscription } = props;
  const [displayDelete] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  // const history = useHistory();
  // const getParse = (e) => {
  //   if (e.target.id === "AccessTokenParse") {
  //     history.push("/parseLoginAccessToken");
  //   } else if (e.target.id === "IdTokenParse") {
  //     history.push("/parseLoginIdToken");
  //   } else if (e.target.id === "refresh") {
  //     history.push("/parseRefreshToken");
  //   }
  // };

  const { user, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  console.log(user);
  let result;
  console.log(isEnrolled, "mfa");
  useEffect(() => {
    const onPageLoadGet = async () => {
      if (user) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        result = user.sub.slice(6);
        const token = await getAccessTokenSilently();
        console.log(token);

        const optionsConn = {
          method: "GET",
          url: `https://idqa.mcafee.com/mfa/authenticators`,
          headers: {
            "content-type": "application/json",
            authorization: "Bearer " + token,
          },
        };

        const respCon = await axios.request(optionsConn);
        console.log(respCon, "res");
        if (respCon.data && respCon.data.length > 0) {
          setIsEnrolled(false);
        } else {
          console.log("bye");
          setIsEnrolled(true);
        }
      }
    };
    onPageLoadGet();
  }, []);

  console.log(result);
  // const getSubs = async (e) => {
  //   e.preventDefault();

  //   //console.log("get-otp", detailsState);
  //   const optionsLogin = {
  //     "content-type": "application/json",
  //     cd: "e8ed6c5f2bb44875abc220cb07c27898-f4922599d076",
  //     st: 3,
  //     sv: "V1",
  //     ak: "839B7212425445D1A1113E42708908C5PPS",
  //   };
  //   const jsonBody = {
  //     app_id: "f989723c-3e01-4328-8424-740383c26c11",
  //     type: "ByGlobalRef",
  //     Global_Reference_Id: result,
  //     Include_All_Subs: true,
  //   };
  //   //const data = new URLSearchParams(jsonBody).toString();
  //   try {
  //     const token = await axios.post(
  //       "v2/ProductProvision/GetSubscriptions",
  //       jsonBody,
  //       {
  //         headers: optionsLogin,
  //       }
  //     );
  //     const provisionList = token?.data?.provision_list;
  //     const FinalList = provisionList.reduce((result, item) => {
  //       return { ...result, [item.pkg_name]: item?.provision_id };
  //     }, {});
  //     setSubscription(FinalList);
  //     console.log(FinalList);
  //     history.push("/parseSubscription");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const mfaUL = async (e) => {
    try {
      console.log("Enrolling MFA via UL...");

      const options = {
        redirect_uri: window.location.origin,
        //audience: "https://mudit-dev.us.auth0.com/mfa/",
        //scope: "enroll read:authenticators remove:authenticators",
        acr_values:
          "http://schemas.openid.net/pape/policies/2007/06/multi-factor",
        //acr_values:"multi-factor"
      };

      await loginWithRedirect(options);
    } catch (err) {
      console.log("Enroll MFA via UL failed", err);
    }
  };
  const disableMFA = async (e) => {
    try {
      console.log("disabling MFA via api...");

      const token = await getAccessTokenSilently();
      console.log(token);

      const optionsConn = {
        method: "GET",
        url: `https://${config.domain}/mfa/authenticators`,
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + token,
        },
      };

      const respCon = await axios.request(optionsConn);
      console.log(respCon);
      var toDelete;
      if (respCon.data && respCon.data.length > 0) {
        toDelete = respCon.data[0];
        const id = toDelete.id;

        const optionsDel = {
          headers: {
            "content-type": "application/json",
            authorization: "Bearer " + token,
          },
        };

        const respDel = await axios.delete(
          `https://${config.domain}/mfa/authenticators/${id}`,
          optionsDel
        );
        if (respDel.status === 204) {
          console.log("disabled");
          setIsEnrolled(true);
          alert("disabled MFA");
        }
      }
    } catch (err) {
      console.log("Enroll MFA via UL failed", err);
    }
  };
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ fontWeight: "bold" }}>AccessToken: </p>
        <input
          type="text"
          style={{ width: "100%" }}
          onChange={() => {}}
          value={props?.response?.AccessToken}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ marginTop: "0.5rem", wordBreak: "break-all" }}>
          <span style={{ fontWeight: "bold" }}>IdToken:</span>{" "}
        </p>
        <input
          type="text"
          onChange={() => {}}
          value={props?.response?.IdToken}
        />
        {/* <Button
          color="primary"
          className="mt-5"
          id="AccessTokenParse"
          onClick={(e) => getParse(e)}
        >
          Parse Tokens
        </Button>
        <hr />
        <Button
          color="primary"
          className="mt-5"
          id="getSubscriptions"
          onClick={(e) => getSubs(e)}
          onClick={(e) => getSubs(e)}
        >
          Get Subscriptions
        </Button>
        <hr /> */}
        {isEnrolled ? (
          <Button
            color="primary"
            className="mt-5"
            id="ulMFA"
            /*onClick={(e) => getSubs(e)}*/
            onClick={(e) => mfaUL(e)}
            style={{ backgroundColor: "green" }}
          >
            Enroll 2FA
          </Button>
        ) : (
          <Button
            color="primary"
            className="mt-5"
            id="disableMFA"
            /*onClick={(e) => getSubs(e)}*/
            onClick={(e) => disableMFA(e)}
            style={{ backgroundColor: "red" }}
          >
            Disable MFA
          </Button>
        )}

        {displayDelete ? alert("You have successfully deleted MFA") : null}
      </div>
    </div>
  );
}

export default MainComponent;
