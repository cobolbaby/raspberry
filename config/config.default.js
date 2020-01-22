// exports.keys = <此处改为你自己的 Cookie 安全字符串>;
exports.keys = 'ssdsdsdsd';

exports.redis = {
    // client: {
    //     cluster: true,
    //     nodes: [{
    //         host: '10.191.7.1',
    //         port: '7505',
    //         password: 'itcredis',
    //         db: 0,
    //     }, {
    //         host: '10.191.7.1',
    //         port: '7506',
    //         password: 'itcredis',
    //         db: 0,
    //     }, {
    //         host: '10.191.7.2',
    //         port: '7501',
    //         password: 'itcredis',
    //         db: 0,
    //     }, {
    //         host: '10.191.7.2',
    //         port: '7502',
    //         password: 'itcredis',
    //         db: 0,
    //     }, {
    //         host: '10.191.7.3',
    //         port: '7503',
    //         password: 'itcredis',
    //         db: 0,
    //     }, {
    //         host: '10.191.7.3',
    //         port: '7504',
    //         password: 'itcredis',
    //         db: 0,
    //     }],
    //     redisOptions: {
    //         keyPrefix: 'ITC:RPI:',
    //     },
    //     // keyPrefix: 'ITC:RPI:',
    //     slotsRefreshTimeout: 2000,
    // },
    client: {
        port: 6379, // Redis port
        host: '10.190.81.17', // Redis host
        password: '',
        db: 0,
        keyPrefix: 'ITC:RPI:',
    },
};

exports.services = {
    graph: 'http://10.99.169.142:8000'
}