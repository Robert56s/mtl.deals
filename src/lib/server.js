import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { SECRET_CALLBACK_KEY } from '$env/static/private'

export const start_server = () => {

    const port = 8080
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

    const server = createServer(app)
    const io = new Server(server, {
        cors: {
            origin: '*' //a changer en prod
        }
    })

    io.on('connection', function(socket) {
        // Use socket to communicate with this particular client only, sending it it's own id
        socket.emit('eventFromServer', { message: 'Welcome!', id: socket.id });

    });

    function sendTime() {
        console.log('time send')
        io.emit('time', { time: new Date().toJSON() });
    }

    setTimeout(sendTime, 10000);

    app.post('/api/ltc-callbacks', (req, res) => {
        let data = JSON.parse(JSON.stringify(req.body));
        console.log(data)
        res.setHeader('content-type', 'text/plain');

        if (data.data?.key !== SECRET_CALLBACK_KEY) {
            res.status(401);
            res.send('Unauthorized')
            return
        }

        const body = {
            user_id: data.data?.user_id,
            amount: data.value,
            th: data.input_transaction_hash,
            conf: data.confirmations
        }

        if (data.confirmations === 0) {
            res.status(201);
            res.send('0 conf Data Received: ' + data);
            io.emit('conf', body)
            return

        } else if (data.confirmations === 1) {
            res.status(200);
            res.send('1 conf Data Received: ' + data)
            io.emit('conf', body)
            return

        } else if (data.confirmations > 1) {
            res.status(200);
            res.send('*ok*')
            console.log('we good')
            return
        }

    })

    server.listen(port, () => {
        console.log(`Server listening on port ${port}!`)
    })

}