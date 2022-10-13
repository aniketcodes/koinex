let successResponse = ( data ) => {
    let response = {
      "status": "OK",
      "message": data.message || 'Success',
      "code": data.code || 200,
      "data": data && data.data
    }
    return response
  }
  
  let errorResponse = ( error ) => {
    console.log( "error", error )
    let response = {
      "status": error.status || "Internal Server Error",
      "message": error.error || 'Opps! Something went wrong',
      "code": error.code || 500
    }
    return response
  }
  
  module.exports = {
    errorResponse,
    successResponse
  }