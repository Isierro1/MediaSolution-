module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "231036",
    DB: "mediasolution",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };