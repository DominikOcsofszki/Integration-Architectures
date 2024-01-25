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
            // script: 'src/app.js',
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
            // 'post-deploy': 'cd backend && pm2 list'
            'post-deploy': 'cd backend && npm install --production'
            +   ' echo $pm_exec_path'
                + ' && pm2 startOrRestart ecosystem.config.js --env=production'
                + ' && pm2 save && cat /home/erasmux/.pm2/dump.pm2'
            + ' && pm2 list'
            // + ' && pm2 stop default && cat /home/erasmux/.pm2/dump.pm2'
            // + ' && pm2 list && pm2 list' 
            // + ' && cat /home/erasmux/.pm2/dump.pm2' 
        }
    }
};





//////////////////////==========our==========
// // Target server hostname or IP address
// const TARGET_SERVER_HOST = process.env.BACKEND_SERVER_HOST ? process.env.BACKEND_SERVER_HOST.trim() : '';
// // Target server username
// const TARGET_SERVER_USER = process.env.TARGET_SERVER_USER ? process.env.TARGET_SERVER_USER.trim() : '';
// // Target server application path
// const TARGET_SERVER_APP_PATH = `/home/${TARGET_SERVER_USER}/app`;
// // Your repository
// const REPO = process.env.CI_REPOSITORY_URL;
//
// module.exports = {
//     /**
//      * Application configuration section
//      * http://pm2.keymetrics.io/docs/usage/application-declaration/
//      */
//     apps: [
//         {
//             name: 'app',
//             script: 'dist/app.js',
//             env: {
//                 NODE_ENV: 'development'
//             },
//             env_production: {
//                 NODE_ENV: 'production',
//                 // PORT: 8080
//             }
//         }
//     ],
//
//     /**
//      * Deployment section
//      * http://pm2.keymetrics.io/docs/usage/deployment/
//      */
//
//     //old
//     //    deploy: {
//     //     production: {
//     //         user: TARGET_SERVER_USER,
//     //         host: TARGET_SERVER_HOST,
//     //         ref: 'origin/main',
//     //         repo: REPO,
//     //         ssh_options: 'StrictHostKeyChecking=no',
//     //         path: TARGET_SERVER_APP_PATH,
//     //         'post-deploy': 'cd backend && npm install --production'
//     //             + ' && pm2 startOrRestart ecosystem.config.js --env=production'
//     //             + ' && pm2 save'
//     //     }
//     // }
//     
//     deploy: {
//         production: {
//             user: TARGET_SERVER_USER,
//             host: TARGET_SERVER_HOST,
//             ref: 'origin/main',
//             repo: REPO,
//             ssh_options: 'StrictHostKeyChecking=no',
//             path: TARGET_SERVER_APP_PATH,
//             'post-deploy': 'cd backend && npm install'
//                 + ' && tsc'
//                 + ' && pm2 startOrRestart ecosystem.config.js --env=production'
//                 + ' && pm2 save'
//         }
//     }
// };
