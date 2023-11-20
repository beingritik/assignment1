/*
 * GUIDELINES:
 * 1. All errors outside the realm of HTTP(for eg. DB error) should be
 * generic HTTP 500 Internal server error.
 * 2. objERRS will provde single error response for given err_type.
 * Therefor a entry of different error response if required shall be made by other err_type.
 */

/**
 * Returns an array
 * 1st element is server response 'res' object and
 * 2nd element is payload (object) to be send containing
 * Status: response code,
 * Message: readable message,
 * Data: data if any
 */
const ERRHANDLER = { 
    DBCONNerr, 
    APIerr,
    VERerr,
    SERVERerr,
    NOTFOUNDerr,
    TIMEOUTerr,
    AUTHerr,
    QUERYerr,
    EXISTerr
};

const objERRS = {
    objDB: {
        errCode: 503,
        errMsg: 'Database Connection Error'
    },
    objQUERY: {
        errCode: 503,
        errMsg: 'DB Query (Execution) Error'
    },
    objAPI: {
        errCode: 400,
        errMsg: 'An Invalid Request was made'
    },
    objAUTH: {
        errCode: 401,
        errMsg: 'Unauthorized request'
    },
    objVERSION: {
        errCode: 404,
        errMsg: 'An Invalid Version'
    },
    objSERVER: {
        errCode: 500,
        errMsg: 'An Internal Server Error'
    },
    objNOTFOUND: {
        errCode: 404,
        errMsg: 'Page Not Found'
    },
    objTIMEOUT: {
        errCode: 503,
        errMsg: 'DB Time Out Error'
    },
    objEXIST: {
        errCode: 409,
        errMsg: "Data is already exist in database"
    }
}

function HandleErr(err_type, res) {
    let res_code = objERRS[`obj${err_type}`].errCode;
    let res_msg = objERRS[`obj${err_type}`].errMsg;

    res.setHeader("Content-Type", "application/json");
    //header for error
    let ERROR_OBJ = {
        Status: res_code,
        Message: res_msg,
        Data: null
    }
    // res.end(JSON.stringify({'Status':res_code,'Message':res_msg,'Data':null}));
    return [res, ERROR_OBJ];
}

//function to handle DB err
function DBCONNerr(res) {
    return HandleErr('DB', res);
}

//function to handle API err
function APIerr(res) {
    return HandleErr('API', res);
}

//version error
function VERerr(res) {
    return HandleErr('VERSION', res);
}

//Internal Server error
function SERVERerr(res) {
    return HandleErr('SERVER', res);
}

function NOTFOUNDerr(res) {
    return HandleErr('NOTFOUND', res);
}

function TIMEOUTerr(res) {
    return HandleErr('TIMEOUT', res);

}

function AUTHerr(res) {
    return HandleErr('AUTH', res)
}

function QUERYerr(res) {
    return HandleErr('QUERY', res)
}

function EXISTerr(res) {
    return HandleErr('EXIST', res)
}

module.exports = ERRHANDLER;