# Demo on Vercel:
https://nodejs-mongodb-gamma.vercel.app/list.html

# Usage

- `git clone https://github.com/smohadjer/nodejs-mongodb.git`
- `cd nodejs-mongodb`
- create a `.env` file in root and add `db_username` and `db_password` for your Mongodb database. The path to database is in file `/api/db.js` and you can change it if needed.
- `npm install`
- `npm start` and then go to: http://localhost:8000/list.html
- or alternatively run `vercel dev` and then go to: http://localhost:3000/list.html

`npm start` executes `server.js` in root of project which then starts an express server. If you have Vercel cli installed, you don't need to use server.js and can simply run the project using `vercel dev` command.


