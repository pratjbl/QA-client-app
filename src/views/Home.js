import React, { Fragment, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { addNewKeyValuePair } from "../feature/commonState";
import logo from "../assets/Mcafee-Logo.svg";

const Home = () => {
  const [togglePrefilEmail, setTogglePrefilEmail] = useState(false);
  const [disablePrefilEmailState, disablePrefilEmail] = useState(false);
  const [currentQuery, setCurrentQuery] = useState({
    query: "",
    value: "",
    culture: "",
    prefillEmail: "",
    affid: "",
    landing_screen: "login",
    hideLoginCTA: false,
    hideSignUp: false,
    ui_locales: "",
    enableBack: false,
    enableSkip: false,
    hideHeader: false,
    hideFooter: false,
  });

  const currentValue = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const GetSomething = () => {
    dispatch(
      addNewKeyValuePair({ key: currentQuery.query, value: currentQuery.value })
    );
  };
  console.log(currentValue);
  const ChangeLanding = (e) => {
    setCurrentQuery({
      ...currentQuery,
      landing_screen: e.target.value,
    });
    dispatch(addNewKeyValuePair({ key: "mode", value: e.target.value }));
  };

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontWeight: 800,
            marginBottom: "2rem",
          }}
        >
          {" "}
          <img
            className="app-logo"
            src={logo}
            alt="React logo"
            width="100px"
          />{" "}
          | QA
        </div>

        <div>
          {Object.keys(currentValue).length !== 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0B1634",
                color: "white",
                padding: "4rem",
                marginBottom: "1rem",
                borderRadius: "2rem",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                fontWeight: 600,
                fontSize: "2rem",
              }}
            >
              {Object.keys(currentValue).map((value, index) => {
                return (
                  <div key={`${index}1243`}>
                    <p>
                      {value}:{String(currentValue[value])}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
          <div style={{ fontWeight: 700 }}>
            Land on Different Page
            <select
              style={{
                marginLeft: "1rem",
                marginBottom: "1rem",
              }}
              value={currentQuery.landing_screen}
              onChange={ChangeLanding}
            >
              <option value="login">LoginPage Page(Default)</option>
              <option value="login_otp">OTP LoginPage Page</option>
              <option value="register">Signup Page</option>
            </select>
          </div>
          {currentQuery?.landing_screen === "register" ? (
            <div
              style={{
                display: "flex",
                marginBottom: "1rem",
                fontWeight: 700,
              }}
            >
              Hide Login Redirection{" "}
              {currentQuery?.hideLoginCTA ? (
                <button
                  style={{
                    marginLeft: "1rem",
                    borderRadius: "2rem",
                    background: "#43CB2B",
                    color: "white",
                    border: "1px solid white",
                  }}
                  onClick={(e) => {
                    setCurrentQuery({
                      ...currentQuery,
                      hideLoginCTA: false,
                    });
                    dispatch(
                      addNewKeyValuePair({ key: "hideLoginCTA", value: false })
                    );
                  }}
                >
                  Yes
                </button>
              ) : (
                <button
                  style={{
                    marginLeft: "1rem",
                    borderRadius: "2rem",
                    border: "1px solid white",
                  }}
                  onClick={(e) => {
                    setCurrentQuery({
                      ...currentQuery,
                      hideLoginCTA: true,
                    });
                    dispatch(
                      addNewKeyValuePair({ key: "hideLoginCTA", value: true })
                    );
                  }}
                >
                  No
                </button>
              )}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                marginBottom: "1rem",
                fontWeight: 700,
              }}
            >
              Hide Signup Redirection{" "}
              {currentQuery?.hideSignUp ? (
                <button
                  style={{
                    marginLeft: "1rem",
                    borderRadius: "2rem",
                    background: "#43CB2B",
                    color: "white",
                    border: "1px solid white",
                  }}
                  onClick={(e) => {
                    setCurrentQuery({
                      ...currentQuery,
                      hideSignUp: false,
                    });
                    dispatch(
                      addNewKeyValuePair({ key: "hideSignUp", value: false })
                    );
                  }}
                >
                  Yes
                </button>
              ) : (
                <button
                  style={{
                    marginLeft: "1rem",
                    borderRadius: "2rem",
                    border: "1px solid white",
                  }}
                  onClick={(e) => {
                    setCurrentQuery({
                      ...currentQuery,
                      hideSignUp: true,
                    });
                    dispatch(
                      addNewKeyValuePair({ key: "hideSignUp", value: true })
                    );
                  }}
                >
                  No
                </button>
              )}
            </div>
          )}

          <div
            style={{
              display: "flex",
              marginBottom: "1rem",
              fontWeight: 700,
            }}
          >
            Pre-fill Email{" "}
            {togglePrefilEmail ? (
              <button
                style={{
                  marginLeft: "1rem",
                  borderRadius: "2rem",
                  background: "#43CB2B",
                  color: "white",
                  border: "1px solid white",
                }}
                onClick={() => {
                  setTogglePrefilEmail(false);
                }}
              >
                Yes
              </button>
            ) : (
              <button
                style={{
                  marginLeft: "1rem",
                  borderRadius: "2rem",
                  border: "1px solid white",
                }}
                onClick={() => {
                  setTogglePrefilEmail(true);
                }}
              >
                No
              </button>
            )}
            {togglePrefilEmail ? (
              <div
                style={{
                  fontWeight: 700,
                  marginLeft: "1rem",
                }}
              >
                <label>Enter Valid Email</label>{" "}
                <input
                  type="text"
                  placeholder="abc@dispostable.com"
                  value={currentQuery.prefillEmail}
                  style={{
                    marginLeft: "1rem",
                  }}
                  onChange={(e) => {
                    setCurrentQuery({
                      ...currentQuery,
                      prefillEmail: e.target.value,
                    });
                  }}
                  onBlur={(e) => {
                    dispatch(
                      addNewKeyValuePair({ key: "ea", value: e.target.value })
                    );
                  }}
                />
              </div>
            ) : null}
          </div>
          {togglePrefilEmail ? (
            <div
              style={{
                margin: "1rem 0rem",
                fontWeight: 700,
              }}
            >
              DisableEmail:{" "}
              {disablePrefilEmailState ? (
                <button
                  style={{
                    marginLeft: "1rem",
                    borderRadius: "2rem",
                    background: "#43CB2B",
                    color: "white",
                    border: "1px solid white",
                  }}
                  onClick={() => {
                    dispatch(
                      addNewKeyValuePair({ key: "disableEmail", value: false })
                    );
                    disablePrefilEmail(false);
                  }}
                >
                  Yes
                </button>
              ) : (
                <button
                  style={{
                    marginLeft: "1rem",
                    borderRadius: "2rem",
                    border: "1px solid white",
                  }}
                  onClick={() => {
                    dispatch(
                      addNewKeyValuePair({ key: "disableEmail", value: true })
                    );
                    disablePrefilEmail(true);
                  }}
                >
                  No
                </button>
              )}
            </div>
          ) : null}
          <div
            style={{
              marginBottom: "1rem",
              fontWeight: 700,
            }}
          >
            Culture{" "}
            <input
              type="text"
              placeholder="Eg en-us"
              value={currentQuery.culture}
              style={{
                marginLeft: "1rem",
              }}
              onChange={(e) => {
                setCurrentQuery({
                  ...currentQuery,
                  culture: e.target.value,
                });
              }}
              onBlur={(e) => {
                dispatch(
                  addNewKeyValuePair({ key: "culture", value: e.target.value })
                );
              }}
            />
          </div>
          <div
            style={{
              marginBottom: "1rem",
              fontWeight: 700,
            }}
          >
            enableBack:
            {currentQuery?.enableBack ? (
              <button
                style={{
                  marginLeft: "1rem",
                  borderRadius: "2rem",
                  background: "#43CB2B",
                  color: "white",
                  border: "1px solid white",
                }}
                onClick={() => {
                  dispatch(
                    addNewKeyValuePair({ key: "enableBack", value: false })
                  );
                  setCurrentQuery({ ...currentQuery, enableBack: false });
                }}
              >
                Yes
              </button>
            ) : (
              <button
                style={{
                  marginLeft: "1rem",
                  borderRadius: "2rem",
                  border: "1px solid white",
                }}
                onClick={() => {
                  dispatch(
                    addNewKeyValuePair({ key: "enableBack", value: true })
                  );
                  setCurrentQuery({ ...currentQuery, enableBack: true });
                }}
              >
                No
              </button>
            )}
          </div>
          <div
            style={{
              marginBottom: "1rem",
              fontWeight: 700,
            }}
          >
            enableSkip:
            {currentQuery?.enableSkip ? (
              <button
                style={{
                  marginLeft: "1rem",
                  borderRadius: "2rem",
                  background: "#43CB2B",
                  color: "white",
                  border: "1px solid white",
                }}
                onClick={() => {
                  dispatch(
                    addNewKeyValuePair({ key: "enableSkip", value: false })
                  );
                  setCurrentQuery({ ...currentQuery, enableSkip: false });
                }}
              >
                Yes
              </button>
            ) : (
              <button
                style={{
                  marginLeft: "1rem",
                  borderRadius: "2rem",
                  border: "1px solid white",
                }}
                onClick={() => {
                  dispatch(
                    addNewKeyValuePair({ key: "enableSkip", value: true })
                  );
                  setCurrentQuery({ ...currentQuery, enableSkip: true });
                }}
              >
                No
              </button>
            )}
          </div>
          <div
            style={{
              marginBottom: "1rem",
              fontWeight: 700,
            }}
          >
            hideHeader:
            {currentQuery?.hideHeader ? (
              <button
                style={{
                  marginLeft: "1rem",
                  borderRadius: "2rem",
                  background: "#43CB2B",
                  color: "white",
                  border: "1px solid white",
                }}
                onClick={() => {
                  dispatch(
                    addNewKeyValuePair({ key: "hideHeader", value: false })
                  );
                  setCurrentQuery({ ...currentQuery, hideHeader: false });
                }}
              >
                Yes
              </button>
            ) : (
              <button
                style={{
                  marginLeft: "1rem",
                  borderRadius: "2rem",
                  border: "1px solid white",
                }}
                onClick={() => {
                  dispatch(
                    addNewKeyValuePair({ key: "hideHeader", value: true })
                  );
                  setCurrentQuery({ ...currentQuery, hideHeader: true });
                }}
              >
                No
              </button>
            )}
          </div>
          <div
            style={{
              marginBottom: "1rem",
              fontWeight: 700,
            }}
          >
            hideFooter:
            {currentQuery?.hideFooter ? (
              <button
                style={{
                  marginLeft: "1rem",
                  borderRadius: "2rem",
                  background: "#43CB2B",
                  color: "white",
                  border: "1px solid white",
                }}
                onClick={() => {
                  dispatch(
                    addNewKeyValuePair({ key: "hideFooter", value: false })
                  );
                  setCurrentQuery({ ...currentQuery, hideFooter: false });
                }}
              >
                Yes
              </button>
            ) : (
              <button
                style={{
                  marginLeft: "1rem",
                  borderRadius: "2rem",
                  border: "1px solid white",
                }}
                onClick={() => {
                  dispatch(
                    addNewKeyValuePair({ key: "hideFooter", value: true })
                  );
                  setCurrentQuery({ ...currentQuery, hideFooter: true });
                }}
              >
                No
              </button>
            )}
          </div>
          <div
            style={{
              marginBottom: "1rem",
              fontWeight: 700,
            }}
          >
            Affid{" "}
            <input
              type="text"
              placeholder="1062 - For Dell"
              value={currentQuery.affid}
              style={{
                marginLeft: "1rem",
              }}
              onChange={(e) => {
                setCurrentQuery({
                  ...currentQuery,
                  affid: e.target.value,
                });
              }}
              onBlur={(e) => {
                dispatch(
                  addNewKeyValuePair({ key: "affid", value: e.target.value })
                );
              }}
            />
          </div>
          <div
            style={{
              marginBottom: "1rem",
              fontWeight: 700,
            }}
          >
            ui_locales{" "}
            <input
              type="text"
              placeholder="for eg en-us"
              value={currentQuery.ui_locales}
              style={{
                marginLeft: "1rem",
              }}
              onChange={(e) => {
                setCurrentQuery({
                  ...currentQuery,
                  ui_locales: e.target.value,
                });
              }}
              onBlur={(e) => {
                dispatch(
                  addNewKeyValuePair({
                    key: "ui_locales",
                    value: e.target.value,
                  })
                );
              }}
            />
          </div>
        </div>
        <div
          style={{
            fontWeight: 700,
            fontSize: "2rem",
            margin: "2rem 0rem",
          }}
        >
          Add Some ExtraParam
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "1rem",
            fontWeight: 700,
          }}
        >
          Enter Query Param
          <input
            type="text"
            value={currentQuery.key}
            onChange={(e) => {
              setCurrentQuery({
                ...currentQuery,
                query: e.target.value,
              });
            }}
          />
          Enter Query Param Value
          <input
            type="text"
            value={currentQuery.value}
            onChange={(e) => {
              setCurrentQuery({
                ...currentQuery,
                value: e.target.value,
              });
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            style={{
              backgroundColor: "#0065F9",
              color: "white",
              border: "none",
            }}
            onClick={GetSomething}
          >
            Adding QueryParams
          </button>
        </div>
      </div>
      <hr />
    </Fragment>
  );
};

export default Home;
