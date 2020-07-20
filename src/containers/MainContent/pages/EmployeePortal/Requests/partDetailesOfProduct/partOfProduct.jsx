import React, { Component } from 'react';
import { Row, Col, Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";
import '../../scss/EmployeePortalStyle.scss';
import { connect } from 'react-redux';
import { carSelected } from '../../../../../../store/actions';
import './style.scss';
import { css } from "@emotion/core";
import { withRouter } from 'react-router-dom';
import { CircleLoader } from "react-spinners";
import NavbarPage from '../../navbar/nav';
import SearchBar from '../../searchBar/searchBar';
import Filtr2 from '../../filter2/filter';

const override = css`
  display: block;
  margin: 20px auto;
  border-color: red;
`;

class PartOfProduct extends Component {
    state = {
        selectPartOfCar: [],
        partsArrived: false,
        detaileProduct: false,
    }
    componentDidMount() {
        this.getCarParts(this.props.match.params.id)
    }
    // function to get input values from the user
    clickedProduct = (minorSector) => {
        localStorage.setItem('minorSector', minorSector);
        this.setState({
            detaileProduct: true
        })
        let cat_folder = localStorage.getItem('catFolder');
        let major_sect = localStorage.getItem('majorSect');
        this.props.history.push(`/product/${cat_folder}/part-of-product/${major_sect}/table-of-parts`)

    }

    getCarParts = () => {
        this.props.carSelected()
            .then(({ payload, catFolder }) => {                
                let partOfCar = [];
                localStorage.setItem('catFolder', catFolder);
                payload.map(i => {
                    return partOfCar = [...partOfCar, {
                        minorSector: i.minor_sector,
                        gisFolder: i.gis_folder,
                        image:i.image,
                        gisFile: i.gis_file,
                        minorSectorFormat: i.minor_sect_name.note,
                        minor_sect_name: i.minor_sect_name.name ,
                    }]
                });
                this.setState({
                    selectPartOfCar: partOfCar,
                    partsArrived: true
                })
            }).catch((e) => {
                console.log(e);
            })
    }

    render() {


        return (
            <div>
                <NavbarPage />
            
                {/* <h1 className="lead text-center">Incoming application form</h1> */}
                <Row>
                    <Col md='4'>
                        <Filtr2 />
                    </Col>

                    <Col className='products' md='8'>
                        <SearchBar />
                        <hr />
                        <div className="container">
                            <Row>

                                {this.state.partsArrived === false ? <CircleLoader
                                    css={override}
                                    size={60}
                                    //size={"150px"} this also works
                                    color={"#002000"}
                                /> : this.state.selectPartOfCar.map(i => (

                                    <Col md='4' >
                                        <Card onClick={() => this.clickedProduct(i.minorSector, i.minorSect)}>
                                            <CardImg top width="100" height="250" src={`http://axistelcom.selfip.org:8020/Hyundai/CatalogMongo/public/storage/GIS/${i.gisFolder}/${i.image}`}
                                                alt="Card image cap" />
                                            <hr />
                                            <CardBody>
                                                <CardTitle className='text-center'>{i.minor_sect_name}</CardTitle>
                                                <CardTitle className='text-center'>{i.minorSectorFormat}</CardTitle>
                                            </CardBody>
                                        </Card>
                                    </Col>

                                ))}

                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default withRouter(connect(null, { carSelected })(PartOfProduct));