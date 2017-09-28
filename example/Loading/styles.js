const bg = "white";
const fill = "#00B7C6";

export default {
  "html,body": {
    width: "100%"
  },

  hourglass: {
    display: "block",
    background: bg,
    margin: "3em auto",
    width: "2em",
    height: "4em",
    boxShadow:
      `inset ${bg} 0 0 0 0,inset ${fill} 0 2em 0 0,inset ${bg} 0 0 4em 0`,
    animation: "hourglass 1s linear infinite"
  },

  outer: {
    fill
  },

  middle: {
    fill: bg
  },

  "@keyframes hourglass": {
    "0%": {
      transform: "rotate(0deg)",
      boxShadow: `inset ${bg} 0 0 0 0,inset ${fill} 0 2em 0 0,inset ${bg} 0 4em 0 0,inset ${fill} 0 4em 0 0`
    },
    "80%": {
      transform: "rotate(0deg)",
      boxShadow: `inset ${bg} 0 2em 0 0,inset ${fill} 0 2em 0 0,inset ${bg} 0 2em 0 0,inset ${fill} 0 4em 0 0`
    },
    "100%": {
      transform: "rotate(180deg)",
      boxShadow: `inset ${bg} 0 2em 0 0,inset ${fill} 0 2em 0 0,inset ${bg} 0 2em 0 0,inset ${fill} 0 4em 0 0`
    }
  }
};
