const cors = require('cors')
const expr = require('express')
const serveStatic = require('serve-static')
const mysql = require('mysql')

const expressApp = expr()

expressApp.use(serveStatic(__dirname + "/dist"));
expressApp.use(expr.json())
expressApp.use(expr.urlencoded({ extended:false }))
expressApp.use(cors())

const port = 8080
const url = `http://localhost:${port}`
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
}
const dbHandler = {
    host     : 'localhost',
    user     : 'root',
    database : 'auth_table',
    password : 'root'
}
let connection = {}
connection = mysql.createConnection(dbHandler)

function handleDisconnect() {
    console.log('db connect restarted')
    connection = mysql.createConnection(dbHandler) // Recreate the connection, since                                   // the old one cannot be reused.

    connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err)
            setTimeout(handleDisconnect, 2000) // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    })                                     // process asynchronous requests in the meantime.                                // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect()                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err                                  // server variable configures this)
        }
    })
}
handleDisconnect()

expressApp.post('/user', (req, res) => {
    res.set(headers)

    const user = [req.body.id]
    let sql = `SELECT login FROM users WHERE id=?`

    connection.query(sql, user, function(err, rows) {
        if(err) {
            console.log('Err..')
            res.status(404).json('err..')
            throw err
        }

        res.status(200).json(rows[0])
    })
    res.status(200).json('selected')
})

expressApp.post('/sign_in', (req, res) => {
    res.set(headers)

    let data = [req.body.login, req.body.pass]
    let sql = `INSERT INTO users (login, password) VALUES (?, ?)`

    connection.query(sql, data, function(err, rows) {
        console.log(err)
        // if (err) {
        //     console.log('Err..')
        //     res.status(400).json('err..')
        //     throw err
        // }

        return res.status(201).json('Data added')
    })
    return res.status(200).json('Data added')
})

expressApp.post('/log_in', (req, res) => {
    res.set(headers)

    let data = [req.body.login, req.body.pass]
    let sql = `SELECT * FROM users WHERE login=? AND password=?`

    connection.query(sql, data, function(err, rows) {
        if (err) {
            console.log('Err..')
            res.status(400).json('Err..')
            throw err
        }

        if (rows.length == 0) {
            console.error(`Unknown user ${req.body.login}..`)
            res.status(403).json({logged: false})
            return
        }
        console.log(`User '${req.body.login}' logged now`)
        res.status(200).json({...rows[0], logged: true})
    })
    res.status(200).json('All selected')
})

expressApp.post('/posts', (req, res) => {
    res.set(headers)
    console.log('body:', req.body)

    let sql = `SELECT * FROM posts`

    connection.query(sql, function(err, rows) {
        if (err) {
            console.log('Err..')
            res.status(400).json('Err..')
            throw err
        }

        if (rows.length == 0) {
            return
        }

        res.status(200).send(rows[0])
    })

    res.status(200).send('All posts')
})

expressApp.post('/edit_user', (req, res) => {
    res.set(headers)
    console.log('body:', req.body)

    let data = [req.body.newLogin, req.body.oldLogin]
    let sql = `UPDATE users SET login=? WHERE login=?`

    connection.query(sql, data, function(err, rows) {
        if (err) {
            console.log('Err..')
            res.status(400).json('Err..')
            throw err
        }

        if (rows.length == 0) {
            console.error(`Unknown user ${req.body.newLogin}..`)
            res.status(404).json(`Unknown user ${req.body.newLogin}..`)
            return
        }

        res.status(200).send()
    })
    res.status(200).json('Edited')
})

expressApp.listen(port, () => {
    console.log(`Server running at ${url}`)
})