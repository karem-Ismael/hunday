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

const initialState = {
    yearsSelected: '',
    typeSelected: '',
    regionSelected: '',
    carSelected: '',
    cat_codeOfCarSelected: '',
    vnSearch: '',
    pncSearch: '',
    partSearch: '',
    clearPncPart: '',
    pdfUrl: '',
    kiaPnc: '',

}

const KiaCatalog = (state = initialState, action) => {
    switch (action.type) {
        case HANDLE_SELCT_YEARS:
            return {
                ...state,
                yearsSelected: action.payload
            }
        case HANDLE_SELCT_TYPE:
            return {
                ...state,
                typeSelected: action.payload
            }
        case HANDLE_SELECT_REGION:
            return {
                ...state,
                regionSelected: action.payload
            }
        case VN_SEARCH:
            return {
                ...state,
                vnSearch: action.payload
            }
        case CAR_SEARCH:
            return {
                ...state,
                carSelected: action.payload,
                cat_codeOfCarSelected: action.newPayload,
            }
        case CLEAR_CAR_SEARCH:
            return {
                ...state,
                carSelected: null
            }
        case PNC_SEARCH:

            return {
                ...state,
                pncSearch: action.payload
            }
        case PART_SEARCH:

            return {
                ...state,
                partSearch: action.payload
            }
        case PDF_URL:

            return {
                ...state,
                pdfUrl: action.payload
            }
        case KIA_PNC_SEARCH:            
            return {
                ...state,
                kiaPnc: action.payload
            }
        case CLEAR_PART_PNC:
            return {
                ...state,
                clearPncPart: null
            }
        case FILTERS_CLEAR:{
            return{
                ...state,
                typeSelected:'',
                yearsSelected:'',
                regionSelected:'',
            }
        }
        /**HANDLE_SELCT_TYPE */
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default KiaCatalog;