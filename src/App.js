import React, { Component, Suspense } from 'react';
import { withRouter, Route, Switch, HashRouter as Router } from 'react-router-dom';
import Layout from './components/Layout/';
import routes from './routes';
import './custom.css';
import './App.scss';


// Get all Auth methods
//import { isUserAuthenticated } from './helpers/authUtils';
import  Loader  from './containers/MainContent/pages/EmployeePortal/loader/loader';

function withLayout(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    render() {
      return <Layout>
        <WrappedComponent></WrappedComponent>
      </Layout>
    }
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
componentDidMount(){
  // localStorage.clear();
}
  render() {

    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Suspense fallback={<Loader />}>
              {routes.map((route, idx) =>
                  <Route exact path={route.path} component={withLayout(route.component)} key={idx} />
              )}
            </Suspense>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}


export default withRouter(App);


