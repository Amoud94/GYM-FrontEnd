import axios from 'axios';
import authHeader from './authHeader';
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

const API_URL = 'http://localhost:8080/api/employee/';

class EmployeeService {

    // --------------------------------------------------
    // Client services routine
    // --------------------------------------------------

    addNewClient(client){
        return axios.post(API_URL + 'clients',{
            cin : client.cin,
            firstname : client.firstname,
            lastname : client.lastname,
            phone : client.phone,
            email : client.email,
            subscription : client.subscription,
            startAt : client.startAt,
            endAt : client.endAt
        }, { headers: authHeader() });
    }

    listAllClients(params){
        return axios.get(API_URL + 'clients',{params ,headers : authHeader() })
    }

    deleteClient(clientId){
        return axios.delete(API_URL + 'clients/' + clientId,{ headers : authHeader() } )
    }

    updateClient(client){
        return axios.put(API_URL + 'clients/' + client.id, {
            cin : client.cin,
            firstname : client.firstname,
            lastname : client.lastname,
            phone : client.phone,
            email : client.email,
            subscription : client.subscription,
            startAt : client.startAt,
            endAt : client.endAt
        },
        { headers : authHeader() })
    }

    // --------------------------------------------------
    // Product services routine
    // --------------------------------------------------

    addNewProduct(product){
        return axios.post(API_URL + 'products',{
            ref : product.ref,
            name : product.name,
            desc : product.desc,
            category : product.category,
            quantity : product.quantity,
            price : product.price
        }, { headers: authHeader() });
    }

    listAllProducts(params){
        return axios.get(API_URL + 'products',{params ,headers : authHeader() })
    }

    updateProduct(product){
        return axios.put(API_URL + 'products/' + product.id, {
            ref : product.ref,
            name : product.name,
            desc : product.desc,
            category : product.category,
            quantity : product.quantity,
            price : product.price
        },
        { headers : authHeader() })
    }

    deleteProduct(productId){
        return axios.delete(API_URL + 'products/' + productId,{ headers : authHeader() } )
    }

    // --------------------------------------------------
    // Machine services routine
    // --------------------------------------------------
    
    addNewMachine(machine){
        return axios.post(API_URL + 'machines',{
            ref : machine.ref,
            name : machine.name,
            category : machine.category,
            desc : machine.desc,
            doesFunction : true
        }, { headers: authHeader() });
    }

    listAllMachines(params){
        return axios.get(API_URL + 'machines',{params ,headers : authHeader() })
    }

    updateMachine(machine){
        return axios.put(API_URL + 'machines/' + machine.id, {
            ref : machine.ref,
            name : machine.name,
            category : machine.category,
            desc : machine.desc,
            doesFunction : machine.doesFunction
        },
        { headers : authHeader() })
    }

    deleteMachine(machineId){
        return axios.delete(API_URL + 'machines/' + machineId,{ headers : authHeader() } )
    }

    // --------------------------------------------------
    // Connect to server side using websocket
    // --------------------------------------------------

    connectToWebSocket( AccessToken , data ) {
        var socket = new SockJS("http://localhost:8080/webSocket");
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({"X-Authorization": "Bearer " + AccessToken}, (frame) => {
            // console.log(frame);
            this.stompClient.subscribe(
                "/topic/public-messages",
                message => {
                    console.log("waiting ...");
                    console.log(message);
                    data.push(JSON.parse(message.body).messageContent);
                    console.log("ok");
                },
                {"X-Authorization": "Bearer " + AccessToken}
            );

            this.stompClient.subscribe(
                "/user/queue/private-messages",
                message => {
                    console.log("waiting ...");
                    console.log(message);
                    data.push(JSON.parse(message.body).messageContent);
                    console.log("ok");
                },
                {"X-Authorization": "Bearer " + AccessToken}
            );
        });
    }
}
export default new EmployeeService();