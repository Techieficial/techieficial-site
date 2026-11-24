#!/usr/bin/env node
/** Stand-in for the CRM webhook during tests. POST stores the lead, GET /received lists them. */
import { createServer } from "node:http";

const port = Number(process.env.MOCK_WEBHOOK_PORT ?? 3999);
const received = [];

createServer((req, res) => {
  if (req.method === "POST") {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      // _path records which webhook was called (/hook for forms, /callme for Demo Lab "call me").
      try {
        received.push({ ...JSON.parse(body), _path: req.url });
      } catch {
        received.push({ raw: body, _path: req.url });
      }
      res.writeHead(200, { "Content-Type": "application/json" }).end('{"ok":true}');
    });
    return;
  }
  if (req.url === "/received") {
    res.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify(received));
    return;
  }
  res.writeHead(200).end("ok");
}).listen(port, "127.0.0.1", () => console.log(`mock webhook on ${port}`));
