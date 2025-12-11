  const config = require('./config');
  const { Client } = require('pg');

  (async () => {
    const client = new Client({
      host: config.dbHost,
      port: config.dbPort,
      database: config.dbName,
      user: config.dbUser,
      password: config.dbPassword,
    });

    try {
      await client.connect();
      console.log('Connected to database:', config.dbName, 'on', `${config.dbHost}:${config.dbPort}`);
      const res = await client.query("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname='public' ORDER BY tablename;");
      console.log('Public tables:', res.rows.map(r => r.tablename));

      const usersCheck = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name='comments';");
      if (usersCheck.rows.length) {
        console.log('Users table columns:');
        console.table(usersCheck.rows);
      } else {
        console.log('No `users` table found in database.');
      }

      await client.end();
      process.exit(0);
    } catch (err) {
      console.error('Test connection error:');
      console.error(err.message || err);
      process.exit(1);
    }
  })();
