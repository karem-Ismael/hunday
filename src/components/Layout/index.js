import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Footer from './Footer';

// render if Auth Layout
const AuthLayoutContent = (props) => {
  document.body.classList.remove('bg-primary');
  return <React.Fragment>
    <div id="wrapper">

      <div className="content-page">
        {props.children}
        <Footer />
      </div>
    </div>
  </React.Fragment>
}



class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

    window.scrollTo(0, 0);
    // If Auth the putted class to body
    if (this.props.layoutType !== 'Auth') {
      document.body.classList.add('bg-primary');
    }

  }

  render() {
    return (
      <React.Fragment>
        <AuthLayoutContent {...this.props} />
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  return {
    layout: state.Layout
  };
}

export default withRouter(connect(mapStatetoProps)(Layout));
