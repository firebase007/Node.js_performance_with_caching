"use strict";

const bankService = require("./BankService");

const {
    sendErrorResponse,
    sendResponse
  } = require("../../helpers");

exports.fetchAllBanks = async (req, res, next) => {
    const {error, data} = await bankService.fetchAllBanks();
    if(error)
        return sendErrorResponse({res, message: error});

    return sendResponse({res, responseBody: data});
};

exports.resolveAccountNumber = async (req, res) => {
    const {bankName, accountNumber} = req.body;
    const {error, data} = await bankService.resolveAccount(bankName, accountNumber);
    if(error)
        return sendErrorResponse({res, message: error});

    return sendResponse({res, responseBody: data});
};

exports.resolveAccountPerfTest = async (req, res) => {
    const {bankName, accountNumber} = req.body;
    const {error, data} = await bankService.resolveAccountPerfTest(bankName, accountNumber);
    if(error)
        return sendErrorResponse({res, message: error});

    return sendResponse({res, responseBody: data});
};

