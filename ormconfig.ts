export default {
   "type": "mysql",
   "host": process.env.TYPEORM_HOST,
   "port": process.env.TYPEORM_PORT,
   "username": process.env.TYPEORM_USERNAME,
   "password": process.env.TYPEORM_PASSWORD,
   "database": process.env.TYPEORM_DATABASE,
   "entities": [
      "src/entities/*.ts"
   ],
   "migrations": [
      "src/database/migrations/*.ts"
   ],
   "cli": {
      "migrationsDir": "src/database/migrations",
   }
}