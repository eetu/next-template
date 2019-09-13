import React from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';

import { login, RootState, User } from '../../store';

const StyledLogin = styled.div``;

const StyledLink = styled.a`
  && {
    text-decoration: underline;
    cursor: pointer;
  }
`;

interface LoginProps {
  user?: User;
  loginInProgress: boolean;
  login: typeof login;
}

const Login: React.FunctionComponent<LoginProps> = (props: LoginProps) => {
  const { user, loginInProgress, login } = props;
  return (
    <StyledLogin>
      {!user && !loginInProgress && (
        <StyledLink
          onClick={(): void => {
            login(/* 'username', 'password' */);
          }}
        >
          login
        </StyledLink>
      )}
      {loginInProgress && <div>...</div>}
      {user && <div>Hello {`${user.firstName} ${user.lastName}!`}</div>}
    </StyledLogin>
  );
};

type LoginStateToProps = Pick<LoginProps, 'user' | 'loginInProgress'>;
type LoginDispatchToProps = Pick<LoginProps, 'login'>;

const mapStateToProps = (state: RootState): LoginStateToProps => ({
  user: state.user,
  loginInProgress: state.loginInProgress,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): LoginDispatchToProps => ({
  login: bindActionCreators(login, dispatch),
});

export default connect<LoginStateToProps, LoginDispatchToProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
