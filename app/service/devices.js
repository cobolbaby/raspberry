const Service = require('egg').Service;

class DevicesService extends Service {

    async loadAllDevices() {
        try {
            if (!this.app.redis) {
                throw new Error('No configure for egg-redis plugin.');
            }

            const [devices, tags] = await Promise.all([
                this.app.redis.hgetall('device'),
                this.app.redis.hgetall('tags'),
            ])

            let allDevices = {};
            Object.keys(devices).forEach((id) => {
                try {
                    let device = JSON.parse(devices[id]);
                    allDevices[id] = this.getDeviceSummary(device);
                    this.ctx.logger.info(`Load device ${id} ${device.os.hostname}`);
                } catch (error) {
                    throw error;
                }
            });
            // 全局变量存储
            return this.app.cache.devices = allDevices;
        } catch (err) {
            this.logger.error(err)
        }
    }

    getAllDevices(sortKey = null, searchText = '') {
        let result = []
        let all = Object.values(this.app.cache.devices)
        for (let one of all) {
            if (searchText === '' || one.content.indexOf(searchText.toLowerCase()) >= 0) {
                result.push(one.summary)
                continue
            }
        }
        result.sort(this.ctx.helper.compareByObjectKey(sortKey))
        return {
            total: all.length,
            list: result
        }
    };

    async saveDeviceById(id, deviceInfo) {
        try {
            // 查找到当前的记录信息
            
            deviceInfo = {}
            deviceInfo = Object.assign(deviceInfo, {
                lastupdate: Date.now(),
            });
            await this.app.redis.hset('device', id, JSON.stringify(deviceInfo));
            // 更新全局变量
            this.app.cache.devices[id] = getDeviceSummary(deviceInfo);
        } catch (error) {
            throw error;
        }
    };

    getDeviceSummary(info) {
        let summary = {
            id: info.client_id,
            hostname: info.os.hostname,
            osversion: info.os.version,
            osbuild: info.os.buildnumber,
            resolution: info.os.resolution || '',
            ip: info.os.ip,
            uptime: info.os.uptime,
            opentime: info.os.opentime,
            monitor: info.hardware.monitor || '',
        };
        let content = '';

        return {
            summary,
            content
        }
    };

}

module.exports = DevicesService;