/**
 * Database Setup Script
 * 
 * This script helps set up the database by running the schema and seed files.
 * It requires the 'pg' package and proper environment variables.
 */

require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Create a connection pool
const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

async function setupDatabase() {
  try {
    console.log('Connecting to PostgreSQL...');
    const client = await pool.connect();
    
    console.log('Connected successfully!');
    
    // Read and execute schema.sql
    console.log('Creating database schema...');
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await client.query(schemaSql);
    
    console.log('Schema created successfully!');
    
    // Ask if user wants to run seed data
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    readline.question('Do you want to load seed data? (y/n): ', async (answer) => {
      if (answer.toLowerCase() === 'y') {
        // Read and execute seed.sql
        console.log('Loading seed data...');
        const seedPath = path.join(__dirname, 'seed.sql');
        const seedSql = fs.readFileSync(seedPath, 'utf8');
        await client.query(seedSql);
        console.log('Seed data loaded successfully!');
      }
      
      client.release();
      pool.end();
      readline.close();
      console.log('Database setup complete!');
    });
    
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();
