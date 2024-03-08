import { Button, Form, message } from "antd";
import React from "react";
import { antValidationerror } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import {SetLoading} from '../../redux/loadSlice';
import {UpdateUser} from '../../apis/user';
import {SetUser} from "../../redux/userSlice";



export default function UserDetails() {
  const dispatch = useDispatch();  
  const { user } = useSelector((state) => state.users);
  const onFinish = async(value) => {
    try {
        dispatch(SetLoading(true));
        const response = await UpdateUser({
          ...value,
          _id: user._id,
        });
        message.success(response.message);
        dispatch(SetUser(response.data));
        dispatch(SetLoading(false));
    } catch (error) {
        dispatch(SetLoading(false));
        message.error(error.message);
    }
  };
  return (
    <div>
      <Form
        layout="vertical"
        className="flex flex-col gap-5 w-96"
        onFinish={onFinish}
        initialValues={{
          name: user.name,
          email: user.email,
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          initialValue={""}
          rules={antValidationerror}
        >
          <input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          initialValue={""}
          rules={antValidationerror}
        >
          <input />
        </Form.Item>
        <Form.Item
          label="Old Password"
          name="OldPassword"
          initialValue={""}
          rules={antValidationerror}
        >
          <input type="password" />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="NewPassword"
          initialValue={""}
          rules={antValidationerror}
        >
          <input type="password" />
        </Form.Item>
        <div className="flex flex-col gap-5">
          <Button type="primary" htmlType="submit" block>
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
}
