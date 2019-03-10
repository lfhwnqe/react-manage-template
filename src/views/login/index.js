import React from 'react';
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';
import './style.scss';
import { connect } from 'react-redux';
import { addTodo, setLoginStatus } from '../../store/action';
import { login } from '../../api/login';
import { Redirect } from "react-router-dom";

class NormalLoginForm extends React.Component {

  handleSubmit = async (e) => {
    try {
      e.preventDefault();
      this.props.form.validateFields(async (err, values) => {
        try {
          if (!err) {
            const params = `account=${values.account}&password=${values.password}`;
            const result = await login(params);
            if (result) {
              window.$store.dispatch(setLoginStatus(true));
            }
          }
        } catch (err) {
          console.log('err:', err);
        }
      });

    } catch (err) {
      console.log('err:', err);
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    if (!this.props.loginStatus) {
      return (
        <Form onSubmit={ this.handleSubmit } className="login-form">
          <Form.Item>
            { getFieldDecorator('account', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={ <Icon type="account" style={ { color: 'rgba(0,0,0,.25)' } }/> } placeholder="account"/>
            ) }
          </Form.Item>
          <Form.Item>
            { getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={ <Icon type="lock" style={ { color: 'rgba(0,0,0,.25)' } }/> } type="password"
                placeholder="Password"/>
            ) }
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      );
    } else {
      return (<Redirect to="/"/>);
    }

  }
}

const mapStateToProps = state => {
  return {
    loginStatus: state.authFilter.loginStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick() {
      dispatch(addTodo(this.props));
    }
  };
};

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: 'normal_login' })(NormalLoginForm));

export default Login;
