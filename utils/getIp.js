var os = require('os');
module.exports = async () => {
    var ifaces = os.networkInterfaces();
    var ips = [];
    Object.keys(ifaces).forEach(function(ifname) {
        var alias = 0;
        ifaces[ifname].forEach(function(iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            return;
        }
        if (alias >= 1) {
            ips.push(iface.address);
        } else {
            ips.push(iface.address);
        }
        ++alias;
        });
    });
    return ips[0];
};
