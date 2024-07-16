import { createContext } from "react";

export const BackgroundColorContext = createContext({
  color: "",
  setColor: (newcolor: string) => {
    console.log("color in conte", newcolor);
    document.body.className = newcolor;
  },
});
