// Fixed sample captures for the browser-only practice lab.
export const flows = {
  dns: {name:'DNS resolver',destination:'10.10.0.53',protocol:'DNS',path:'M130 150 Q240 15 390 50',x:390,y:50},
  web: {name:'Web server',destination:'198.51.100.20',protocol:'HTTPS',path:'M135 150 L385 150',x:385,y:150},
  external: {name:'External host',destination:'203.0.113.42',protocol:'TLS :8443',path:'M130 150 Q240 285 390 250',x:390,y:250}
};
export const timingPackets = [
  [0,'dns',74,'Query: assets.example.test. A routine hostname lookup.'],
  [3,'web',1240,'An HTTPS response fragment during a page load.'],
  [5,'external',96,'Outbound TLS connection on port 8443. Encrypted payload is not available.'],
  [10,'web',812,'Another response fragment. Variable sizes and irregular timing.'],
  [25,'external',96,'Same destination, port and size. Twenty seconds after the previous connection.'],
  [30,'dns',81,'Query: api.example.test. A second routine lookup.'],
  [45,'external',96,'Third connection with the same size and another twenty-second interval.'],
  [49,'web',1460,'A larger HTTPS response fragment, forty-nine seconds into the capture.'],
  [65,'external',96,'Fourth 96-byte connection. The twenty-second interval repeats again.'],
  [70,'dns',76,'Query: static.example.test. No unusual query length in this scenario.'],
  [75,'web',602,'Final HTTPS response fragment.']
].map(([time,flow,size,detail],id)=>({id,time,flow,size,detail}));

export const dnsPackets = [
  [0,'dns',74,'Query: assets.example.test. A short hostname lookup.'],
  [4,'web',1240,'An HTTPS response fragment from the web server.'],
  [9,'external',620,'A TLS response. Its timing and size differ from the later response.'],
  [12,'dns',188,'Query: a81f02c9b7d04e6f338a9d42.c917fe0ad4b73c865e24a1bf.telemetry.example.test. Long, encoded-looking labels.'],
  [22,'dns',192,'Another long query to telemetry.example.test, with a different encoded-looking subdomain.'],
  [32,'dns',190,'A third long subdomain query to the same parent domain. Compare its size with the first lookup.'],
  [43,'web',900,'An HTTPS response fragment during ordinary web traffic.'],
  [49,'dns',196,'A fourth long query to telemetry.example.test. Repeated encoded-looking labels warrant a closer look.'],
  [59,'external',432,'A second TLS response, fifty seconds after the previous one, with a different size.'],
  [65,'dns',194,'A fifth long query to the same parent domain. Inspect resolver and process logs for context.'],
  [75,'web',602,'Final HTTPS response fragment.']
].map(([time,flow,size,detail],id)=>({id,time,flow,size,detail}));

