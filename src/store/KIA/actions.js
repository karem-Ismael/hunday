import {
    HANDLE_SELCT_YEARS,
    HANDLE_SELCT_TYPE,
    HANDLE_SELECT_REGION,
    VN_SEARCH,
    CAR_SEARCH,
    CLEAR_CAR_SEARCH,
    PNC_SEARCH,
    PART_SEARCH,
    CLEAR_PART_PNC,
    PDF_URL,
    KIA_PNC_SEARCH,
    FILTERS_CLEAR
} from './actionTypes';

import Request from '../Request';


/***To get all cars and make filter if you want */
export const getSearchBy = (val, type, region, car) => {
    if (!type) type = "";
    if (!region) region = "";
    if (!val) val = "";
    return (dispatch) => {
        return Request.get(`/catalogs/hyundai?type=${type}&date=${val}&region=${region}`).then(({ data }) => {   
                                 
            return {
                type: "",
                payload: data.data,
                wires:data.wires
            }
        })
    }
}

/**To get the six parts for every car, Some cars have 7 parts  */
export const getPartsOfTheCar = (cat_folder) => {
    return (dispatch) => {
        let cat_folder = localStorage.getItem('catFolder');
        let catalogue_code = localStorage.getItem('catCode');

        return Request.get(`/catalogs/hyundaiMap?cat_folder=${cat_folder}&catalog_code=${catalogue_code}`).then((data) => {
            return {
                type: "",
                payload: data.data.data.major_sect,
                catFolder: data.data.data.cat_folder,
                catCode: data.data.data.catalog_code,
            }
        })
    }
}
/**To get the data for one part of six parts */
export const carSelected = () => {
    return (dispatch) => {
        let cat_folder = localStorage.getItem('catFolder');
        let catalog_code = localStorage.getItem('catCode');
        let major_sect = localStorage.getItem('majorSect');

        return Request.get(`/catalogs/hyundaiMinorSect?cat_folder=${cat_folder}&catalog_code=${catalog_code}&major_sect=${major_sect}`).then((data) => {
            return {
                type: "",
                payload: data.data.data,
                catFolder: data.data.cat_folder,
            }
        })
    }
}
export const fetchcarwithcatalogCode=(catalogcode)=>{
    return (dispatch) => {
        return Request.get(`catalogs/hyundaiMajorAttributes?catalog_code=${catalogcode}`).then((data) => {
            console.log(data.data.data)
            return {
              
                payload: data.data.data,
            }
        })
    }


}
/***To get the data for data table and the big image who has detailes and coords for yhe number in image */
export const partsSelected = () => {
    return (dispatch) => {
        // let ref = localStorage.getItem('ref');
        let cat_folder = localStorage.getItem('catFolder');
        let minor_sector = localStorage.getItem('minorSector');
        let catalog_code = localStorage.getItem('catCode');
        let major_sect = localStorage.getItem('majorSect');
        /**catalogs/hyundaiParts?major_sect=EN&cat_folder=GEN7D0AA&catalog_code=GEN7D0AA00&minor_sector=28283D */
        return Request.get(`/catalogs/hyundaiParts?major_sect=${major_sect}&cat_folder=${cat_folder}&catalog_code=${catalog_code}&minor_sector=${minor_sector}`).then((data) => {

            return {
                type: "",
                picture: data.data.picture,
                payload: data.data.data,
                newPayload: data.data.positions,
                title: data.data.title
            }
        })
    }
}
/***To make Search by part number */
export const partPncSearch = (name, value) => {
    return (dispatch) => {
        return Request.get(`catalogs/hyundaipart?part=${value}`).then((data) => {
            return {
                type: "",
                payload: data.data.data,
            }
        })
    }
}

export const partNumberMapper = () => {
    return (dispatch) => {
        // let ref = localStorage.getItem('ref');
        let cat_folder = localStorage.getItem('catFolder');
        let minor_sect = localStorage.getItem('minorSect');
        let catalog_code = localStorage.getItem('catCode');
        let pnc = localStorage.getItem('PNC');
        let minor_lex_desc = localStorage.getItem('minorLexDesc');
        return Request.get(`/catalogs/hyundaiPartLastStep?pnc=${pnc}&cat_folder=${cat_folder}&minor_sect=${minor_sect}&catalog_code=${catalog_code}&title=${minor_lex_desc}`).then((data) => {
            return {
                type: "",
                picture: data.data.picture,
                payload: data.data.data,
                newPayload: data.data.positions,
                title: data.data.title
            }
        })
    }
}

