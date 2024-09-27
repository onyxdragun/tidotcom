import React from "react";

import {useDocumentTitle} from '../hooks/useDocumentTitle.js';

const PricingPage = () => {
  useDocumentTitle('Pricing');
  return (
    <>
      <h2>Pricing</h2>
    </>
  );
};

export default PricingPage;