import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import styled from "styled-components";
import { registerUser, fetchEvents } from "../Helpers/httpHelper";
import RegisterButton from "./form-inputs/RegisterButton";

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15vh;
`;
const Title = styled.h2`
  margin-bottom: 20px;
`;
const Input = styled.input`
  margin: 15px;
`;

function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [, changeUserContext] = useContext(UserContext);
  const [redirect, setRedirect] = useState({ redirect: null });
  const [error, setError] = useState(null);

  useEffect(() => {}, [error]);

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;

    setCredentials((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(`submitting`);
    if (validateCredentials(credentials)) {
      registerUser(credentials, (responce) => {
        console.log(responce);
        if (responce.id) {
          changeUserContext.logIn(responce.id);
          fetchEvents(responce.id, (events) => {
            changeUserContext.updateUserEvents(events, () => {
              setRedirect({ redirect: "/cal" });
            });
          });
        } else setError(responce);
      });
    } else {
      return;
    }
  }

  function validateCredentials(credentials) {
    if (credentials.username === "") {
      setError("Please Enter a username.");
      return false;
    }
    if (credentials.password === "") {
      setError("Please Enter a password.");
      return false;
    }
    return true;
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  }
  if (redirect.redirect) {
    return <Redirect to={redirect.redirect} />;
  } else {
    return (
      <div className="container-fluid" onKeyPress={handleKeyPress}>
        <Form className="register form">
          {error && <div className="alert alert-danger">{error}</div>}
          <Title className="title">Register</Title>
          <form>
            <Input
              name="username"
              type="text"
              onChange={handleChange}
              value={credentials.email}
              className="Email form-control"
              placeholder="email"
              autoFocus={true}
            ></Input>

            <Input
              name="password"
              type="password"
              onChange={handleChange}
              value={credentials.password}
              className="Password form-control"
              placeholder="password"
              autoComplete="off"
            ></Input>
          </form>

          <RegisterButton handleSubmit={handleSubmit}></RegisterButton>
        </Form>
      </div>
    );
  }
}

export default Register;
