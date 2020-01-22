module.exports = app => {
    const { router, controller } = app;
    router.get('/api/devices', controller.devices.getDeviceList);
};