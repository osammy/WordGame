import React, { useState } from "react";
import {Header} from './HomeComponents';
import "./home.css";

const Home = () => {

  const [rowsOfWordsToFill, setRowsOfWordsToFill] = useState(10);

  return (
    <div className="container">
      <Header />

    </div>
  );
};

export default Home;
