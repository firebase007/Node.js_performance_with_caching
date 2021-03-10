"use strict";

const Joi = require("@hapi/joi");
const {
    sendErrorResponse
  } = require("../../helpers");

exports.resolveAccount = async (req,res,next) =>{

    let schema = {
        bankName: Joi.required(),
        accountNumber: Joi.required()
    };

    const result = Joi.validate(req.body, schema,{
        allowUnknown: true,
        abortEarly:true
    });

    if(result.error)
        return sendErrorResponse(res, result.error.details[0].message.replace(/['"]/g, ''), 422);
    return next();
};