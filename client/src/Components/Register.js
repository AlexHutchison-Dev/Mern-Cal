import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { GlobalState } from "../Contexts/GlobalState";
import styled from "styled-components";
import axios from "axios";
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
  const [, changeGlobalState] = useContext(GlobalState);
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
      axios
      .post("http://localhost:8000/user/register", credentials)
      .then((responce) => {
        console.log(responce.data);
        if (responce.data.success) {
          changeGlobalState("user", { id: responce.data.id });
          setRedirect({ redirect: "/cal" });
        }
        setError(responce.data);
        return;
      })
      .catch((err) => console.log(err));}
      else {
        return;
      }
  }

  function validateCredentials(credentials) { 
    if (credentials.username === "") {
      setError("Please Enter a username.")
      return false;
    }
    if (credentials.password === "") {
      setError("Please Enter a password.")
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
              key={1234}
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
              key={4321}
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
