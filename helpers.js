module.exports = {
	sendResponse({
		res, statusCode = 200, message = 'success', responseBody,
	}) {
		res.status(statusCode).send({
			data: responseBody,
			status: true,
			message,
		})
	},

	sendErrorResponse({
		res, statusCode = 500, message = 'error', responseBody,
	}) {
		res.status(statusCode).send({
			data: responseBody,
			status: false,
			message,
		})
    },

    handleAxiosError({ error }) {
        try {
          if (error && error.response) {
            return {
              status: error.response.status,
              statusText: error.response.statusText,
              message: error.response.data.error,
              url: error.response.config.url,
              params: error.response.config.params,
              data: error.response.config.data,
              headers: error.response.headers,
            };
          }
          return {
            status: 500,
            statusText: error.message || "Unknown Error",
            message: error.message || "Oops, An Error Occurred",
            stack: error.stack,
          };
        } catch (ex) {
          return {
            status: 500,
            statusText: "Unknown Error",
            message: "Oops, An Error Occurred",
            error: ex.message,
            stack: ex.stack,
          };
        }
    },

}