import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID as string,
      userPoolClientId: process.env
        .NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID as string,
    },
  },
});

const formFields = {
  signUp: {
    username: {
      order: 1,
      placeholder: "Username",
      label: "Username",
      inputProps: {
        required: true,
      },
    },
    email: {
      order: 2,
      placeholder: "Email",
      label: "Email",
      inputProps: {
        type: "email",
        required: true,
      },
    },
    password: {
      order: 3,
      placeholder: "Password",
      label: "Password",
      inputProps: {
        type: "password",
        required: true,
      },
    },
    confirm_password: {
      order: 3,
      placeholder: "Confirm Password",
      label: "Confirm Password",
      inputProps: {
        type: "password",
        required: true,
      },
    },
  },
};

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <div>
      <Authenticator formFields={formFields}>
        {({ user }) =>
          user ? (
            <div>{children}</div>
          ) : (
            <div>
              <h1>Please sign in below:</h1>
            </div>
          )
        }
      </Authenticator>
    </div>
  );
};

export default AuthProvider;
