import { Button, Form, Input } from "antd";
import axios from "axios";
import { API_URL } from "../constants";

const AddEditUser = ({ editUser, setEditUser, setUsers, setOpen }) => {
  const onFinish = async (values) => {
    try {
      const payload = {
        ...editUser,
        ...values,
      };
      if (editUser.id) {
        await axios.put(`${API_URL}/users/${editUser.id}`, payload);
        setUsers((users) =>
          users.map((user) => {
            if (user.id === payload.id) {
              return payload;
            } else {
              return user;
            }
          })
        );
      } else {
        const response = await axios.post(`${API_URL}/users`, payload);
        setUsers((users) => [...users, response.data]);
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
