const Leave = require('../models/leave');
const Service = require('./service');

class LeaveService extends Service {
}

module.exports = new LeaveService(Leave);