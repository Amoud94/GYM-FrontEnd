import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

class wsOperations {

    connectToWebSocket() {
        var socket = new SockJS("http://localhost:8080/our-webSocket");
        this.stompClient = Stomp.over(socket);
        console.log("X-Authorization : Bearer " +this.currentUser.accessToken);
        this.stompClient.connect({"X-Authorization": "Bearer " + this.currentUser.accessToken}, (frame) => {
            console.log(frame);
            this.stompClient.subscribe(
                "/topic/public-messages",
                message => {
                console.log("waiting ...");
                console.log(message);
                this.messages.push(JSON.parse(message.body).messageContent);
                console.log("ok");
                },
                {"X-Authorization": "Bearer " + this.currentUser.accessToken}
            );

            this.stompClient.subscribe(
                "/user/queue/private-messages",
                message => {
                console.log("waiting ...");
                console.log(message);
                this.messages.push(JSON.parse(message.body).messageContent);
                console.log("ok");
                },
                {"X-Authorization": "Bearer " + this.currentUser.accessToken}
            );
        });
    }

    sendMessage( AccessToken , data ) {
        console.log("Send message:" + this.message);
        if (this.stompClient && this.stompClient.connected) {
            const msg = { "messageContent": data};
            console.log(JSON.stringify(msg));
            this.stompClient.send("/ws/message", JSON.stringify(msg),{"X-Authorization": "Bearer " + AccessToken});
        }
    }

    sendPrivateMessage( AccessToken , data ) {
        if (this.stompClient && this.stompClient.connected) {
            const msg = { "messageContent": data };
            console.log(JSON.stringify(msg));
            this.stompClient.send("/ws/private-message", JSON.stringify(msg),{"X-Authorization": "Bearer " + AccessToken});
        }
    }
}

export default new wsOperations();