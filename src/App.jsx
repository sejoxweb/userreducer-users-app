import React from "react";
import Shop from "./containers/Shop";
import Users from "./containers/Users";
import { UsersProvider } from "./context/UsersContext";

const App = () => {
  return (
    <UsersProvider>
      <Users />
    </UsersProvider>
  );
  // return <Shop />;
};

export default App;
