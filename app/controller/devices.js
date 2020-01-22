const Controller = require('egg').Controller;

class DevicesController extends Controller {

    async getDeviceList() {
        const {ctx} = this;
        try {
            ctx.body = await ctx.service.devices.getAllDevices(ctx.query.sort, ctx.query.search);
        } catch (err) {
            this.logger.error(err);
            return {};
        }
    }

}

module.exports = DevicesController;