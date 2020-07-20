import React, { Component } from 'react';
import { Row, Col, Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";
import '../../scss/EmployeePortalStyle.scss';
import './style.scss';
import { getSearchBy } from '../../../../../../store/actions'
import { connect } from 'react-redux';
import { css } from "@emotion/core";
import Filtr from '../../filter/filter';
import NavbarPage from '../../navbar/nav';
import SearchBar from '../../searchBar/searchBar';
import { GridLoader } from "react-spinners";
import { withRouter } from 'react-router-dom';

const override = css`
  display: block;
  margin: 20px auto;
  border-color: red;
`;

class Cars extends Component {
    state = {
        cars: [],
        wires:[],
        dataArrived: false,
        detaileProduct: false,
        // loading: true

    }
    // function to get input values from the user
    componentDidMount() {
        this.getTheCarsData(this.props.yearsSelected, this.props.typeSelected, this.props.regionSelected)
    }
    componentWillReceiveProps({ yearsSelected, typeSelected, regionSelected, carSelected }) {
        this.getTheCarsData(yearsSelected, typeSelected, regionSelected)
    }
    clickedProduct = (cat_folder, photo,hudainCar) => {
        localStorage.setItem('hundaiCar',hudainCar)
        localStorage.setItem('catFolder', cat_folder);
        localStorage.setItem('catCode', photo);
        this.setState({
            detaileProduct: true
        })
        let path_to_cat_folder = localStorage.getItem('catFolder');

        this.props.history.push(`/product/${path_to_cat_folder}`)

    }

    getTheCarsData = (year, type, region, car) => {
        this.props.getSearchBy(year, type, region, car)
            .then(({ payload,wires }) => {                
                let initData = [];
                let initWires = [];
                payload.map(i => {
                    return initData = [...initData,
                    {
                        title: i.cat_name,
                        photo: i.catalogue_code,
                        cat_folder: i.cat_folder,
                        image:i.image
                    }
                    ]
                });
                wires.map(i => {
                    return initWires = [...initWires,
                    {
                        title: i.cat_name,
                        photo: i.catalogue_code,
                        cat_folder: i.cat_folder,
                        image:i.image
                    }
                    ]
                });
                this.setState({
                    cars: initData,
                    wires:initWires,
                    dataArrived: true
                })   
                this.setState({
                    cars: [this.state.wires[0],...this.state.cars],
                    
                })  


            })
    }

    render() {
        // console.log(this.state.wires);
        
        
        let cars = this.state.cars.length !== 0 ? this.state.cars.map(i => (

            <Col md='4' key={i.id}>
                <Card onClick={() => this.clickedProduct(i.cat_folder, i.photo,i.title)}>
                    <CardImg top height="70" src={`http://axistelcom.selfip.org:8020/Hyundai/CatalogMongo/public/storage/TITLES/${i.image}` }
                        alt="Card image cap" />
                    <hr />
                    <CardBody>
                        <CardTitle className='text-center'>{i.title}</CardTitle>
                    </CardBody>
                </Card>
            </Col>

        )) : <h3 className='text-center'>There are no cars</h3>
        return (
            <div>
                <NavbarPage />
                <Row className='all'>
                    <Col md='4'>
                        <Filtr />
                    </Col>
                    <Col className='products' md='8'>
                        <SearchBar />
                        <hr />
                        {/* <Loading /> */}
                        <div className="container">
                            <Row className='allItems'>

                                {this.state.dataArrived === false ? <GridLoader
                                    css={override}
                                    size={20}
                                    //size={"150px"} this also works
                                    color={"#002000"}
                                /> : cars}


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
        yearsSelected: state.KiaCatalog.yearsSelected,
        typeSelected: state.KiaCatalog.typeSelected,
        regionSelected: state.KiaCatalog.regionSelected,
        carSelected: state.KiaCatalog.carSelected
    }
}

export default withRouter(connect(mapStateToProps, { getSearchBy })(Cars));