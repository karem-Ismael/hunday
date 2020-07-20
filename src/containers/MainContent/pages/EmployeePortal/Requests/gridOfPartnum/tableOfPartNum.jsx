import React, { Component } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";
import { MDBDataTable } from 'mdbreact';
import '../../scss/EmployeePortalStyle.scss';
import { connect } from 'react-redux';
import { partNumberMapper, tableOfpartNums } from '../../../../../../store/actions';
import './style.scss';
import { css } from "@emotion/core";
import ImageMapper from 'react-image-mapper';
import { CircleLoader } from "react-spinners";
import NavbarPage from '../../navbar/nav';
import SearchBar from '../../searchBar/searchBar';
import { withRouter } from 'react-router-dom';

const override = css`
  display: block;
  margin: 20px auto;
  border-color: red;
`;
let MAP = {
    name: "my-map",
    areas: []
};

class TableOfPartNumbers extends Component {
    state = {
        selectPartOfCar: [],
        partsOfCatlog: [],
        partsArrived: false,
        modal: false,
        positions: [],
        dailogTable: false,
        hoveredArea: null, msg: null, moveMsg: null,
        rowTable: [

        ],
        data: [
            { 'one': 1, 'two': 2 },
            { 'yes': 'yes', 'no': 'no' }
        ],
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
        this.getCarParts();
    }


    getCarParts = () => {
        this.props.partNumberMapper()
            .then(({ payload, newPayload, picture, title }) => {
                let partOfCar = [];
                let areas = [];
                let dataForPicture = [];
                payload.map(i => {
                   return partOfCar = [...partOfCar, {
                    pnc: i.ref.length !== i.pnc.length ? i.pnc + '/' + i.ref : i.pnc,
                    number: i.number,
                        production_from: i.production_from !== 0 ? i.production_from.toString().substring(0, 4) + '/' + i.production_from.toString().substring(4, 6) + '/' + i.production_from.toString().substring(6, 8) : '',
                        production_to: i.production_to !== 0 ? i.production_to.toString().substring(0, 4) + '/' + i.production_to.toString().substring(4, 6) + '/' + i.production_to.toString().substring(6, 8) : '',
                        name_def_lex_desc: i.name_def_lex_desc + [i.desc_lex_desc && ' , ' + i.desc_lex_desc],
                        major_description: i.major_description,
                        minor_description: i.minor_description,
                        addition_values: [i.addition_values ? [i.addition_values.map(val => { return val !== null ? `( [ + ] Model description: ${' '+val.lex_desk}   :  [${val.ucc +' '}] [${val.code+' '}]  )   ` : '' })] : ''] + [i.option_codes ? [i.option_codes.map(i => { return i !== null ? `( [ + ] Options Code:  [${i.option}]   :  [${i.lex_desk+' '}]  )` : '' })] : ''],
                        quantity: i.quantity
                    }]
                })
                newPayload.map(i => {
                  return  areas = [...areas, {
                        name: i.img_name,
                        coords: [i.x1, i.y1, i.x2, i.y2],
                        shape: 'rect',
                        lineWidth: 2,
                        ref: i.ref,
                        preFillColor: "rgba(255, 255, 255, 0.3)",
                        strokeColor: "#000",
                        cat_folder: i.cat_folder,
                    }]
                });

                MAP.areas = areas
                this.setState({
                    selectPartOfCar: partOfCar,
                    positions: areas,
                    dataOfPictuers: dataForPicture,
                    title: title,
                    partsArrived: true
                })


            }).catch((e) => {
                console.log(e);
            })
    }
    getPartsOfTable = () => {
        this.setState({
            partsOfCatlog: []
        })
        this.props.tableOfpartNums()
            .then(({ payload }) => {
                let detailes = [];
                payload.map(i => {
                    return detailes = [...detailes, {
                        pnc: i.ref.length !== i.pnc.length ? i.pnc + '/' + i.ref : i.pnc,
                        number: i.number,
                        production_from: i.production_from !== 0 ? i.production_from.toString().substring(0, 4) + '/' + i.production_from.toString().substring(4, 6) + '/' + i.production_from.toString().substring(6, 8) : '',
                        production_to: i.production_to !== 0 ? i.production_to.toString().substring(0, 4) + '/' + i.production_to.toString().substring(4, 6) + '/' + i.production_to.toString().substring(6, 8) : '',
                        quantity: i.quantity,
                        name_def_lex_desc: i.name_def_lex_desc + [i.desc_lex_desc && ' , ' + i.desc_lex_desc],
                        addition_values: i.addition_values ? [i.addition_values.map(val => { return val !== null ? `( ${val.lex_desk}  :  [${val.ucc}] ${val.code}  )` : '' })] : [],
                    }]
                });
                this.setState({
                    partsOfCatlog: detailes
                })

            })
    }
    clicked = (area) => {
        this.setState({
            modal: !this.state.modal,
            dailogTable: true,
        });
        localStorage.setItem('ref', area.ref);
        localStorage.setItem('minor_sect', this.state.positions[0].name);
        // alert(area.ref)
        // alert(this.state.dataOfPictuers[0].minor_sect)
        this.getPartsOfTable()
    }

