<template>
  <div class="ui container">
    <div id="employee-modal" class="ui large modal">
      <div class="content">
        <h4 class="ui dividing header" v-if="emp_view.id">
          Update infos for employee : {{ emp_view.firstname }}
          {{ emp_view.lastname }}
        </h4>
        <h4 class="ui dividing header" v-else>Add a new employee :</h4>
        <form class="ui equal width form">
          <div class="fields">
            <div class="field">
              <label>CIN : </label>
              <input type="text" v-model="emp_view.cin" placeholder="CIN :" />
            </div>
            <div class="field">
              <label>First name : </label>
              <input
                type="text"
                v-model="emp_view.firstname"
                placeholder="Last name :"
              />
            </div>
            <div class="field">
              <label>Last name : </label>
              <input
                type="text"
                v-model="emp_view.lastname"
                placeholder="Last name :"
              />
            </div>
          </div>
          <div class="fields">
            <div class="field">
              <label>Position : </label>
              <select
                v-model="emp_view.position"
                name="roles"
                class="ui fluid dropdown"
              >
                <option selected value="employee">Employee</option>
                <option value="coach">Coach</option>
              </select>
            </div>
            <div class="field" v-if="emp_view.position == 'coach'">
              <label>Speciality : </label>
              <select
                v-model="emp_view.speciality"
                name="roles"
                class="ui fluid dropdown"
              >
                <option value="fitness">Fitness</option>
                <option value="crossfit">Crossfit</option>
                <option value="bodybuilding">Bodybuilding</option>
                <option value="WeightLoss">Weight loss</option>
                <option value="conditioning">Strength And Conditioning</option>
              </select>
            </div>
            <div class="field">
              <label>Phone number : </label>
              <input
                type="text"
                v-model="emp_view.phone"
                name="phone"
                placeholder="Phone number :"
              />
            </div>
            <div class="field">
              <label>Email : </label>
              <input
                type="text"
                v-model="emp_view.email"
                name="mail"
                placeholder="@mail adresse :"
              />
            </div>
          </div>
          <div class="fields">
            <div class="field">
              <label>Username: </label>
              <input
                type="text"
                v-model="emp_view.username"
                name="username"
                placeholder="Username :"
              />
            </div>
            <div class="field" v-if="!emp_view.id">
              <label>Password : </label>
              <input
                type="text"
                v-model="emp_view.password"
                name="password"
                placeholder="Password :"
              />
            </div>
            <!-- <div class="field">
              <label>Authorities : </label>
              <select  v-model="emp_view.roles" name="roles" class="ui fluid dropdown" multiple="">
                <option selected value="employee">Employee</option>
                <option value="coach">Coach</option>
              </select>
            </div> -->
          </div>
        </form>
      </div>
      <div class="actions">
        <div
          class="ui positive submit button"
          v-if="emp_view.id"
          @click="UpdateEmployee(emp_view)"
        >
          Update
        </div>
        <div
          class="ui medium primary button"
          v-else
          @click="AddNewEmployee(emp_view)"
        >
          Save
        </div>
      </div>
    </div>

    <div id="employeeView-modal" class="ui meduim modal">
      <h3 class="ui header">
        <i class="clipboard outline icon"></i>
        <div class="content">Employee Informations :</div>
      </h3>
      <div class="ui segment">
        <div class="ui two column center aligned grid">
          <div class="ui vertical divider">
            <i class="ui hand point right outline icon"></i>
          </div>
          <div class="middle aligned row">
            <div class="column">
              <div class="ui centered card">
                <img src="../assets/images/avatar.jpg" />
              </div>
            </div>
            <div class="column">
              <div class="ui segments">
                <div class="ui blue segment">
                  Full name : {{ emp_view.firstname }} {{ emp_view.lastname }}
                </div>
                <div class="ui blue segment">CIN : {{ emp_view.cin }}</div>
                <div class="ui blue segment">Phone : {{ emp_view.phone }}</div>
                <div class="ui blue segment">
                  Position : {{ emp_view.position }}
                </div>
                <div
                  class="ui blue segment"
                  v-if="emp_view.position == 'coach'"
                >
                  Speciality : {{ emp_view.speciality }}
                </div>
                <div class="ui blue segment">
                  Email address : {{ emp_view.email }}
                </div>
                <div class="ui blue segment">
                  Username : {{ emp_view.username }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ui bottom attached center aligned vertical segment">
        <div class="ui primary labeled icon button">
          <i class="plus icon"></i> Add a new event
        </div>
      </div>
    </div>

    <div class="ui action input">
      <input type="text" v-model="searchInput" placeholder="Search by CIN" />

      <button class="ui blue button" @click="retrieveEmployees()">
        <i class="search icon"></i> Search
      </button>
    </div>

    <table class="ui selectable celled table">
      <thead>
        <tr>
          <th>CIN</th>
          <th>Full name</th>
          <th>Position</th>
          <th>Phone number</th>
          <th>Email</th>
          <th>Username</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in employees" :key="index">
          <td @click="toggleView(row)">{{ row.cin }}</td>
          <td @click="toggleView(row)">
            {{ row.firstname }} {{ row.lastname }}
          </td>
          <td @click="toggleView(row)">{{ row.position }}</td>
          <td @click="toggleView(row)">{{ row.phone }}</td>
          <td @click="toggleView(row)">{{ row.email }}</td>
          <td @click="toggleView(row)">{{ row.username }}</td>
          <td>
            <button
              class="compact circular ui medium icon positive button"
              @click="toggleUpdateEmployee(row)"
            >
              <i class="edit icon"></i>
            </button>
            <button
              class="compact circular ui medium icon negative button"
              @click="DeleteEmployee(row.id)"
            >
              <i class="delete icon"></i>
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot class="full-width">
        <tr>
          <th colspan="4">
            <div
              class="ui primary labeled icon button"
              @click="toggleInsertEmployee()"
            >
              <i class="plus icon"></i> Add a new employee
            </div>
          </th>
          <th colspan="3">
            <div>
              <b-pagination
                v-model="page"
                :total-rows="count"
                :per-page="pageSize"
                prev-text="Prev"
                next-text="Next"
                @change="handlePageChange"
              ></b-pagination>
            </div>
          </th>
        </tr>
      </tfoot>
    </table>

    <!-- <div>
      <div class="container" style="margin-top: 50px">
        <div class="row">
          <div class="col-md-12">
            <form class="form-inline">
              <div class="form-group">
                <label for="message">Message</label>
                <input
                  type="text"
                  v-model="message"
                  class="form-control"
                  placeholder="Enter your message here..."
                />
              </div>
              <button
                id="send"
                class="btn btn-default"
                type="button"
                @click="sendMessage()"
              >
                Send
              </button>
            </form>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <form class="form-inline">
              <div class="form-group">
                <label for="message">Message priver</label>
                <input
                  type="text"
                  v-model="message"
                  class="form-control"
                  placeholder="Enter your message here..."
                />
              </div>
              <button
                id="send"
                class="btn btn-default"
                type="button"
                @click="sendPrivateMessage()"
              >
                Send
              </button>
            </form>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <table id="message-history" class="table table-striped">
              <thead>
                <tr>
                  <th>Messages</th>
                </tr>
              </thead>
              <tbody id="messages">
                <tr v-for="(row, index) in messages" :key="index">
                  <td>{{ row }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>


import ManagerService from "../services/manager.service";

export default {
  data() {
    return {
      successful: false,
      message: "",
      searchInput: "",
      messages: [],
      stompClient: "",
      page: 1,
      count: 0,
      pageSize: 8,

      employees: [],
      emp_view: {},
    };
  },

  methods: {
    toggleView(row) {
      this.emp_view = {};
      this.emp_view = JSON.parse(JSON.stringify(row));
      $("#employeeView-modal").modal("show");
    },
    toggleInsertEmployee() {
      this.emp_view = {};
      $("#employee-modal").modal("show");
    },
    toggleUpdateEmployee(row) {
      this.emp_view = JSON.parse(JSON.stringify(row));
      $("#employee-modal").modal("show");
    },
    getRequestParams(cin, page, pageSize) {
      let params = {};

      if (cin) {
        params["employeeCIN"] = cin;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },
    retrieveEmployees() {
      const params = this.getRequestParams(
        this.searchInput,
        this.page,
        this.pageSize
      );
      ManagerService.listAllEmployees(params)
        .then((response) => {
          const { employees, totalItems, totalPages } = response.data;
          this.employees = employees;
          this.count = totalItems;
          this.totolPages = totalPages;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    handlePageChange(value) {
      this.page = value;
      this.retrieveEmployees();
    },
    AddNewEmployee(employee) {
      ManagerService.addNewEmployee(employee).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.retrieveEmployees();
          $("#employee-modal").modal("hide");
          this.$notify({
            group: "crud",
            title: "Success message",
            type: "success",
            text: "Employee is added with success!",
          });
        },
        (error) => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      );
    },
    UpdateEmployee(employee) {
      ManagerService.updateEmployee(employee).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.retrieveEmployees();
          $("#employee-modal").modal("hide");
          this.$notify({
            group: "crud",
            title: "Success message",
            type: "success",
            text: "Employee is updated with success!",
          });
        },
        (error) => {
          this.message = error.toString();
          this.successful = false;
        }
      );
    },
    DeleteEmployee(employeeId) {
      ManagerService.deleteEmployee(employeeId).then(
        (data) => {
          this.message = data.message;
          this.retrieveEmployees();
          this.successful = true;
          this.$notify({
            group: "crud",
            title: "Warning message",
            type: "warn",
            text: "Employee is deleted with success!",
          });
        },
        (error) => {
          this.message = error.toString();
          this.successful = false;
        }
      );
    },
    connect_WS(){
      ManagerService.connectToWebSocket(this.currentUser.accessToken,this.messages);
    }
  },
  computed:{
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    this.connect_WS();
    this.retrieveEmployees();
  },
};
</script>
<style scoped>
.ui.modal {
  margin: 0 auto !important;
  top: auto !important;
  left: auto !important;
}
</style>