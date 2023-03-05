import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

export const start_server = () => {

    const port = 8080
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

    const server = createServer(app)
    const io = new Server(server, {
        cors: {
            origin: 'http://127.0.0.1:5173'
        }
    })

    io.on('connection', (socket) => {
        const world = () => {
            socket.emit('eventFromServer', 'Hello, World 👋')
        }
        world()
    })

    app.post('/api/ltc-callbacks', (req, res) => {
        let data = JSON.stringify(req.body);
        console.log(data)
        res.status(201);
        res.send('Data Received: ' + data);
    })

    server.listen(port, () => {
        console.log(`Server listening on port ${port}!`)
    })

}