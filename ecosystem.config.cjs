// PM2 конфиг для запуска PinPiece (Next.js) на VPS.
// Запуск:  pm2 start ecosystem.config.cjs
// Обновление после git pull:  pnpm install && pnpm build && pm2 reload pinpiece
module.exports = {
  apps: [
    {
      name: 'pinpiece',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -H 0.0.0.0 -p 3001',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        // Значения ниже берутся из .env (см. .env.example).
        // pm2 автоматически не читает .env — переменные подставляются
        // через `pm2 start ... --update-env` после `set -a; . ./.env; set +a`.
      },
    },
  ],
}
