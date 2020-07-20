import React, { Component } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col } from 'reactstrap';
import {connect} from 'react-redux';
import { partSearch,pncSearch,getKiaPnc } from '../../../../../store/actions'

import { withRouter } from 'react-router-dom';
import './style.scss'

class SearchBar extends Component {
    state = {
        productsSearch: {},
        optinalsData: [
            {
                jobLevel: ['part', 'pnc']
            }
        ],
        goToCatalog: false,
    }
    handleSearchOfProducts = (e, values) => {
        e.persist();
        
        this.props.pncSearch(values.tableSearch);
        this.props.partSearch(values.partNum);
        this.props.history.push(`/part-number`)
        this.form && this.form.reset();
        // return <Redirect to={`/table-of-catalog`} />
    }
    handlePncSearch=(e,values)=>{
        e.persist();
        this.props.getKiaPnc(values.pnc);
        this.props.history.push(`/pnc`)

    }
    render() {
       

        return (
            <div className='sticky-top'>
            <Row>
                <Col md='6' className='partNum'>
                    <AvForm onValidSubmit={this.handleSearchOfProducts} ref={c => (this.form = c)}>

                        <Row>
                            <Col md='8'>
                                <AvField
                                    name="tableSearch"
                                    placeholder='Part number Search'
                                    required
                                />
                            </Col>
                            <Col md='4'><button className='btn btn-primary productSearch'><i className="fas fa-search searchIcon"></i></button></Col>
                        </Row>


                    </AvForm>
                </Col>
                
                <Col md='6'>
                    <AvForm onValidSubmit={this.handlePncSearch} ref={c => (this.form = c)}>

                        <Row>
                            <Col md='8'>
                                <AvField
                                    name="pnc"
                                    placeholder='PNC Search'
                                    required

                                />
                            </Col>
                            <Col md='4'><button className='btn btn-primary productSearch'><i className="fas fa-search searchIcon"></i></button></Col>
                        </Row>


                    </AvForm>
                </Col>
            </Row>




        </div>
        );
    }
}
export default withRouter(connect(null, {pncSearch,partSearch,getKiaPnc })(SearchBar));
