import React from "react";

import { useDocumentTitle } from "../hooks/useDocumentTitle";

const AboutPage = () => {
  useDocumentTitle("About Me");
  return (
    <>
      <h1>About</h1>
    </>
  );
};

export default AboutPage;