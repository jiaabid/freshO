const redis = require("redis")
const redisPort = process.env.PORT || 6379
module.exports = redis.createClient(redisPort)