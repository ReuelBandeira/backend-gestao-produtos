module.exports = {
  apps : [{
    name: "app",
    script: "src/shared/infra/http/server.ts",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
