const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

const projectRoot = process.cwd();
const envPath = path.join(projectRoot, '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

const config = {
  port: Number(process.env.PORT) || 5000,
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-me',
  tokenExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
  clientOrigin: process.env.CLIENT_URL,
  dataDir: path.join(projectRoot, 'data'),
  usersFile: path.join(projectRoot, 'data', 'users.json'),
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: Number(process.env.DB_PORT) || 5432,
  dbName: process.env.DB_NAME || 'unily-database',
  dbUser: process.env.DB_USER || 'postgres',
  dbPassword: process.env.DB_PASSWORD || '2454',
};

module.exports = config;


