module.exports = {
  apps: [
    {
      name: 'lingo555-backend',
      script: './server/src/index.js',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M'
    }
  ]
};
