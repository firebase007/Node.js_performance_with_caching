"use strict";

const paystackRepository = require("../paystack/PaystackRepository");

exports.fetchAllBanks = async () => {
    // incase we are calling this endpoint a second time, we do not need to make a new API call 
    let banks = await cache.getAsync("bank-list");
    console.log("Data from cache", banks);
    if(banks)
        return {data: JSON.parse(banks)};

  const {error, data} = await paystackRepository.banks();
  if(error) return {error};
  // Store the bank list in a cache, since it rarely changes
  let cacheResponse = await cache.setAsync("bank-list", JSON.stringify(data));
  console.log("Cache", cacheResponse);
  return {
      data
  }
};

exports.resolveAccount = async (bankName, accountNumber) => {
    // Relying on the cached data is faster, as it rarely changes
let banks = JSON.parse(await cache.getAsync("bank-list"));
    
console.log(banks, 'banks')
    // Incase the data is not stored in the cache, make an API call to get bank lists 
    if(!banks){
        const {error, data} = await paystackRepository.banks();
        if(error)return {error};
        banks = data;
    }

    const bank = banks.find(bank => {
        return bank.name == bankName
    })
    if(!bank)
        return {error: "Bank Not Found"};

    console.log(bank.code)
    const {error, data} =  await paystackRepository.resolveAccountNumber(bank.code, accountNumber);
    if(error)return {error };
    return {
        data: {
            accountNumber,
            bankName,
            accountName: data.account_name
        }
    }
};

exports.resolveAccountPerfTest = async (bankName, accountNumber) => {
    // if there were no cache mechanism in place we needed to go fetch the bank lists compulsorily at every API call
    let banks;
    if(bankName && accountNumber) {
        const {error, data} = await paystackRepository.banks();
        if(error)return {error};
        banks = data;

    }
    
    const bank = banks.find(bank => {
        return bank.name == bankName
    })
    if(!bank)
        return {error: "Bank Not Found"};

    const {error, data} =  await paystackRepository.resolveAccountNumber(bank.code, accountNumber);
    if(error)return {error };
    return {
        data: {
            accountNumber,
            bankName,
            accountName: data.account_name
        }
    }
};