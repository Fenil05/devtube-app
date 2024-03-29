import React, { useState } from "react";
import styled from "styled-components";
import newRequest from "../utils/newRequest";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import {auth,provider} from "../firebase.js"
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  const [formData,setFormData] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleLogin = async(e)=>{
    e.preventDefault()
    dispatch(loginStart())
    try {
      const res = await newRequest.post("auth/signin",formData)
      dispatch(loginSuccess(res.data))
    } catch (err) {
      dispatch(loginFailure())
    }
  }

  const signInWithGoogle = async()=>{
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        newRequest
          .post("auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            console.log(res)
            dispatch(loginSuccess(res.data));
            navigate("/")
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  }
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to LamaTube</SubTitle>
        <Input placeholder="username" name="name" onChange={handleChange} />
        <Input type="password" name="password" onChange={handleChange} placeholder="password" />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        <Title>or</Title>
        <Input placeholder="username" name="name" onChange={handleChange} />
        <Input placeholder="email" email="email" onChange={handleChange} />
        <Input type="password" name="password" onChange={handleChange} placeholder="password" />
        <Button>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
