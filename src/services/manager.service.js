import axios from 'axios';
import authHeader from './authHeader';
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

const API_URL = 'http://localhost:8080/api/manager/';

class ManagerService {

    addNewEmployee(employee){
        return axios.post(API_URL + 'employees',{
            cin : employee.cin,
            firstname : employee.firstname,
            lastname : employee.lastname,
            phone : employee.phone,
            position : employee.position,
            speciality : employee.speciality,
            username : employee.username,
            email : employee.email,
            password : employee.password,
            roles : []
        }, { headers: authHeader() });
    }

    listAllEmployees(params){
        return axios.get(API_URL + 'employees',{params ,headers : authHeader() })
    }

    deleteEmployee(employeeId){
        return axios.delete(API_URL + 'employees/' + employeeId,{ headers : authHeader() } )
    }

    updateEmployee(employee){
        return axios.put(API_URL + 'employees/' + employee.id, {
            cin : employee.cin,
            firstname : employee.firstname,
            lastname : employee.lastname,
            phone : employee.phone,
            position : employee.position,
            speciality : employee.speciality,
            username : employee.username,
            email : employee.email
        },
        { headers : authHeader() })

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
export default new ManagerService();