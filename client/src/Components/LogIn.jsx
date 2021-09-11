import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import { authenticateUser, fetchEvents } from "../Helpers/httpHelper.js";
import styled from "styled-components";

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: calc(10vh + 82px);
`;
//TODO Add media quireies for mobile

const Title = styled.h1`
  margin-bottom: 20px;
  @media screen and (max-width: 992px) {
    font-size: 4rem;
  }
`;
const Field = styled.div`
  padding: 15px;
  }
`;
const Input = styled.input`
  @media screen and (max-width: 992px) {
    font-size: 2rem;
`;
const LogInBtn = styled.button`
  display: flex;
  align-self: center;
  margin: 20px;
  @media screen and (max-width: 992px;) {
    font-size: 2rem;
    color: red !important;
  }
`;

function LogIn() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [, changeUserContext] = useContext(UserContext);
  const [redirect, setRedirect] = useState({ redirect: null });
  const [error, setError] = useState(null);

  //Draw error banner with warnings about credential validation
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
      authenticateUser(credentials, (id) => {
        console.log(`id recieved by login: ${id}`);
        //TODO this needs to handle error so id not just id but message aswell
        if (id) {
          changeUserContext.logIn(id);
          fetchEvents(id, (events) => {
            changeUserContext.updateUserEvents(events, () => {
              setRedirect({ redirect: "/cal" });
            });
          });
        } else setError(`${id.message}`);
      });
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
        <Form className="log-in form">
          {error && <div className="alert alert-danger">{error}</div>}
          <Title className="title">Log In</Title>
          <form>
            <Field>
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
            </Field>
            <Field>
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
            </Field>
          </form>
          <LogInBtn
            type="button"
            className="btn btn-lg btn-primary"
            handleSubmit={handleSubmit}
          >
            Log In
          </LogInBtn>
        </Form>
      </div>
    );
  }
}
export default LogIn;
