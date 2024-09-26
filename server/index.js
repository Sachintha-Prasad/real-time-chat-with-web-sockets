import { WebSocketServer } from "ws"

const server = new WebSocketServer({ port: "8000" })

server.on("connection", (socket) => {
    console.log("client connected")

    socket.on("message", (message) => {
        console.log(message)
        socket.send(`${message}`)
    })

    // server.clients.forEach((client) => {
    //     if (client.readyState === WebSocketServer.OPEN) client.send(message)
    // })

    socket.on("close", () => {
        console.log("Client disconnected")
    })
})
