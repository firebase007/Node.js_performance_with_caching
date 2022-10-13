
require('dotenv').config()

const { env } = process

module.exports = {
	name: env.APP_NAME,
	baseUrl: env.APP_BASE_URL,
    port: env.PORT,
    redis_url: env.REDIS_URL,
    paystack_secret_key: env.PAYSTACK_SECRET_KEY

}
