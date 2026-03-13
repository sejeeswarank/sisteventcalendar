import * as dotenv from 'dotenv';
import * as path from 'node:path';

// Load env from root .env file
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
