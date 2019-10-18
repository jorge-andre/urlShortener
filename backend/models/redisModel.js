const HOST = '127.0.0.1'
const REDIS_PORT = 6379
const shortId = require('shortid');
const redis = require("redis");
const redisClient = redis.createClient(REDIS_PORT, HOST);

redisClient.on('connect', function() {
    console.log('Redis client connected with success');
});

redisClient.on('ready', () => {
    console.log('Ready to work with Redis Server');
});

redisClient.on('error', function() {
    console.log('Error connecting to Redis: ' + err);
});

function storeUrl(url) {
    return new Promise((resolve, reject) => {
        redisClient.get(url, (err, reply) => {
            if (err) {
                return reject('Error occured during database operation');
            }
            if (reply) {
                resolve(reply);
            } else {
                let id = shortId.generate();
                redisClient.set(id, url);
                redisClient.set(url, id);
                resolve(id);
            }
        });
    });
}

function findUrl(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, reply) => {
            if (err) {
                return reject('Error occured during database operation');
            }

            if (reply == null) {
                resolve(null);
            } else {
                resolve(reply);
            }
        });
    });
}

module.exports = {
    storeUrl = storeUrl,
    findUrl = findUrl
};