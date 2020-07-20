import React, { Component } from 'react';
import { Row, Col, Collapse, FormGroup } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { getSearchBy, handleYearsSelect, handleTypesSelect, handleRegionSelect, handleCarSearch, searchByVin } from '../../../../../store/actions'
import { connect } from 'react-redux';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import './style.scss';
import 'react-select2-wrapper/css/select2.css';
import Swal from 'sweetalert2';
import notFound from '../../../../../images/notFound2.jpg';
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";
const override = css`
  display: block;
  margin: 0 25px;
`;
class Filtr extends Component {
    state = {
        isVehcileOpen: true,
        isCatOpen: true,
        choose: false,
        types: [
            { label: 'All', value: '' },
            { label: 'Passengers', value: 'PASSENGER', id: 21 },
            { label: 'R/V', value: 'r/v', id: 22 },
            { label: 'Commerical', value: 'COMMERCIAL', id: 23 },
        ],
        years: [
            { label: 'All', value: '' },
            { label: '2021', value: 2021 },
            { label: '2020', value: 2020 },
            { label: '2019', value: 2019 },
            { label: '2018', value: 2018 },
            { label: '2017', value: 2017 },
            { label: '2016', value: 2016 },
            { label: '2015', value: 2015 },
            { label: '2014', value: 2014 },
            { label: '2013', value: 2013 },
            { label: '2012', value: 2012 },
            { label: '2011', value: 2011 },
            { label: '2010', value: 2010 },
            { label: '2009', value: 2009 },
            { label: '2008', value: 2008 },
            { label: '2007', value: 2007 },
            { label: '2006', value: 2006 },
            { label: '2005', value: 2005 },
            { label: '2004', value: 2004 },
            { label: '2003', value: 2003 },
            { label: '2002', value: 2002 },
            { label: '2001', value: 2001 },
            { label: '2000', value: 2000 },
            { label: '1999', value: 1999 },
            { label: '1998', value: 1998 },
            { label: '1997', value: 1997 },
            { label: '1996', value: 1996 },
            { label: '1995', value: 1995 },
            { label: '1994', value: 1994 },
            { label: '1993', value: 1993 },
            { label: '1992', value: 1992 },
            { label: '1991', value: 1991 },
            { label: '1990', value: 1990 },
            { label: '1989', value: 1989 },
            { label: '1988', value: 1988 },
            { label: '1987', value: 1987 },
            { label: '1986', value: 1986 },
            { label: '1985', value: 1985 },
            { label: '1984', value: 1984 },
            { label: '1983', value: 1983 },
            { label: '1982', value: 1982 },
            { label: '1981', value: 1981 },
            { label: '1980', value: 1980 },
        ],
        region: [
            { label: 'All', value: '' },
            { label: '[AUS] Australia', value: 'AUS' },
            { label: '[EUR] Europe', value: 'EUR' },
            { label: '[GEN] General', value: 'GEN' },
            { label: '[MES] Middle East', value: 'MES' },
            { label: '[HAC] Canada', value: 'HAC' },
            { label: '[HMA] USA', value: 'HMA' },
        ],
        cars: [],
        search: '',
        selectedOption: null,
        selectedTagCust: null,
        selectedType: null,
        selectedYear: null,
        selectedRegion: null,
        selectedCatalogue: null,
        productsSearch: '',
        vinLoader: false,
        dataArrived: false,

    }

    // componentDidMount() {
    //     this.generateSearchByOptions(this.props.yearsSelected,this.props.typeSelected,this.props.regionSelected)
    // }

    componentWillReceiveProps({ yearsSelected, typeSelected, regionSelected, }) {
        this.generateSearchByOptions(yearsSelected, typeSelected, regionSelected)
    }
    toggleIsVehcileOpen = () => {
        this.setState({
            isVehcileOpen: !this.state.isVehcileOpen
        })
    }
    toggleIsCatOpen = () => {
        this.setState({
            isCatOpen: !this.state.isCatOpen
        })
    }

    handleSearchOfProducts = (e, values) => {
        e.persist();
        // alert(values);
        this.setState({
            productsSearch: values,
        })

    }
    vehicelSearchSubmit = (e, values) => {
        e.persist();
        this.setState({
            search: values,
            vinLoader: true,
        })
        localStorage.setItem('searchVin', this.state.search.search);
        this.gitDataByVin()
    }
    generateSearchByOptions = (year, type, region, car) => {

        /*** */
        this.props.getSearchBy(year, type, region, car)
            .then(({ payload }) => {
                let initData = [];
                payload.map(val => {
                    return initData = [...initData,
                    {
                        value: val.cat_folder, label: val.cat_name, cat_code: val.catalogue_code
                    }]
                });
                this.setState({
                    cars: initData,
                    dataArrived: false,
                })
            })

    }
    removeLocalStorge = () => {
        localStorage.clear();
    }
    gitDataByVin = () => {
        this.props.searchByVin()
            .then(({ payload }) => {
                localStorage.setItem('catFolder', payload.data.cat_folder);
                localStorage.setItem('catCode', payload.data.catalog_code);
                this.setState({
                    cat: payload.data.cat_folder,
                    vinLoader: false
                })
                this.props.history.push(`/product/${payload.data.cat_folder}`)
                // setInterval(this.removeLocalStorge, 1000);
            }).catch((e) => {
                console.log(e);
                // alert(`Sorry the product doesn't exist`)
                Swal.fire({
                    title: `Item doesn't exist!`,
                    // text: `Item doesn't exist` ,
                    imageUrl: notFound,
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                })
                this.setState({
                    vinLoader: false
                })
            })

    }
    typeIsSelected = (val) => {
        this.props.handleTypesSelect(val);
        this.setState({
            dataArrived: true,
        })
    }
    yearIsSelected = (val) => {
        this.props.handleYearsSelect(val);
        this.setState({
            dataArrived: true,
        })
    }
    regionIsSelected = (val) => {
        this.props.handleRegionSelect(val);
        this.setState({
            dataArrived: true,
        })
    }
    casIsSelected = (val, catfolder) => {
        this.props.handleCarSearch(val, catfolder)

        this.props.history.push(`/product/${val}`)

    }

