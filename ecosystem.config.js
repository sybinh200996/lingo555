module.exports = {
  apps: [
    {
      name: 'lingo555-backend',
      script: './server/src/index.js',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M'
    }
  ]
};
