import React, { Component } from 'react';
import { Row, Col, Collapse, FormGroup } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { fetchcarwithcatalogCode} from '../../../../../store/actions'
import { connect } from 'react-redux';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import './style.scss';
import 'react-select2-wrapper/css/select2.css';
import Swal from 'sweetalert2';
import notFound from '../../../../../images/notFound2.jpg';
import { css } from "@emotion/core";
import { FadeLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 20px auto;
`;
class Filtr2 extends Component {
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

        ],
        region: [
            { label: 'All', value: '' },
            { label: '[AUS] Australia', value: 'AUS' },
            { label: '[EUR] Europe', value: 'EUR' },
            { label: '[GEN] General', value: 'GEN' },
            { label: '[MES] Middle East', value: 'MES' },
            { label: '[CAN] Canada', value: 'CAN' },
            { label: '[USA] USA', value: 'USA' },
            { label: '[CIS] CIS', value: 'CIS' },
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
        dataEdit:[]
    }

    componentDidMount() {
        this.getcarwihcatalogCode(localStorage.getItem('catCode'))
    }

   
    getcarwihcatalogCode=(catalogcode)=>{
        this.props.fetchcarwithcatalogCode(catalogcode)
        .then(( {payload}) => {
            

            console.log(payload,'filter')
            this.setState({dataEdit:payload,dataArrived:true})
          
            console.log(this.state.dataEdit.length)
           

        }).catch((e) => {
            console.log(e);

        })
    }
    
   
    
    render() {
        return (
            <div className="filter">
                <div className="filterCat">
                    {/* Basic Info section */}

                    <Row>
                        <Col sm="12">

                            {/* <Button color="primary" onClick={this.toggle}>Toggle</Button> */}
                            <button className="btn btn-block btnSearch" onClick={this.toggleIsCatOpen} type="button">

                                <span className='float-left'> <p className='btnTitle'>Vehical information</p></span>
                            </button>
                            <div style={{textAlign:'center',marginTop:'2em'}}>
                            <img src={`http://axistelcom.selfip.org:8020/Kia//CatalogMongo/public/storage/TITLES/${localStorage.getItem('carImage')}`} style={{width:'15em'}}/>

                            </div>
                            {
                                this.state.dataArrived == false ? <FadeLoader
                                    css={override}
                                    size={15}
                                    //size={"150px"} this also works
                                    color={"#6c757d"}
                                />:

                            <AvForm onValidSubmit='' ref={c => (this.form = c)}>
                                <div className="container">
                                    <Collapse className='search' isOpen={this.state.isCatOpen}>
                                    {this.state.dataEdit.length >0 && this.state.dataEdit.map((data,i)=>(
                                        <div className="type">
                                            
                                            
                                            <AvField type="select" name="location.state" color="primary" label={data.key}>
                                            
                                                {data.values.map(value=>(
                                                    <option className="optionselect">{value.code}{value.ucc}</option>

                                                )
                                                )}
                                                </AvField>
                                            
                                        </div>
                                    ))}
                           
                                        
                                        

                                    </Collapse>
                                </div>
                            </AvForm>
                            }

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

export default withRouter(connect(mapStateToProps, { fetchcarwithcatalogCode })(Filtr2));