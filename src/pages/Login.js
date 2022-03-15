import styled from "styled-components";

export default function Login(props) {
  return (
    <LoginContainer>
      <LoginBox>
        <LoginLogo>
          <Logo />
          <Welcome>Welcome to our Bank!</Welcome>
          <Text>"We safeguard and protect your money"</Text>
        </LoginLogo>
        <LoginInputs>
          <Heading>Login</Heading>
          <LabelBox>
            <Label>Username:</Label>
          </LabelBox>
          <InputBox>
            <Input />
          </InputBox>
          <LabelBox>
            <Label>Password:</Label>
          </LabelBox>
          <InputBox>
            <Input />
          </InputBox>
          <SubmitBox>
            <Submit />
          </SubmitBox>
          <RemarksBox>
            <Remarks>Forgot your password or login details?</Remarks>
            <Remarks2>Message us!</Remarks2>
          </RemarksBox>
        </LoginInputs>
      </LoginBox>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  background-color: white;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  background-color: gainsboro;
  height: 50%;
  width: 50%;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), 0 2px 5px rgba(0, 0, 0, 0.3);
`;

const LoginLogo = styled.div`
  background-color: lightblue;
  height: 100%;
  width: 49%;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.div`
  background-image: url("../../image/logo.png");
  background-size: contain;
  background-position: center;
  width: 120px;
  height: 120px;
  background-repeat: no-repeat;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4), 0 2px 5px rgba(0, 0, 0, 0.5);
`;

const Welcome = styled.h1`
  font-size: large;
  text-align: center;
  padding-top: 10px;
`;

const Text = styled.p`
  font-size: xx-small;
  text-align: center;
`;

const LoginInputs = styled.div`
  background-color: white;
  height: 100%;
  width: 49%;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const Heading = styled.h3`
  color: black;
`;

const LabelBox = styled.div`
  padding-top: 10px;
  padding-left: 10px;
  font-size: small;
`;

const Label = styled.label`
  color: black;
`;

const InputBox = styled.div`
  color: black;
  padding-top: 5px;
  display: flex;
  justify-content: center;
`;

const Input = styled.input.attrs({
  type: "text",
})`
  color: black;
  outline: none;
  border: none;
  padding: 10px;
  width: 70%;
  height: 25px;
  background: lightblue;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SubmitBox = styled.div`
  color: black;
  padding-top: 10px;
  display: flex;
  justify-content: center;
`;

const Submit = styled.input.attrs({
  type: "submit",
  value: "SUBMIT",
})`
  color: white;
  outline: none;
  border: none;
  width: 70%;
  height: 25px;
  background: lightgreen;
  cursor: pointer;
  border-radius: 10px;
  font-size: x-small;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 5px rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: #105b72c2;
  }
`;

const RemarksBox = styled.div`
  padding-top: 5px;
  font-size: 7px;
  display: flex;
  justify-content: center;
`;

const Remarks = styled.p`
  color: gray;
`;

const Remarks2 = styled.a`
  color: skyblue;
  cursor: pointer;
  padding-left: 2px;
  &:hover {
    color: blue;
  }
`;
