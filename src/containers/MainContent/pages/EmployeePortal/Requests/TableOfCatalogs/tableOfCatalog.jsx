import React, { Component } from 'react';
import { Row, Col, Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";
import '../../scss/EmployeePortalStyle.scss';
import { connect } from 'react-redux';
import { partPncSearch, clearPartPncSearch } from '../../../../../../store/actions';
import './style.scss';
import { css } from "@emotion/core";
import { withRouter } from 'react-router-dom';
import { CircleLoader } from "react-spinners";
import NavbarPage from '../../navbar/nav';
import SearchBar from '../../searchBar/searchBar';
import Swal from 'sweetalert2';



const override = css`
  display: block;
  margin: 20px auto;
  border-color: red;
`;

class TableOfCatalog extends Component {
    state = {
        selectPartOfCar: ['intialData'],
        partsArrived: false,
        detaileProduct: false,
        modal: false,
    }
    componentDidMount() {
        if (this.props.pncSearch || this.props.partSearch) {
            this.getCatalogDetailes(this.props.partSearch, this.props.pncSearch)
        }
        else {
            this.props.history.push('/')
        }

    }

    getCatalogDetailes = (v1, v2) => {
        this.props.partPncSearch(v1, v2)
            .then(({ payload }) => {
                let catalog = [];
                payload.map(i => {
                    return catalog = [...catalog, {
                        pnc: i.pnc,
                        cat_folder: i.cat_folder,
                        minor_sect: i.minor_sect,
                        catalog_code: i.catalogue_code,
                        cat_name: i.cat_name,
                        minor_lex_desc: i.minor_lex_desc,
                        image: i.image,

                    }]
                });
                v1 = null;
                this.setState({
                    selectPartOfCar: catalog,
                    partsArrived: true
                })
            }).catch((e) => {
                console.log(e);
            })
        this.props.clearPartPncSearch();
    }
    carSelected = (pnc, cat_folder, minor_sect, catalog_code, minor_lex_desc, cat_name) => {
        localStorage.setItem('PNC', pnc);
        localStorage.setItem('catFolder', cat_folder);
        localStorage.setItem('minorSect', minor_sect);
        localStorage.setItem('catCode', catalog_code);
        localStorage.setItem('minorLexDesc', minor_lex_desc);

        this.props.history.push(`/part-pnc/details/${cat_name}`)
    }
    noDataForPartNumber = () => {
        this.props.history.push(`/`)
        Swal.fire({
            title: `There are no cars for this part number`,
        })
    }

    render() {
        let cars = this.state.selectPartOfCar.length === 0 ? this.noDataForPartNumber() : this.state.selectPartOfCar.map(i => (
            <Col md='4' key={i.id}>
                <Card onClick={() => this.carSelected(i.pnc, i.cat_folder, i.minor_sect, i.catalog_code, i.minor_lex_desc, i.cat_name)}>
                    <CardImg top height="70" src={`http://axistelcom.selfip.org:8020/Hyundai/CatalogMongo/public/storage/TITLES/${i.image}`}
                        alt="Card image cap" />
                    <hr />
                    <CardBody>
                        <CardTitle className='text-center'>{i.cat_name}</CardTitle>
                    </CardBody>
                </Card>
            </Col>

        ));

        return (
            <div>
                <NavbarPage />
                <Row>

                    <Col className='products' md='12'>
                        <SearchBar />
                        <hr />
                        <div className="container">
                            <Row>

                                {this.state.partsArrived === false ? <CircleLoader
                                    css={override}
                                    size={60}
                                    color={"#002000"}
                                /> : cars}
                            </Row>
                        </div>
                        {/* <ModalTable /> */}
                    </Col>
                </Row>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pncSearch: state.KiaCatalog.pncSearch,
        partSearch: state.KiaCatalog.partSearch
    }
}
export default withRouter(connect(mapStateToProps, { partPncSearch, clearPartPncSearch })(TableOfCatalog));