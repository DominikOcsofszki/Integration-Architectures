// Target server hostname or IP address
const TARGET_SERVER_HOST = process.env.BACKEND_SERVER_HOST ? process.env.BACKEND_SERVER_HOST.trim() : '';
// Target server username
const TARGET_SERVER_USER = process.env.TARGET_SERVER_USER ? process.env.TARGET_SERVER_USER.trim() : '';
// Target server application path
const TARGET_SERVER_APP_PATH = `/home/${TARGET_SERVER_USER}/app`;
// Your repository
const REPO = process.env.CI_REPOSITORY_URL;

module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
 
    apps: [
        {
            name: 'app',
            script: './dist/app.js',
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production',
                PORT: 8080
            }
        }
    ],
    //   location /erasmux/  {
    //     proxy_set_header    Host $host:$server_port;
    //     proxy_set_header    X-Forwarded-Proto $scheme;
    //     proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
    //     proxy_set_header    X-Real-IP $remote_addr;
    //
    //     proxy_pass http://172.16.3.10:8080/;
    //     proxy_redirect http://172.16.3.10:8080/ http://iar-backend.inf.h-brs.de/;
    //
    //     proxy_ssl_protocols TLSv1.2;
    //     proxy_request_buffering off;
    // }


    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {
        production: {
            user: TARGET_SERVER_USER,
            host: TARGET_SERVER_HOST,
            ref: 'origin/main',
            repo: REPO,
            ssh_options: 'StrictHostKeyChecking=no',
            path: TARGET_SERVER_APP_PATH,
            'post-deploy': 'cd backend '
                + ' && npm install ' // had to add tsc to project, since tsc not installed on ubuntu/pm2
                + ' && npx tsc '        // or add npm install tsc here
                + ' && pm2 startOrRestart ecosystem.config.js --env=production' // even if no dist exist -> No error msg...
        }
    }
};

