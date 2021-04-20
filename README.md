memory-stream
=============

Node.js streams implementation for buffered memory writes.

# Usage

```javascript
const fs = require('fs');
const MemoryStream = require('memory-stream').default;

const rs = fs.createReadStream('source.txt');
const ws = new MemoryStream();

ws.on('finish', function() {
  console.log(ws.toString());
});

rs.pipe(ws);
```
