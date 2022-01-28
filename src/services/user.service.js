import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getCoachBoard() {
    return axios.get(API_URL + 'coach', { headers: authHeader() });
  }

  getEmployeeBoard() {
    return axios.get(API_URL + 'employee', { headers: authHeader() });
  }

  getManagerBoard() {
    return axios.get(API_URL + 'manager', { headers: authHeader() });
  }
}

export default new UserService();