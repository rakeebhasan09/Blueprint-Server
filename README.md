This is the readme file for Blueprint server.

Problem

```bash
Failed to connect to MongoDB Error: querySrv ECONNREFUSED _mongodb._tcp.cluster0.x65kkeb.mongodb.net at QueryReqWrap.onresolve [as oncomplete] (node:internal/dns/promises:293:17) {
    errno: undefined,
    code: 'ECONNREFUSED',
    syscall: 'querySrv',
    hostname: '_mongodb._tcp.cluster0.x65kkeb.mongodb.net'
}
```

Solve:

```bash
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
```

// 
