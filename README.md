# on-repeat
A fun tool for people who love music and statistics

# Database migrations
Use this command to generate a new migration file: `npm run migrate create user-table -- --config-file=pgmigrate.json`

Use this command to run the migrations: `DATABASE_URL=postgres://postgres:postgres@localhost/postgres node_modules/node-pg-migrate/bin/node-pg-migrate up --config-file pgmigrate.json`

# Crypto key
Generate a 32 byte random hex encoded string (for instance here: https://seanwasere.com/generate-random-hex/)