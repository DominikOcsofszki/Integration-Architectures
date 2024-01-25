const environment = {
    production: true,
    // port: 8080,
    defaultAdminPassword: 'c3uz#3zd',
    db: {
        host: 'iar-mongo.inf.h-brs.de',
        port: 27017,
        username: 'erasmux',
        password: 'erasmux!',
        authSource: 'erasmux',
        name: 'erasmux'
    },
    corsOrigins: [
        // 'http://localhost:4200',
        'http://iar-frontend.inf.h-brs.de/erasmux'
    ],
    env: {
        USER_WEBSITE: "biwer",
        PASSWORD: "*Safb02da42Demo$",
        BASE_URL_HRM: "https://sepp-hrm.inf.h-brs.de/symfony/web/index.php",
        DB_URL: "mongodb://localhost:27017/intArch",
        CRX_USERNAME: "guest",
        CRX_PASSWORD: "guest"
    }
};

exports.default = environment;
