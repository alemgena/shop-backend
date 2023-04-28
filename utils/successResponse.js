class SuccessResponse {
    constructor(code = 200, message = "", data = {}, metaData = {}) {
      this.success = true;
      this.code = code;
      this.message = message;
      this.data = data;
      this.metaData = metaData;
    }
  }
  
  module.exports = SuccessResponse;
  