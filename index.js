const WebSocket = require('ws');
const ntpClient = require('ntp-client');

const ntpserver = "pool.ntp.org";
const ntpport = 123;
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
  setInterval(() => {
    ntpClient.getNetworkTime(ntpserver, ntpport, function(err, date) {
      if(err) {
        console.error(err);
        return;
      }

      ws.send(date.toString());
    });
  }, 50);
});
