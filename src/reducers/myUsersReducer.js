import { ADD_USER, DELETE_USER, FETCH_USERS, UPDATE_USER } from "../constants";

const myUsersReducer = (users, action) => {
  console.log("users>>>", users);
  console.log("action>>>", action);

  switch (action.type) {
    case FETCH_USERS:
      return action.data;
    case UPDATE_USER:
      return users.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        } else {
          return user;
        }
      });
    case ADD_USER:
      return [...users, action.data];
    case DELETE_USER:
      return users.filter((user) => user.id !== action.id);
    default:
      return users;
  }
};

export default myUsersReducer;
