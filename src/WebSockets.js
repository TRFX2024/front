
class WebSocketClient {
    constructor() {
        this.socket = new WebSocket('wss://teraflex.cl:9000/ws/porticos/');

        this.socket.onopen = () => {
            console.log('Conexión WebSocket establecida.');
        };
        
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('Mensaje recibido del servidor:', message);
        };
        
        this.socket.onclose = () => {
            console.log('Conexión WebSocket cerrada.');
        };
    }

    sendMessage(message) {
        this.socket.send(JSON.stringify({ message: message }));
    }

    closeConnection() {
        this.socket.close();
    }
}

export default WebSocketClient;