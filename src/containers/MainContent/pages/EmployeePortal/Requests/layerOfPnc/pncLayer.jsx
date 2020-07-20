import React, { Component } from 'react';
import { Row, Col, Card, CardImg, CardBody, CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";
import '../../scss/EmployeePortalStyle.scss';
import { MDBDataTable } from 'mdbreact';
import { connect } from 'react-redux';
import { fetchPncKiaSearch, clearPartPncSearch, fetchGraidOfPncKiaSearch } from '../../../../../../store/actions';
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

class PncLayer extends Component {
    state = {
        selectPartOfCar: ['initialPNC'],
        partsArrived: false,
        detaileProduct: false,
        pncParts: [],
        modal: false,
        pncGraid:[],
        columns: [

            {
                label: 'PNC/KEY',
                field: 'pnc',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Number',
                field: 'number',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Part Name',
                field: 'name_def_lex_desc',
                sort: 'asc',
                width: 250
            },
            {
                label: 'Quantity',
                field: 'quantity',
                sort: 'asc',
                width: 50
            },
            {
                label: 'Production From',
                field: 'production_from',
                sort: 'asc',
                width: 350
            },
            {
                label: 'Production To',
                field: 'production_to',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Model Descreption',
                field: 'addition_values',
                sort: 'asc',
                width: 600
            },
        ],
    }
    componentDidMount() {
        if (this.props.kiaPnc) {
            this.getCatalogDetailes(this.props.kiaPnc)
        }
        else {
            this.props.history.push('/')
        }

    }

    // function to get input values from the user


    getCatalogDetailes = (pnc) => {
        this.props.fetchPncKiaSearch(pnc)
            .then(({ payload }) => {
                
                let catalog = [];
                payload.map(i => {

                    return catalog = [...catalog, {
                        pnc: i.pnc,
                        cat_folder: i.cat_folder,
                        catalog_code: i.catalogue_code,
                        cat_name: i.cat_name,
                        image:i.image

                    }]
                });
                
                this.setState({
                    selectPartOfCar: catalog,
                    partsArrived: true
                })
            }).catch((e) => {
                console.log(e);
            })
        this.props.clearPartPncSearch();
    }
    carSelected = (cat_folder) => {
        this.props.fetchGraidOfPncKiaSearch(this.props.kiaPnc, cat_folder)


            .then(({ payload }) => {

                let graid = [];
                payload.map(i => {

                    return graid = [...graid, {
                    
                        pnc: i.ref.length !== i.pnc.length ? i.pnc + '/' + i.ref : i.pnc,
                        number: i.number,
                        production_from: i.production_from !== 0 ? i.production_from.toString().substring(0, 4) + '/' + i.production_from.toString().substring(4, 6) + '/' + i.production_from.toString().substring(6, 8) : '',
                        production_to: i.production_to !== 0 ? i.production_to.toString().substring(0, 4) + '/' + i.production_to.toString().substring(4, 6) + '/' + i.production_to.toString().substring(6, 8) : '',
                        quantity: i.quantity,
                        name_def_lex_desc: i.name_def_lex_desc + [i.desc_lex_desc && ' , ' + i.desc_lex_desc],
                        addition_values: [i.addition_values ? [i.addition_values.map(val => { return val !== null ? `( [ + ] Model description: ${' '+val.lex_desk}   :  [${val.ucc +' '}] [${val.code+' '}]  )   ` : '' })] : ''] + [i.option_codes ? [i.option_codes.map(i => { return i !== null ? `( [ + ] Options Code:  [${i.option}]   :  [${i.lex_desk+' '}]  )` : '' })] : ''],
                    
                    }]
                });
                this.setState({
                    modal: !this.state.modal,
                    dailogTable: true,
                    pncGraid:graid
                })
            }).catch((e) => {
                console.log(e);
            })
    }
    handleClose = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    noDataForPNC = () => {
        this.props.history.push(`/`)
        Swal.fire({
            title: `There are no cars for this PNC`,
        })
    }

    render() {


        let cars = this.state.selectPartOfCar.length === 0 ? this.noDataForPNC() : this.state.selectPartOfCar.map(i => (

            <Col md='4' key={i.id}>
                <Card onClick={() => this.carSelected(i.cat_folder)}>
                    <CardImg top height="70" src={`http://axistelcom.selfip.org:8020/Hyundai/CatalogMongo/public/storage/TITLES/${i.image}`}
                        alt="Card image cap" />
                    <hr />
                    <CardBody>
                        <CardTitle className='text-center'>{i.cat_name}</CardTitle>
                    </CardBody>
                </Card>
            </Col>

        ));
        const newData = {
            columns: this.state.columns,
            rows: this.state.pncGraid
        };

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
                <div>
                    {/* <Button color="danger" onClick={this.clicked}>Click me</Button> */}
                    <Modal isOpen={this.state.modal} toggle={this.handleClose} className=''>
                        <ModalHeader toggle={this.handleClose}>Details</ModalHeader>
                        <ModalBody>

                            {this.state.dailogTable === false ? <CircleLoader
                                css={override}
                                size={60}
                                //size={"150px"} this also works
                                color={"#002000"}
                            /> : <MDBDataTable
                                    responsive
                                    striped
                                    bordered
                                    paging={false}
                                    hover
                                    scrollY
                                    scrollX
                                    // maxHeight="80vh"
                                    data={newData}
                                    pagesAmount={1000}
                                    entries={50}
                                />}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        kiaPnc: state.KiaCatalog.kiaPnc
    }
}
export default withRouter(connect(mapStateToProps, { fetchPncKiaSearch, clearPartPncSearch, fetchGraidOfPncKiaSearch })(PncLayer));