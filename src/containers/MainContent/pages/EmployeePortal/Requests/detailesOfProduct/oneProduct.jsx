import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Row, Col, Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";
import '../../scss/EmployeePortalStyle.scss';
import { connect } from 'react-redux';
import { css } from "@emotion/core";
import { getPartsOfTheCar, searchByVin } from '../../../../../../store/actions';
import './style.scss';
import { FadeLoader } from "react-spinners";
import NavbarPage from '../../navbar/nav';
import SearchBar from '../../searchBar/searchBar';
import Filtr2 from '../../filter2/filter';

const override = css`
  display: block;
  margin: 10px auto;
  border-color: red;

`;

class Product extends Component {
    state = {
        selectPartOfCar: [],
        partsArrived: false,
        nextPart: false,
    }
    componentDidMount() {
        this.getCarParts()
    }
    // function to get input values from the user
    clickedProduct = (short_name) => {
        localStorage.setItem('majorSect', short_name);
        // alert(short_name)
        this.setState({
            nextPart: true
        })
        let major_sect = localStorage.getItem('majorSect');
        let cat_folder = localStorage.getItem('catFolder');
        this.props.history.push(`/product/${cat_folder}/part-of-product/${major_sect}`)

    }



    getCarParts = () => {
        this.props.getPartsOfTheCar()
            .then(({ payload, catFolder, catCode }) => {
                let partOfCar = [];

                localStorage.setItem('catFolder', catFolder);
                localStorage.setItem('catCode', catCode);
                payload.map(i => {
                   return partOfCar = [...partOfCar, { names: i.name, png: i.short_name }]
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
                    <Col md="4" >
                    <Filtr2 />
                    </Col>
                    <Col className='products' md='8'>
                        <SearchBar />
                        <hr />
                        <div className="container">
                            <Row>
                                {this.state.partsArrived === false ? <FadeLoader
                                    css={override}
                                    size={15}
                                    //size={"150px"} this also works
                                    color={"#6c757d"}
                                /> : this.state.selectPartOfCar.map(i => (
                                    <Col md='4'>
                                        <Card onClick={() => this.clickedProduct(i.png)}>
                                            <CardImg top width="100" height="250" src={`http://axistelcom.selfip.org:8020/Hyundai/CatalogMongo/public/storage/GIS/${i.png}.png`}
                                                alt="Card image cap" />
                                            <hr />
                                            <CardBody>
                                                <CardTitle className='text-center'>{i.names}</CardTitle>
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

const mapStateToProps = (state) => {
    return {
        vnSearch: state.KiaCatalog.vnSearch
    }
}
export default withRouter(connect(mapStateToProps, { getPartsOfTheCar, searchByVin })(Product));