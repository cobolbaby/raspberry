const Subscription = require('egg').Subscription;

class CheckCpuTemp extends Subscription {
    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
        return {
            interval: '1m', // 1 分钟间隔
            type: 'all', // 指定所有的 worker 都需要执行
        };
    }

    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe() {
        let devPerfs = {}
        try {
            const graphUrl = `${this.config.services.graph}/render/?format=json&target=rpi.client.*.cpu.temp&from=-5mins`
            const response = await this.ctx.curl(graphUrl, {
                dataType: 'json'
            })
            const perfs = response.data

            for (let one of perfs) {
                let max = 0
                for (let p of one.datapoints) {
                    if (p[0] && p[0] > max) max = p[0]
                }
                if (max != 0) devPerfs[one.target] = max
            }

            for (let one of Object.values(this.app.cache.devices)) {
                let target = `rpi.client.${one.id.replace(/\:/g, '')}.cpu.temp`
                // target = `rpi.client.b827eb8ae9d7.cpu.temp`
                if (devPerfs.hasOwnProperty(target)) {
                    this.app.cache.devices[one.id] = Object.assign(this.app.cache.devices[one.id], {
                        cputemperature: devPerfs[target],
                        lostheartbeat: false
                    })
                } else {
                    this.app.cache.devices[one.id] = {};
                    this.app.cache.devices[one.id] = Object.assign(this.app.cache.devices[one.id], {
                        lostheartbeat: true
                    });
                }
            }
            this.logger.info('Refresh device temperature, heartbeat.')
            // bus.emitter.emit('syncweb', {
            //     key: 'device',
            //     body: {} // just to refresh list
            // })

        } catch (err) {
            this.logger.error(err);
        }
    }
}

module.exports = CheckCpuTemp;