    render() {
        return (
            <div className="filter">
                <div className="filterVeichle">
                    {/* Basic Info section */}

                    <Row>
                        <Col sm="12">
                            <button className="btn btn-block btnSearch" onClick={this.toggleIsVehcileOpen} type="button">
                                <span className='float-left'>Vehicle Search</span>

                            </button>

                            <AvForm onValidSubmit={this.vehicelSearchSubmit} ref={c => (this.form = c)}>
                                <div className="container">
                                    <Collapse className='search' isOpen={this.state.isVehcileOpen}>
                                        <Row>
                                            <Col md='12'>
                                                <div className="searchBy">
                                                    <label>Search by VIN</label>
                                                    <AvField type='text' name='search' placeholder='VIN number' />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md='12'>
                                                <button className='btn searchButton btn-primary' type="submit">
                                                    {this.state.vinLoader === true ? <ClipLoader
                                                        css={override}
                                                        size={20}
                                                        color={"#fff"}
                                                    /> : <div><i className="fas fa-search searchIcon"></i>Search</div>}</button>
                                            </Col>
                                        </Row>
                                    </Collapse>
                                </div>
                            </AvForm>


                        </Col>
                    </Row>
                </div>

                <div className="filterCat">
                    {/* Basic Info section */}

                    <Row>
                        <Col sm="12">

                            {/* <Button color="primary" onClick={this.toggle}>Toggle</Button> */}
                            <button className="btn btn-block btnSearch" onClick={this.toggleIsCatOpen} type="button">

                                <span className='float-left'>{this.state.dataArrived === false ? <span>Catalouge Search</span> : <ClipLoader
                                    css={override}
                                    size={20}
                                    color={"#000"}
                                />}</span>
                            </button>
                            <AvForm  ref={c => (this.form = c)}>
                                <div className="container">
                                    <Collapse className='search' isOpen={this.state.isCatOpen}>
                                        <div className="type">
                                            <label>Type</label>
                                            <FormGroup>
                                                <Select
                                                    defaultValue={{ label: 'All', value: '' }}
                                                    onChange={(e) => this.typeIsSelected(e.value)}
                                                    options={this.state.types}
                                                    value={this.props.typeSelected ? { label: this.props.typeSelected } : { label: 'All' }}
                                                />
                                            </FormGroup>
                                        </div>
                                        <div className="year">
                                            <label>Year</label>
                                            <FormGroup>
                                                <Select
                                                    defaultValue={{ label: 'All', value: '' }}
                                                    onChange={(e) => this.yearIsSelected(e.value)}
                                                    options={this.state.years}
                                                    value={this.props.yearsSelected ? { label: this.props.yearsSelected } : { label: 'All' }}

                                                />
                                            </FormGroup>
                                        </div>

                                        <div className="region">
                                            <label>Region</label>
                                            <FormGroup>
                                                <Select
                                                    defaultValue={{ label: 'All', value: '' }}
                                                    onChange={(e) => this.regionIsSelected(e.value)}
                                                    options={this.state.region}
                                                    value={this.props.regionSelected ? { label: this.props.regionSelected } : { label: 'All' }}

                                                />
                                            </FormGroup>
                                        </div>

                                        <div className="catalogue">
                                            <label>Catalogue</label>
                                            <FormGroup>
                                                <Select
                                                    onChange={(e) => this.casIsSelected(e.value, e.cat_code)}
                                                    options={this.state.cars}
                                                />
                                            </FormGroup>

                                        </div>

                                    </Collapse>
                                </div>
                            </AvForm>

                        </Col>
                    </Row>
                </div>
            </div>



        );
    }
}
const mapStateToProps = (state) => {
    return {
        yearsSelected: state.KiaCatalog.yearsSelected,
        typeSelected: state.KiaCatalog.typeSelected,
        regionSelected: state.KiaCatalog.regionSelected,
        carSelected: state.KiaCatalog.carSelected,
        cat_codeOfCarSelected: state.KiaCatalog.cat_codeOfCarSelected
    }
}

export default withRouter(connect(mapStateToProps, { getSearchBy, handleYearsSelect, handleTypesSelect, handleRegionSelect, handleCarSearch, searchByVin })(Filtr));