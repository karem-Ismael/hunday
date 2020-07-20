
import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    // NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import { clearCarSearch, filtersClear } from '../../../../../store/actions'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
// import hundai from '../../../../../../../images/hundai.png';
// import SearchBar from '../searchBar/searchBar';

import './style.scss';

const NavbarPage = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const removeLocalStorge = () => {
        props.filtersClear();
        props.clearCarSearch()
    }
    const toggle = () => setIsOpen(!isOpen);
    // const clickDeleteItem = () => { alert('clicked') }
    return (
        <div>
            <Navbar color="light" light expand="md">
                <div className="container">
                    {/* <NavbarBrand><img height={40} className='logoOfNav' src={hundai} /></NavbarBrand> */}
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Link to='/' onClick={removeLocalStorge}>Cars</Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/pdfs'>Library</Link>
                            </NavItem>

                        </Nav>
                        {/* <NavbarText>Simple Text</NavbarText> */}
                        {/* <SearchBar/> */}
                    </Collapse>
                </div>
            </Navbar>
        </div>
    );
}

export default withRouter(connect(null, { clearCarSearch, filtersClear })(NavbarPage));