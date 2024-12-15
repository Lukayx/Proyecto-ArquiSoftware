## Como genero la migracion de la db?

npx prisma migrate dev --name perrito	
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > .\prisma\migrations\fecha_perrito\migration.sql

npx prisma generate

npx prisma db pull