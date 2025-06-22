const concurrently = require('concurrently');
const path = require('path');

// Define the commands to run
const commands = [
  {
    command: 'ng serve',
    name: 'angular',
    prefixColor: 'blue',
    cwd: process.cwd()
  },
  {
    command: 'json-server --watch db.json --port 3000',
    name: 'api',
    prefixColor: 'green',
    cwd: process.cwd()
  }
];

console.log('🚀 Starting UK-business-portal ...');
console.log('📱 Angular App: http://localhost:4200');
console.log('🔌 API Server: http://localhost:3000');
console.log('');

// Run both servers concurrently
concurrently(commands, {
  prefix: 'name',
  killOthers: ['failure', 'success'],
  restartTries: 3,
}).then(
  () => {
    console.log('✅ All servers stopped successfully');
  },
  (error) => {
    console.error('❌ Error running servers:', error);
    process.exit(1);
  }
);
