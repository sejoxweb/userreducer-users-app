import { Button, List, Modal } from "antd";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import AddEditUser from "../components/AddEditUser";
import { API_URL, DELETE_USER, FETCH_USERS } from "../constants";
import MyTable from "../components/MyTable";
import myUsersReducer from "../reducers/myUsersReducer";

const Users = () => {
  //const [users, setUsers] = useState([]);
  const [users, usersDispatch] = useReducer(myUsersReducer, []);
  const [selectedUser, setSelectedUser] = useState({});
  const [editUser, setEditUser] = useState({});
  const [open, setOpen] = useState(false);

  console.log("inside component users>>>", users);

  //const setUsers = () => {}; temp
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      //setUsers(response.data);
      usersDispatch({ type: FETCH_USERS, data: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/users/${id}`);
      //setUsers((users) => users.filter((user) => user.id !== id));
      usersDispatch({ type: DELETE_USER, id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <List
        header={
          <div className="text-2xl">
            Users <Button onClick={() => setOpen(true)}>Add User</Button>
          </div>
        }
        dataSource={users}
        renderItem={(user) => (
          <List.Item onClick={() => setSelectedUser(user)}>
            {user.name}{" "}
            <DeleteFilled
              style={{ color: "darkred" }}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(user.id);
              }}
            />
            <EditFilled
              onClick={(e) => {
                e.stopPropagation();
                setEditUser(user);
                setOpen(true);
              }}
            />
          </List.Item>
        )}
      />

      <Modal
        open={selectedUser.name}
        onCancel={() => setSelectedUser({})}
        footer={null}
      >
        {/* <div>{selectedUser.name}</div> */}
        <MyTable data={selectedUser} />
      </Modal>
      <Modal
        destroyOnClose
        open={open}
        footer={null}
        onCancel={() => {
          setOpen(false);
          setEditUser({});
        }}
      >
        <AddEditUser
          editUser={editUser}
          // setUsers={setUsers}
          usersDispatch={usersDispatch}
          setEditUser={setEditUser}
          setOpen={setOpen}
        />
      </Modal>
    </div>
  );
};

export default Users;
