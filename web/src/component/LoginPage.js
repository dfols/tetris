import * as React from "react";
import style from "./LoginPage.module.scss";
import * as bootstrap from "bootstrap";
import API from "../api";
import {useNavigate} from 'react-router-dom';

class LoginPageClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      displayName: "",
      toastTitle: "Test Title",
      toastMessage: "Test Message",
      createNewAccount: false,
      valid: false,
    };

    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }


  handleUserNameChange(event) {
    this.setState({ userName: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  handleNameChange(event) {
    this.setState({ displayName: event.target.value });
  }

  handleCreateAccount(event) {
    event.preventDefault();
    this.setState({ createNewAccount: true });
  }

  makeSomeToast(title, message) {
    this.setState({ toastTitle: title });
    this.setState({ toastMessage: message });

    let myAlert = document.querySelector(".toast");
    let bsAlert = new bootstrap.Toast(myAlert);
    bsAlert.show();
  }

  async loginUser() {
    let user = null;

    try {
      user = await API.getUserByName(this.state.userName);
      this.props.onUserNameChanged?.(user.userName);
      this.props.navigate("/");
    }

    catch(err) {
      this.makeSomeToast("Login Error", "Incorrect username or password");
    }
  }

  filled() {
    if (this.state.userName.length > 3 && this.state.password.length > 3) {
      return true;
    }
    return false;
  }

  async handleOnSubmit(event) {
    event.preventDefault();

    if(!this.filled()) {
      this.makeSomeToast("Error Logging In", "Please check your username and password.");
    }

    if (this.state.createNewAccount) {
      if(await this.createUserAccount()) {
        await this.loginUser();
      }
    }
    else {
      await this.loginUser();
    }
  };

  async createUserAccount() {
    try {
      if(await API.checkUserExists(this.state.userName)) {
        this.makeSomeToast("Error Creating Account", "User already exists");
        return false;
      }
    
      await API.createUser(this.state.userName, this.state.displayName);
      this.makeSomeToast("Login", "Account has been successfully created.");
      return true;
    }

    catch(err) {
      this.makeSomeToast("Error Creating Account", "Unknown error");
    }

    return false;
  }

  render() {
    return (
      <>
        <div className={style.toaster}>
          <div
            aria-live="polite"
            aria-atomic="true"
            className="d-flex justify-content-center align-items-center translate-center"
          >
            <div
              className="toast"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="toast-header">
                <strong className="me-auto">{this.state.toastTitle}</strong>
                <small></small>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                ></button>
              </div>
              <div className="toast-body">{this.state.toastMessage}</div>
            </div>
          </div>
        </div>
        
          <div className={style.Container}>
            <h1>{this.state.createNewAccount ? "Please Register Below" : "Please Login"}</h1>
            <div className={style.LoginForm}>
              <form onSubmit={this.handleOnSubmit}>
                {this.state.createNewAccount && (
                  <>
                    <h2>Display Name</h2>
                    <input
                      id="nameField"
                      name="nameField"
                      type="text"
                      placeholder="display name"
                      onChange={this.handleNameChange}
                      autocomplete="off"
                    />
                  </>
                )}
                <h2>Username</h2>
                <input
                  id="userNameField"
                  name="userNameField"
                  type="text"
                  placeholder="username"
                  onChange={this.handleUserNameChange}
                  autocomplete="off"
                />
                <h2>Password</h2>
                <input
                  id="passwordField"
                  name="passwordField"
                  type="password"
                  placeholder="password"
                  onChange={this.handlePasswordChange}
                  autocomplete="off"
                />
                <button type="submit">{this.state.createNewAccount ? "Register" : "Login"}</button>
              </form>
            </div>
            {this.state.createNewAccount || (
              <div className={style.createAcctContainer}>
                <h6>Don't have an account?</h6>
                <button type="submit" onClick={this.handleCreateAccount}>
                  Sign Up
                </button>
              </div>
            )}
          </div>
      </>
    );
  }
}

export default function LoginPage(props) {
  const navigation = useNavigate();
  return <LoginPageClass {...props} navigate={navigation} />;
}
