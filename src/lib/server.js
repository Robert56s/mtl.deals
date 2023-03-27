import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { SECRET_CALLBACK_KEY } from '$env/static/private'
import { getServiceSupabase } from '$lib/servicerole';

export const start_server = () => {

    const supabase = getServiceSupabase()

    const updateLtc = async (body) => {


        let { data: ltc } = await supabase
            .from('profiles')
            .select('ltc_amount')
            .eq('id', body.user_id)

        ltc = ltc[0].ltc_amount

        const { data: profiles } = await supabase
            .from('profiles')
            .update({ ltc_amount: (ltc + body.amount) })
            .eq('id', body.user_id)

        const { data: walletsActivity } = await supabase
            .from('wallets_activity')
            .insert([
            { created: new Date(), user_id: body.user_id, ltc_amount: body.amount, type: "deposit", tx: body.th, destination: "" },
            ])
    }

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

        socket.on('join-room', (room) => {
            socket.join(room);
            console.log(`Joined this room: ${room}`)
        })

        socket.on('send-message', (body, room) => {
            io.to(room).emit("receive-message", body)
            console.log(`emit to this ${room}`)
        })

    });

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
            res.status(200);
            res.send('0 conf Data Received: ' + data);
            io.emit('conf', body)
            return

        } else if (data.confirmations === 1) {
            updateLtc(body)
            res.status(200);
            res.send('*ok*')
            io.emit('conf', body)
            console.log('1 conf, we good')
            return

        }
    })

    server.listen(port, () => {
        console.log(`Server listening on port ${port}!`)
    })

}