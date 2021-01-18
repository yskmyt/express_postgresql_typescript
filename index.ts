import express from 'express'
import pg from 'pg'

const app: express.Express = express()
const port: number = 3000

app.listen(port, () => {
  console.log(`Start server port: ${port}`)
})

const pool = new pg.Pool({
  host: "localhost",
  database: "",
  user: "",
  port: 5432,
  password: ""
})

app.get("/users", (req, res) => {
  const query = "SELECT nickname FROM users"
  pool.connect()
  .then(() => pool.query(query))
  .then(results => {
    res.send({
      users: results.rows
    })
  })
  .catch(e => console.log(e))
  .finally(() => pool.end())
})