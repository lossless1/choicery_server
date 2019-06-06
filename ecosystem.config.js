module.exports = {
  apps : [{
    name: 'API',
    script: 'node index.ts',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '2G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      key: "~/.ssh/id_rsa",
      user : 'root',
      host : '185.69.152.78',
      ref  : 'origin/master',
      repo : 'git@github.com:lossless1/choicery_server.git',
      "ssh_options": "StrictHostKeyChecking=no",
      path : '/var/www/www-root/data/www/app.choicery.app',
      'post-deploy' : 'pm2 reload ecosystem.config.js --env production'
    }
  }
};
//vpz6YQ9V2z45
