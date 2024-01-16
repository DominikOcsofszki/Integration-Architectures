const environment = {
    production: false,
    port: 8080,
    defaultAdminPassword: '5$c3inw%',
    db: {
      host: 'iar-mongo.inf.h-brs.de',
      port: 27017,
      username: 'erasmux',
      password: 'erasmux!',
      authSource: 'erasmux',
      name: 'erasmux'
  },
    corsOrigins: [
        'http://localhost:4200'
    ],
    env:{
        USER_WEBSITE:"biwer",
        PASSWORD:"*Safb02da42Demo$",
        BASE_URL_HRM:"https://sepp-hrm.inf.h-brs.de/symfony/web/index.php",
        DB_URL:"mongodb://localhost:27017/intArch",
        CRX_USERNAME:"guest",
        CRX_PASSWORD:"guest"}
};

exports.default = environment;

// db: {
//   host: '127.0.0.1',
//   port: 27017,
//   username: '',
//   password: '',
//   authSource: 'admin',
//   name: 'intArch'
// },