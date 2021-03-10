
require('dotenv').config()

const { env } = process

module.exports = {
	name: env.APP_NAME,
	baseUrl: env.APP_BASE_URL,
    port: env.PORT,
    redis_host: env.REDIS_HOST,
    redis_port: env.REDIS_PORT,
    redis_password: env.REDIS_PASSWORD,
    paystack_secret_key: env.PAYSTACK_SECRET_KEY

}
