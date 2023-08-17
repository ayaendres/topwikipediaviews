/** @jsxImportSource @emotion/react */
import React from "react";
import "./App.css";
import { cssWithMq } from "./styles/cssWithMq";
import { Banner } from "./components/Banner";
import { Neutral } from "./styles/brandColors";
import { SearchPage } from "./components/SearchPage";

const backgroundCss = cssWithMq({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  backgroundColor: Neutral[100],
  alignItems: "center",
  zIndex: -1,
  minHeight: "100vh",
});
function App() {
  return (
    <div css={backgroundCss} className={"font-loader"}>
      <Banner />
      <SearchPage />
    </div>
  );
}

export default App;
