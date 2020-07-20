import React, { Component } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";
import { MDBDataTable } from 'mdbreact';
import '../../scss/EmployeePortalStyle.scss';
import { connect } from 'react-redux';
import { partsSelected, tableOfpartNums } from '../../../../../../store/actions';
import './style.scss';
import { css } from "@emotion/core";
import ImageMapper from 'react-image-mapper';
import { CircleLoader } from "react-spinners";
import NavbarPage from '../../navbar/nav';
import SearchBar from '../../searchBar/searchBar';
import { withRouter } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';

const override = css`
  display: block;
  margin: 20px auto;
  border-color: red;
`;
let MAP = {
    name: "my-map",
    areas: []
};

class TableOfParts extends Component {
    state = {
        selectPartOfCar: [],
        partsOfCatlog: [],
        partsArrived: false,
        modal: false,
        open:false,
        message:'',
        color:'',
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
                width: 1000
            },
            {
                label: 'Action',
                field: 'btn',
                sort: 'asc',
                width: 100
            },              
        ],
    }
    componentDidMount() {
        this.getCarParts();
        // this.getPartsOfTable();
    }

    getCarParts = () => {
        this.props.partsSelected()
            .then(({ payload, newPayload, title }) => {
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
                        addition_values: [i.addition_values ? [i.addition_values.map(val => { return val !== null ? `( [ + ] Model description: ${' '+val.lex_desk}   :  [${val.ucc +' '}] [${val.code+' '}]  )   ` : '' })] : ''] + [i.code_options ? [i.code_options.map(i => { return i !== null ? `( [ + ] Options Code:  [${i.option}]   :  [${i.lex_desk+' '}]  )` : '' })] : ''],
                        quantity: i.quantity
                    }]
                })
                newPayload.map(i => {
                    return areas = [...areas, {

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
                        addition_values: [i.addition_values ? [i.addition_values.map(val => { return val !== null ? `( [ + ] Model description: ${' '+val.lex_desk}   :  [${val.ucc +' '}] [${val.code+' '}]  )   ` : '' })] : ''] + [i.option_codes ? [i.option_codes.map(i => { return i !== null ? `( [ + ] Options Code:  [${i.option}]   :  [${i.lex_desk+' '}]  )` : '' })] : ''],
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
        this.getPartsOfTable()
    }

    handleClose = () => {
        this.setState({
            modal: !this.state.modal
        });
        localStorage.removeItem("ref");
    }
    onAddItem=(details,index)=>{
        console.log(details)
        var yearTo = details.production_to != 0 ?new Date(details.production_to) :0
        var yearFrom= details.production_from != 0 ? new Date(details.production_from) : 0
        var carName=localStorage.getItem('hundaiCar')
        let BrandSelected={pnc:details.pnc,partName:details.name_def_lex_desc,Number:details.number,description:details.addition_values,carName:carName,To:yearTo ==0 ? 0 :yearTo.getFullYear() ,From : yearFrom == 0 ? 0 : yearFrom.getFullYear()}
        console.log(BrandSelected)
       var AllItems=localStorage.getItem('hundai') != null ? JSON.parse(localStorage.getItem(`hundai`)):[]
       AllItems.push(BrandSelected)
     
        localStorage.setItem(`hundai`,JSON.stringify(AllItems))
        setTimeout(function(){  window.location.reload() }, 4000);
        this.setState({open:true,message:`${details.pnc} Add successfully`,color:'#53AF50'})  
          
    }
    removeItem=(i,index)=>{
        console.log(i)
        var AllItems=localStorage.getItem('hundai') != null ? JSON.parse(localStorage.getItem(`hundai`)):[]
        var filtered= AllItems.length >0 ? AllItems.filter(item=>( item.pnc != i.pnc  || item.description != i.addition_values) && item) :[]
       localStorage.setItem(`hundai`,JSON.stringify(filtered))
        setTimeout(function(){  window.location.reload() }, 4000);
        this.setState({open:true,message:`${i.pnc} has been Removed`,color:'#F24636'})    
    }
    getpartFromLocalStorage=(oneItem)=>{
        var AllItems=localStorage.getItem('hundai') != null ? JSON.parse(localStorage.getItem(`hundai`)):[]
        var filtered=AllItems.filter(item=>(item.description == oneItem.addition_values && item.Number == oneItem.number))
        if(filtered.length >0){
            return true
        }else{
            return false
        }

    }
    render() {
        const data = {
            columns: this.state.columns,
            rows: this.state.selectPartOfCar.map((i,index)=>{
                return({
                    ...i,  
                    btn:
                    <>
                        <Button color="success" onClick={()=>this.onAddItem(i,index)} style={{display: this.getpartFromLocalStorage(i) ==false ? 'inline':'none'}}>
                             Add
                        </Button>
                        <Button color="btn btn-danger" onClick={()=>this.removeItem(i,index)} style={{display: this.getpartFromLocalStorage(i) ==false ? 'none':'inline'}}>
                             Remove
                        </Button>
                        </>

                })
            })
        };
        const newData = {
            columns: this.state.columns,
            rows: this.state.partsOfCatlog && this.state.partsOfCatlog.map((i,index)=>{
                return({
                    ...i,  
                    btn:
                    <>
                        <Button color="success" onClick={()=>this.onAddItem(i,index)} style={{display: this.getpartFromLocalStorage(i) ==false ? 'inline':'none'}}>
                             Add
                        </Button>
                        <Button color="btn btn-danger" onClick={()=>this.removeItem(i,index)} style={{display: this.getpartFromLocalStorage(i) ==false ? 'none':'inline'}}>
                             Remove
                        </Button>
                        </>

                })
            })
        };
        return (
            <div>
                <NavbarPage /><br />
                <Snackbar
                        anchorOrigin={{vertical:"top",horizontal:"right"}} 
                        ContentProps={{style:{
                            backgroundColor:`${this.state.color}`
                             }}} 
                        open={this.state.open}
                        autoHideDuration={8000}
                        message={this.state.message}
                   />
                
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
                            onPageChange={this.pageChange}
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
                                            maxHeight="40vh"
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
                        {/* <hr /> */}
                    </Col>


                </Row>
            </div>
        )
    }
}
export default withRouter(connect(null, { partsSelected, tableOfpartNums })(TableOfParts));