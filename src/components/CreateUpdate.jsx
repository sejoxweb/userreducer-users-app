import React from "react";

const CreateUpdate = ({
  editUser,
  handleChange,
  isEdit,
  handleCreate,
  handleUpdate,
}) => {
  return (
    <div style={{ marginTop: "30px" }}>
      <label>name</label>
      <input id="name" value={editUser.name || ""} onChange={handleChange} />
      <br />
      <label>phone</label>
      <input id="phone" value={editUser.phone || ""} onChange={handleChange} />
      <br />
      <label>email</label>
      <input id="email" value={editUser.email || ""} onChange={handleChange} />
      <br />
      <label>company name</label>
      <input
        id="company_name"
        value={editUser?.company?.name || ""}
        onChange={handleChange}
      />
      <br />
      <button onClick={isEdit ? handleUpdate : handleCreate}>
        {isEdit ? "update" : "create"}
      </button>
    </div>
  );
};

export default CreateUpdate;
