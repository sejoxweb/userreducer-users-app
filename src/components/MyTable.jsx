import { Table } from "antd";

const MyTable = ({ data }) => {
  //   const dataSource = [
  //     {
  //       key: "1",
  //       name: "Mike",
  //       age: 32,
  //       address: "10 Downing Street",
  //     },
  //     {
  //       key: "2",
  //       name: "John",
  //       age: 42,
  //       address: "10 Downing Street",
  //     },
  //   ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
  ];

  return (
    <Table
      dataSource={[data]}
      columns={columns}
      rowKey="id"
      pagination={false}
    />
  );
};

export default MyTable;
