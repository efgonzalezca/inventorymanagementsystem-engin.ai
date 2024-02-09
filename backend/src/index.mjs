import { Server } from './models/Server.mjs';

try {
  new Server().listen();
} catch(e) {
  console.log(e);
  process.exit(1);
}