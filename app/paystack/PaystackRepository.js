const axios = require("axios");
const config = require('../../config')
const {handleAxiosError} = require("../../helpers");
const _axios = axios.create({
    baseURL: "https://api.paystack.co",
    headers: {
        Authorization: `Bearer ${config.paystack_secret_key}`
    }
});


exports.banks = async () => {
    try {
        return {
            data: (await _axios
                .get(`bank`)).data.data
        };
    } catch (e) {
        console.log('An Error Occurred', e, handleAxiosError(e));
        return {error: e.message};
    }
};


exports.resolveAccountNumber = async (bankCode, accountNumber) => {
    try {
        return {
            data: (await _axios
                .get(`bank/resolve`, {
                    params: {
                        bank_code: bankCode,
                        account_number: accountNumber
                    }
                })).data.data
        };
    } catch (e) {
        console.log('An Error Occurred', e, handleAxiosError(e));
        return {error: e.message};
    }
};

//https://paystack.com/docs/identity-verification/resolve-account-number/