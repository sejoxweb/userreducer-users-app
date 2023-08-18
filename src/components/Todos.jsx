import React, { useEffect, useState } from "react";
import UserDetails from "./UserDetails";
import CreateUpdate from "./CreateUpdate";
//import Modal from "./Modal";
import { Button, List, Modal, Typography } from "antd";

const Todos = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [editUser, setEditUser] = useState({});
  const [isEdit, setEdit] = useState(false);
  const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3004/users")
      .then((response) => response.json())
      .then((json) => setUsers(json));
    // const json = {
    //   users:["user1"]
    // }
    // setUsers(json.users)
  }, []);

  const handleDelete = (e, id) => {
    fetch(`http://localhost:3004/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        let tempUsers = [...users];
        tempUsers = tempUsers.filter((user) => user.id !== id);
        setUsers(tempUsers);
        if (selectedUser.id === id) {
          setSelectedUser({});
        }
        if (editUser.id === id) {
          setEditUser({});
        }
      });
  };

  const handleUpdate = () => {
    fetch(`http://localhost:3004/users/${editUser.id}`, {
      method: "PUT",
      body: JSON.stringify(editUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then(() => {
        setIsModalTwoOpen(false);
        let tempUsers = [...users];
        tempUsers = tempUsers.map((u) => {
          if (u.id === editUser.id) {
            return editUser;
          } else {
            return u;
          }
        });
        setUsers(tempUsers);
        if (editUser.id === selectedUser.id) {
          setSelectedUser(editUser);
        }
        setEditUser({});
      });
  };

  const handleEdit = (user) => {
    setIsModalTwoOpen(true);
    setEditUser(user);
    setEdit(true);
  };

  const handleChange = (e) => {
    if (e.target.id.includes("company")) {
      const key = e.target.id.split("_")[1]; // ['company', 'name']
      setEditUser((prevState) => ({
        ...prevState,
        company: { ...prevState.company, [key]: e.target.value },
      }));
    } else {
      setEditUser({ ...editUser, [e.target.id]: e.target.value });
    }
  };

  const handleCreate = async () => {
    const response = await fetch("http://localhost:3004/users", {
      method: "POST",
      body: JSON.stringify(editUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const newUser = await response.json();
    setIsModalTwoOpen(false);
    setUsers((prevUsers) => [...prevUsers, newUser]); //setUser([...users, newUser])
    setEditUser({});
  };

  const data = [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
  ];

  return (
    <div>
      <List
        header={
          <div>
            Users{" "}
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setIsModalTwoOpen(true);
                setEdit(false);
                setEditUser({});
              }}
            >
              Add User
            </Button>
          </div>
        }
        bordered
        dataSource={users}
        renderItem={(user) => (
          <List.Item>
            <span onClick={() => setSelectedUser(user)}>{user.name}</span>
            <button onClick={(e) => handleDelete(e, user.id)}>delete</button>
            <button onClick={() => handleEdit(user)}>edit</button>
          </List.Item>
        )}
      />
      {/* open={isModalOpen} onOk={handleOk} onCancel={handleCancel} */}

      <Modal
        footer={null}
        open={selectedUser.name}
        onCancel={() => setSelectedUser({})}
      >
        <UserDetails user={selectedUser} />
      </Modal>
      <Modal open={isModalTwoOpen} onCancel={() => setIsModalTwoOpen(false)}>
        <CreateUpdate
          editUser={editUser}
          handleChange={handleChange}
          isEdit={isEdit}
          handleCreate={handleCreate}
          handleUpdate={handleUpdate}
        />
      </Modal>
    </div>
  );
};

export default Todos;
