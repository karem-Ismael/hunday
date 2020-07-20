import React, { Component } from 'react';
// import PDFViewer from 'pdf-viewer-reactjs';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchUrlFile } from '../../../../../../store/actions';



class PdfView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            urlPdfServer: '',
        };
    }
   

    render() {
        
        return (
            <div>

                {this.props.pdfUrl=== ''? <h4 style={{ position: 'fixed', left: 600 }}>Please select your file </h4> : this.props.pdfUrl === 0 ?
                    <iframe className='pdf' title='file pdf' style={{ width: 1100, height: 900, position: 'fixed', top: 150, left: 600 }} src={'http://axistelcom.selfip.org:8020/Hyundai/CatalogMongo/public/storage/PDF/KKCIPJG1.pdf'}></iframe>
                    :

                    <iframe className='pdf' title='file pdf' style={{ width: 1100, height: 900, position: 'fixed', top: 150, left: 600 }} src={`http://axistelcom.selfip.org:8020/Hyundai/CatalogMongo/${this.props.pdfUrl[0]}`}></iframe>
                }

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        pdfUrl: state.KiaCatalog.pdfUrl
    }
}

export default withRouter(connect(mapStateToProps, { fetchUrlFile })(PdfView));
