import React from "react";
import "../styles/CutmLogo.css";
const Logo = () => {
  return (
    <div className="main__container1">
      <img
        src={
          "https://admission.cutm.ac.in/assets/images/cutmlogo.png"
        }
        alt="cutm footer"
        height={275}
        width={180}
        className="main__logo"
      />
    </div>
  );
};

export default Logo;
