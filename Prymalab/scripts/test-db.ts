import { Client } from 'pg';

async function testConnection(region: string) {
  const host = `aws-0-${region}.pooler.supabase.com`;
  console.log(`Trying ${host}...`);
  const client = new Client({
    host,
    port: 6543,
    database: 'postgres',
    user: 'postgres.esiqaqzmgtfyzfhrfgna',
    password: 'Ahunglua68@',
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000
  });

  try {
    await client.connect();
    console.log(`Connected successfully to ${region}!`);
    await client.end();
    return true;
  } catch (error: any) {
    console.log(`Failed to connect to ${region}: ${error.message}`);
    return false;
  }
}

async function main() {
  const regions = [
    'ap-southeast-1', // Singapore
    'ap-southeast-2', // Sydney
    'ap-northeast-1', // Tokyo
    'ap-northeast-2', // Seoul
    'us-west-1',
    'us-east-1',
    'eu-central-1',
    'eu-west-1',
    'eu-west-2',
    'eu-west-3',
  ];

  for (const region of regions) {
    if (await testConnection(region)) {
      console.log(`SUCCESS_REGION=${region}`);
      break;
    }
  }
}

main();
