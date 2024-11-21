import React from "react";
import Button from "../Button/Button";
import "./Information.css";

const Information = ({ olduser, setOlduser }) => {
  const handleToggle = () => {
    setOlduser((prevState) => !prevState);
  };
  return (
    <div className="information-box">
      <div className="information-heading">
        <h2>INFORMATION</h2>
      </div>
      <div className="information-paragraph">
        <div className="information-paragraph1">
          <p className="para1">
            Lorem ipsum dolor sit amet,consecteur adipiscing elit,sed do eismod
            tempor incididunt ut labore et dalore magna aliqua
          </p>
        </div>
        <div className="information-paragraph2">
          <p className="para2">
            A diam sollicitudin tempor id eu nisl nunc.Ac tincidunt vitae semper
            quis lectus nulla at volutpat
          </p>
        </div>
      </div>
      <div className="information-button">
        <Button
          type="button"
          className="information-button"
          value={olduser ? "Don't Have an Account" : "Have An Account"}
          onClick={handleToggle}
        ></Button>
      </div>
    </div>
  );
};

export default Information;
