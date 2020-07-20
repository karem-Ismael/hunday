import React, { Component } from 'react';
import PdfView from './pdfView/pdfView';
import PdfFiles from './pdfFiles/pdfFiles';
import { Row, Col } from 'reactstrap';
import NavbarPage from '../navbar/nav';
import SearchBar from '../searchBar/searchBar';
// import '../scss/EmployeePortalStyle.scss';



class PdfContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <NavbarPage/><br/>
                <SearchBar/><br/>
                <Row>
                    <Col md='3'><PdfFiles/></Col>
                    <Col md='9'><PdfView /></Col>
                </Row>
            </div>
        );
    }
}

export default PdfContainer;