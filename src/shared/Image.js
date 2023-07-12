import neutrosys from "../assets/neutrosys.png";

import React from "react";

function Image() {
  return (
    <img
      className=" px-2 w-full h-[300px] md:w-[400px] md:h-[460px] md:px-0 "
      src={neutrosys}
      alt="neutrosys"
    ></img>
  );
}

export default Image;
