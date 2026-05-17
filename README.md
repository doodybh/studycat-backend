# StudyCat Backend

## Run

1. `npm install`
2. Create `.env` in this folder with:
   - `MONGODB_URI=<your_mongodb_uri>`
   - `JWT_SECRET=<your_jwt_secret>`
3. Start with one of:
   - `npm run dev`
   - `npm start`

Backend listens on port `3000` in `server.js`.

## Scripts In package.json

- `npm run dev`
- `npm start`
- `npm test`

## Routes Mounted In server.js

- `/auth`
- `/cat` (with token middleware)
- `/subjects` (with token middleware)
- `/session` (with token middleware)

## Controller Endpoints

### auth.routes.js

- `POST /auth/sign-up`
- `POST /auth/sign-in`
- `GET /auth`
- `PUT /auth/debug`

### cat.routes.js

- `POST /cat`
- `GET /cat`
- `PUT /cat`
- `PUT /cat/edit`

### subject.routes.js

- `POST /subjects`
- `GET /subjects`
- `PUT /subjects/:id`
- `DELETE /subjects/:id`

### session.routes.js

- `POST /session/complete`
