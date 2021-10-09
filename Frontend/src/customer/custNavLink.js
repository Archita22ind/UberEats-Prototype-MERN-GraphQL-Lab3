import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

function CustomerNavLink({ children, to, exact, restaurantId }) {
  const match = useRouteMatch({
    exact,
    path: to,
  });
  console.log("restauarmnrdc", restaurantId);
  window.sessionStorage.setItem("restaurantId", restaurantId);

  return (
    <div className={match ? "active" : ""}>
      {match ? "> " : ""}
      <Link
        to={to}
        style={{ textDecoration: "none", color: "rgb(115,130,118)" }}
      >
        {children}
      </Link>
    </div>
  );
}

export default CustomerNavLink;