/***This is an action to get the detailes of detailes in mapper image  */
export const tableOfpartNums = () => {
    return (dispatch) => {
        let pnc = localStorage.getItem('ref');
        let cat_folder = localStorage.getItem('catFolder');
        let minor_sect = localStorage.getItem('minor_sect');
        let catalog_code = localStorage.getItem('catCode');
        let major_sect = localStorage.getItem('majorSect');
        return Request.get(`/catalogs/hyundaipnc?cat_folder=${cat_folder}&minor_sect=${minor_sect}&catalog_code=${catalog_code}&major_sect=${major_sect}&pnc=${pnc}`).then((data) => {
            return {
                type: "",
                payload: data.data.data,
            }
        })
    }
}

/**pnc kia search */
export const fetchPncKiaSearch = (value) => {
    return (dispatch) => {
        return Request.get(`catalogs/hyundaipncsearch?pnc=${value}`).then((data) => {
            return {
                type: "",
                payload: data.data.data,
            }
        })
    }
}

export const fetchGraidOfPncKiaSearch = (value, cat_folder) => {
    return (dispatch) => {
        return Request.get(`catalogs/hyundaiPncLastStep?pnc=${value}&cat_folder=${cat_folder}`).then((data) => {
            return {
                type: "",
                payload: data.data.data,
            }
        })
    }
}

/***Action to make search by VIN */
export const searchByVin = () => {
    let vin = localStorage.getItem('searchVin');
    return (dispatch) => {
        return Request.get(`/catalogs/hyundaiVin?vin=${vin}`).then((data) => {
            return {
                type: "",
                payload: data.data
            }
        })
    }
}

export const pdfFiles = () => {
    return (dispatch) => {
        return Request.get(`/catalogs/pdfs`).then((data) => {
            return {
                type: "",
                payload: data.data
            }
        })
    }
}

export const fetchUrlFile = (pdfUrl) => {
    return (dispatch) => {
        return Request.get(`/catalogs/getPdf?cat_folder=${pdfUrl}`).then((data) => {
            return {
                type: "",
                payload: data.data
            }
        })
    }
}
/**catalogs/pdfs */
/**For filter by year */
export const handleYearsSelect = (value) => {

    return (dispatch) => dispatch({
        type: HANDLE_SELCT_YEARS,
        payload: value
    })
}
/**For filter by type */
export const handleTypesSelect = (value) => {
    return (dispatch) => dispatch({
        type: HANDLE_SELCT_TYPE,
        payload: value
    })
}
/**For filter by region */
export const handleRegionSelect = (value) => {
    return (dispatch) => dispatch({
        type: HANDLE_SELECT_REGION,
        payload: value
    })
}
/**for car selected in filter */

export const handleCarSearch = (value, cat_code) => {
    localStorage.setItem('catFolder', value);
    localStorage.setItem('catCode', cat_code);
    // this.props.history.push(`/product/${cat_code}`) 

    return (dispatch) => dispatch({
        type: CAR_SEARCH,
        payload: value,
        newPayload: cat_code
    })

}
/**for car selected in filter */
export const clearCarSearch = () => {
    return (dispatch) => dispatch({
        type: CLEAR_CAR_SEARCH
    })
}


export const clearPartPncSearch = () => {
    return (dispatch) => dispatch({
        type: CLEAR_PART_PNC
    })
}

/**to get the value of VNSearch */
export const vnSearch = (value) => {
    return (dispatch) => dispatch({
        type: VN_SEARCH,
        payload: value
    })
}



/**to get the value of VNSearch */
export const pncSearch = (value) => {
    return (dispatch) => dispatch({
        type: PNC_SEARCH,
        payload: value
    })
}

/**to get the value of VNSearch */
export const partSearch = (value) => {
    return (dispatch) => dispatch({
        type: PART_SEARCH,
        payload: value
    })
}
export const getPdfUrl = (value) => {
    return (dispatch) => dispatch({
        type: PDF_URL,
        payload: value
    })
}
export const getKiaPnc = (value) => {

    return (dispatch) => dispatch({
        type: KIA_PNC_SEARCH,
        payload: value
    })
}

export const filtersClear = () => {
    return (dispatch) => dispatch({
        type: FILTERS_CLEAR,
    })
}
