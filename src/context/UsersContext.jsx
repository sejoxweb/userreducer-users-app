import { createContext, useContext, useReducer } from "react";
import myUsersReducer from "../reducers/myUsersReducer";

export const UsersContext = createContext("hi");

export const UsersDispatchContext = createContext(null);

export const useUsers = () => useContext(UsersContext);

export const useUsersDispatch = () => useContext(UsersDispatchContext);

export const UsersProvider = ({ children }) => {
  const [users, usersDispatch] = useReducer(myUsersReducer, []);
  return (
    <UsersContext.Provider value={users}>
      <UsersDispatchContext.Provider value={usersDispatch}>
        {children}
      </UsersDispatchContext.Provider>
    </UsersContext.Provider>
  );
};