    handleClose = () => {
        this.setState({
            modal: !this.state.modal
        });
        localStorage.removeItem("ref");
    }
    render() {
        const data = {
            columns: this.state.columns,
            rows: this.state.selectPartOfCar
        };
        const newData = {
            columns: this.state.columns,
            rows: this.state.partsOfCatlog
        };


        return (
            <div>
                <NavbarPage /><br />
                <SearchBar /><br />
                <Row>

                    <Col md='6'>
                        <p className="decription text-center"> {this.state.title && ' Information of ' + this.state.title}</p><hr />
                        {this.state.partsArrived === false ? <CircleLoader
                            css={override}
                            size={60}
                            //size={"150px"} this also works
                            color={"#002000"}
                        /> : <MDBDataTable className='dataTable'
                            responsive
                            striped
                            bordered
                            hover
                            scrollY
                            scrollX
                            maxHeight="60vh"
                            data={data}
                            // pagesAmount={1000}
                            entriesOptions={[300, 400, 500]}
                            entries={300}
                            responsiveSm
                            responsiveMd
                            responsiveLg
                            responsiveXl
                            sortable
                            />}



                    </Col>
                    <Col className='products' md='6'>

                        <div className="grid">
                            <div className="presenter" style={{ margin: '0 10%6' }}>
                                <div style={{ position: "relative" }}>

                                    {this.state.partsArrived === false ? <CircleLoader
                                        css={override}
                                        size={60}
                                        //size={"150px"} this also works
                                        color={"#002000"}
                                    /> : <div className='rightSide'>
                                            <p className="decription text-center">{this.state.title}</p><hr />
                                            <ImageMapper
                                                src={`http://axistelcom.selfip.org:8020/Hyundai/CatalogMongo/public/storage/Cats/${this.state.positions[0] && this.state.positions[0].cat_folder}/${this.state.positions[0] && this.state.positions[0].name}.png`}
                                                map={MAP}
                                                // width={534}
                                                // onLoad={() => this.load()}
                                                onClick={area => this.clicked(area)}
                                                lineWidth={4}
                                                strokeColor={"white"}
                                            // imgWidth={500}

                                            />
                                        </div>}
                                    {this.state.hoveredArea && (
                                        <span
                                            className="tooltip"
                                            style={{ ...this.getTipPosition(this.state.hoveredArea) }}
                                        >
                                            {this.state.hoveredArea && this.state.hoveredArea.name}
                                        </span>
                                    )}
                                </div>
                                {/* <pre className="message">
            {this.state.msg ? this.state.msg : null}
        </pre>
        <pre>{this.state.moveMsg ? this.state.moveMsg : null}</pre> */}
                            </div>

                        </div>

                        <div>
                            {/* <Button color="danger" onClick={this.clicked}>Click me</Button> */}
                            <Modal isOpen={this.state.modal} toggle={this.handleClose} className=''>
                                <ModalHeader toggle={this.handleClose}>Detailes</ModalHeader>
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
                                            maxHeight="40vh"
                                            data={newData}
                                            pagesAmount={1000}
                                            entries={50}
                                        />}
                                </ModalBody>
                                <ModalFooter>
                                    {/* <Button color="primary" onClick={this.clicked}>Do Something</Button> */}
                                    <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                        {/* <hr /> */}
                    </Col>


                </Row>
            </div>
        )
    }
}
export default withRouter(connect(null, { partNumberMapper, tableOfpartNums })(TableOfPartNumbers));