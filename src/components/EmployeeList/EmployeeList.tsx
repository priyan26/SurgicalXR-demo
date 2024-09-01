import { Table, Dropdown, Button } from "antd";

import {
  useGetAllEmployeesQuery,
  useDeleteIssueMutation,
} from "../../slices/apislice";
import { useEffect } from "react";

const EmployeeList = (props:any) => {
  const { setEditData, changeIsVisible, editData, isVisible } = props;

  const { data: issueData, isLoading, refetch } = useGetAllEmployeesQuery('');
  const [deleteIssue] = useDeleteIssueMutation();

  const onActionClick = (data:any) => {
    setEditData(data);
  };

  const onEditClick = () => {
    setEditData(null);
    changeIsVisible(true);
  };

  const onDeleteClick = async () => {
    setEditData(null);
    await deleteIssue({ id: editData?._id });
    refetch();
  };

  useEffect(() => {
    if (!isVisible) {
      refetch();
    }
  }, [isVisible, refetch]);

  const items = [
    {
      key: "1",
      label: <div onClick={() => onEditClick()}>Edit</div>,
    },
    {
      key: "2",
      label: <div onClick={() => onDeleteClick()}>Delete</div>,
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (row:any, data:any) => {
        return (
          <Dropdown
            menu={{ items }}
            placement="bottom"
            onOpenChange={() => onActionClick(data)}
            arrow
          >
            <Button
              onClick={() => onActionClick(data)}
              onTouchStart={() => onActionClick(data)}
            >
              Actions
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  if (isLoading) {
    return <div>Loading......</div>;
  } else {
    return <Table columns={columns} dataSource={issueData?.data ?? []} />;
  }
};

export default EmployeeList;
