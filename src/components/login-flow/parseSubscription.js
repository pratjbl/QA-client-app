import React, { useState } from "react";
import { Button } from "reactstrap";
import axios from 'axios';
import { getConfig } from "../../config";
const config = getConfig();

export default function ParseSubscription(props) {
  const { Subscription } = props;
  const [ finalTextbox,setFinalTextBox]= useState("")
  const [ anchor,setAnchor]= useState("#")
  const [selectedValue, setSelectedValue] = useState(
    Object.keys(Subscription)[0]
  );
  const onChange = (e) => {
    setSelectedValue(e.target.value);
  };
  const obj = localStorage.getItem(`@@auth0spajs@@::${config.clientId}::https://api.mcafee.com::openid profile email offline_access`);
  const jObj = JSON.parse(obj);
  const ref_token = jObj?.body?.refresh_token;

  const getToken = async (e) => {
    e.preventDefault();
    const optionsLogin = {
      "content-type": "application/x-www-form-urlencoded",
    };
    const jsonBody = {
      client_id: config.clientId,
      grant_type: "refresh_token",
      refresh_token: ref_token,
      subrefid: Subscription[selectedValue]
    };
    const data = new URLSearchParams(jsonBody).toString();
    try {
      const token = await axios.post(`https://${config.domain}/oauth/token`, data,
        {
          headers: optionsLogin,
        }
      );
      console.log(token.data.access_token);
      setFinalTextBox(token.data.access_token);
      setAnchor(`https://jwt.io/#access_token=${token.data.access_token}`);
    } catch (err) {
      console.log(err)
    }
  };

  console.log("-----> value", Subscription[selectedValue]);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <select value={selectedValue} onChange={onChange}>
        {Subscription
          ? Object.keys(Subscription).map(function (key, index) {
              return (
                <option value={key} key={`${index}111`}>
                  {key}
                </option>
              );
            })
          : null}
      </select>
      <Button color="primary" className="mt-5" onClick={(e) => getToken(e)}>
        Refresh token call
      </Button>
      
      {finalTextbox && <input style={{marginTop:"2rem"}} type="text" value={finalTextbox}/>}
      {finalTextbox && <a href={anchor} target="_blank" style ={{
        borderBottom: "3px solid #ff8cbc",
        fontSize: "3em",
        transition: "all 0.25s linear",
        position: "relative"
      }}>Check the access token on jwt</a>}
    </div>
  );
}
