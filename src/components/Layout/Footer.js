import React, { Component } from 'react';
import './style.scss';
class Footer extends Component {

    render() {
        return (
            <React.Fragment>
                <footer className="footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                © {new Date().getFullYear()} HYUNDAI  <span className="d-none d-sm-inline-block">   CATALOGUE.</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </React.Fragment>
        );
    }
}

export default Footer;






