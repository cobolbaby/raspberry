// 用于对象数组依据某个键值排序
module.exports.compareByObjectKey = (key) => {
    return (a, b) => {
        if (typeof (a[key]) === 'string') {
            return (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
        }
        return a[key] - b[key]; // 升序
    }
}