/** @jsxImportSource @emotion/react */
import React from 'react';
import './App.css';
import {cssWithMq} from "./styles/cssWithMq";
import {Banner} from "./components/Banner";
import {Neutral} from "./styles/brandColors";
import {SearchPage} from "./components/SearchPage";

const backgroundCss = cssWithMq({
  backgroundColor: Neutral[100],
  zIndex: -1,
  minHeight: "100vh",
});
function App() {
  return (
      <div css={backgroundCss}>
        <Banner />
        <div>
          <SearchPage />
        </div>
      </div>
  );
}

export default App;