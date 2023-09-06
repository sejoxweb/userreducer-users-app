import { Button, Form, Input } from "antd";
import axios from "axios";
import { ADD_USER, API_URL, UPDATE_USER } from "../constants";
import { UsersContext, UsersDispatchContext } from "../context/UsersContext";
import { useContext } from "react";

const AddEditUser = ({
  editUser,
  setEditUser,
  //setUsers,
  //usersDispatch,
  setOpen,
}) => {
  const users = useContext(UsersContext);

  const usersDispatch = useContext(UsersDispatchContext);

  console.log("users>>>", users);
  console.log("usersDispatch>>>", usersDispatch);

  const onFinish = async (values) => {
    try {
      const payload = {
        ...editUser,
        ...values,
      };
      if (editUser.id) {
        await axios.put(`${API_URL}/users/${editUser.id}`, payload);
        // setUsers((users) =>
        //   users.map((user) => {
        //     if (user.id === payload.id) {
        //       return payload;
        //     } else {
        //       return user;
        //     }
        //   })
        // );
        usersDispatch({ type: UPDATE_USER, payload });
      } else {
        const response = await axios.post(`${API_URL}/users`, payload);
        // setUsers((users) => [...users, response.data]);
        usersDispatch({ type: ADD_USER, data: response.data });
      }

      setEditUser({});
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={editUser}
      autoComplete="off"
    >
      <Form.Item label="Username" name="name">
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {editUser.id ? "Update" : "Create"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddEditUser;
