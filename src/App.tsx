import React from 'react';
import styled from '@emotion/styled';
import { Grid } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login } from './component/Login/Login';
import { UserList } from './component/UserList/UserList';
import { UserPage } from './component/UserPage/UserPage';
import { CookiesProvider } from 'react-cookie';
import { Redirect } from 'react-router-dom'

export const StyledContainer = styled(Grid)`
  background-color: #a5d3e0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

class ProtectedRoute extends React.Component<{component: any, exact:boolean, path: string}> {

  render() {
      const Component = this.props.component;
      const isAuthenticated = localStorage.getItem('token');
     
      return isAuthenticated ? (
         <Route path={this.props.path} exact component={Component} />
      ) : (
          <Redirect to={{ pathname: '/login' }} />
      );
  }
}

const App: React.FC = () => {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <ProtectedRoute path="/users" exact component={UserList} />
          <ProtectedRoute path="/users/:id" exact component={UserPage} />
          <Route path="/" render={() => <StyledContainer> 404 Page Not Found </StyledContainer>} />
        </Switch>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
