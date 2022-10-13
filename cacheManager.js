"use strict";

const redis = require("redis");
const {promisify} = require("util");
const config = require('./config')
const redisClient = redis.createClient(
    {
        url: config.redis_url
    }
);

try{
    redisClient.getAsync = promisify(redisClient.get).bind(redisClient);
    redisClient.setAsync = promisify(redisClient.set).bind(redisClient);
    redisClient.lpushAsync = promisify(redisClient.lpush).bind(redisClient);
    redisClient.lrangeAsync = promisify(redisClient.lrange).bind(redisClient);
    redisClient.llenAsync = promisify(redisClient.llen).bind(redisClient);
    redisClient.lremAsync = promisify(redisClient.lrem).bind(redisClient);
    redisClient.lsetAsync = promisify(redisClient.lset).bind(redisClient);
    redisClient.hmsetAsync = promisify(redisClient.hmset).bind(redisClient);
    redisClient.hmgetAsync = promisify(redisClient.hmget).bind(redisClient);
    redisClient.clear = promisify(redisClient.del).bind(redisClient);
}catch (e) {
    console.log("redis error", e);
}


redisClient.on("connected", function () {
    console.log("Redis is connected");
});
redisClient.on("error", function (err) {
    console.log("Redis error.", err);
});

setInterval(function() {
    console.log("Keeping alive - Node.js Performance Test with Redis");
    redisClient.set('ping', 'pong');
}, 1000 * 60 * 4);


global.cache = redisClient;
module.exports = redisClient;