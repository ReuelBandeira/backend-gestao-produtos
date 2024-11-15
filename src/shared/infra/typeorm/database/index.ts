import { createConnection } from 'typeorm';

createConnection().then((connection) => {
  connection.manager.query(
    "SET @@global.time_zone = '-04:00', @@session.time_zone = '-04:00';",
  );
});
