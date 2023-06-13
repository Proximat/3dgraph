import React from "react";
import ReactDOM from "react-dom";

const GithubSVG = (props) => {
  const { backFill, className, mainFill } = props;
  return (
    <svg
      className={className}
      style={{ background: "red" }}
      height='512'
      id='Layer_1'
      version='1.1'
      viewBox='0 0 512 512'
      width='512'
    >
      <defs id='defs' />
      <g id='g'>
        <rect
          height='512'
          id='rect'
          style={{
            fill: backFill,
            fillOpacity: 1,
            fillRule: "nonzero",
            stroke: "none",
          }}
          width='512'
          x='0'
          y='0'
        />
        <path
          d='a bunch of random numbers'
          id='svg'
          style={{ fill: mainFill }}
        />
      </g>
    </svg>
  );
};

export default GithubSVG;
