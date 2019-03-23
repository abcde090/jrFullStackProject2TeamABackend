const Leave = require('../models/leave');
const Service = require('./service');

class LeaveService extends Service {
  // this is for users/:id/leaves/:id
    // async removeSingleUserRef(UserId, LeaveId) {
    //     return this.Model.findByIdAndUpdate(LeaveId, {
    //         $pull: {
    //             users: UserId,
    //         }
    //     });
    // }
}

module.exports = new LeaveService(Leave);