import React, { useEffect } from "react";

const HomepageLayout = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div>{children}</div>;
};

export default HomepageLayout;
