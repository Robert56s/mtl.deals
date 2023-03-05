import { Server } from 'socket.io'

export const webSocketServer = {
    name: 'webSocketServer',
    configureServer(server) {
        const io = new Server(server.httpServer)
        
        io.on('connection', (socket) => {

            const world = () => {
                socket.emit('eventFromServer', 'Hello, World 👋')
            }
        
            setInterval(world, 2000)
        })
    }
} 