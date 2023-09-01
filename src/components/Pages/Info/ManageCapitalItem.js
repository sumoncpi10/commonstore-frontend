
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
const EditableContext = React.createContext(null);
import { Typography } from 'antd';
const { Title } = Typography;
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      //console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const ManageCapitalItem = ({ capitalItem }) => {
  //console.log(capitalItem);

  const [distinctSubCategories, setDistinctSubCategories] = useState([]);
  const [distinctCategories, setDistinctCategories] = useState([]);
  const [distinctZonals, setdistinctZonals] = useState([]);

  useEffect(() => {
    const subCategoryNames = Array.from(new Set(capitalItem.map(item => item?.subCategory?.subCategoryName)));
    setDistinctSubCategories(subCategoryNames);
    const CategoryNames = Array.from(new Set(capitalItem.map(item => item?.category?.categoryName)));
    setDistinctCategories(CategoryNames);
    const zonalNames = Array.from(new Set(capitalItem.map(item => item?.zonals?.zonalName)));
    setdistinctZonals(zonalNames);
  }, [capitalItem]);
  //   //console.log(distinctCategories);
  const [dataSource, setDataSource] = useState(capitalItem);
  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.id !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: 'Description',
      dataIndex: 'description',
      // width: '20%',
      editable: true,
    },
    {
      title: 'Serial',
      dataIndex: 'serialNo',
    },
    {
      title: 'Brand',
      dataIndex: ['brand', 'brandName'],
    },

    {
      title: 'Model',
      dataIndex: ['model', 'modelName'],
    },
    {
      title: 'Warranty',
      dataIndex: 'warranty',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },

    {
      title: 'Category',
      dataIndex: ['category', 'categoryName'],
      filters: distinctCategories.map(sc => ({
        text: sc,
        value: sc,
      })),
      onFilter: (value, record) => record.category.categoryName.indexOf(value) === 0,
    },
    {
      title: 'Sub Category',
      dataIndex: ['subCategory', 'subCategoryName'],
      filters: distinctSubCategories.map(sc => ({
        text: sc,
        value: sc,
      })),
      onFilter: (value, record) => record?.subCategory?.subCategoryName?.indexOf(value) === 0,
    },
    {
      title: 'Zonal',
      dataIndex: ['zonals', 'zonalName'],
      filters: distinctZonals.map(sc => ({
        text: sc,
        value: sc,
      })),
      onFilter: (value, record) => record.zonals.zonalName.indexOf(value) === 0,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record?.id)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    //console.log('params', pagination, filters, sorter, extra);
  };
  const handleAdd = () => {
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: '32',
      address: `London, Park Lane no. ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div>
      {/* <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button> */}
      <Title level={2}>Manage Capital Item</Title>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
        onChange={onChange}
      />
    </div>
  );
};
export default ManageCapitalItem;