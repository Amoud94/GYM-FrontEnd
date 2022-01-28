<template>
    <div class="ui container">
        <!-- modal for the client ADD and Update operationts-->
        <div id="client-modal" class="ui large modal">
          <div class="content">
            <h4 class="ui dividing header" v-if="client_view.id">Modifier les infos du client(e) : {{client_view.firstname}} {{client_view.lastname}} </h4>
            <h4 class="ui dividing header" v-else>Ajouter un nouveau client : </h4>
            <form class="ui equal width  form">
              <div class="fields">
                <div class="field">
                  <label>CIN : </label>
                  <input type="text"  v-model="client_view.cin"    placeholder="CIN :">
                </div>
                <div class="field">
                  <label>First name : </label>
                  <input type="text"  v-model="client_view.firstname"   placeholder="Last name :">
                </div>
                <div class="field">
                  <label>Last name : </label>
                  <input type="text"  v-model="client_view.lastname"   placeholder="Last name :">
                </div>
              </div>
              <div class="fields">
                <div class="field">
                  <label>Subscription : </label>
                  <input type="text"  v-model="client_view.subscription"  name="phone"  placeholder="Subscription :">
                </div>
                <div class="six wide field">
                  <label>Start at : </label>
                  <date-picker v-model="client_view.startAt" format="YYYY-MM-DD" value-type="DD/MM/YYYY" type="date"></date-picker>
                </div>
                <div class="six wide field">
                  <label>End at : </label>
                  <date-picker v-model="client_view.endAt" format="YYYY-MM-DD" value-type="DD/MM/YYYY" type="date"></date-picker>
                </div>
              </div>
              <div class="fields">
                <div class="field">
                  <label>Phone number : </label>
                  <input type="text"  v-model="client_view.phone"  name="phone"  placeholder="Phone number :">
                </div>
                <div class="field">
                  <label>Email : </label>
                  <input type="text"  v-model="client_view.email"  name="mail"  placeholder="@mail adresse :">
                </div>
              </div>
            </form>
          </div>
          <div class="actions">
            <div class="ui positive submit button" v-if="client_view.id" @click="UpdateClient(client_view)">Modifier</div>
            <div class="ui medium primary icon button" v-else @click="AddNewClient(client_view)">Enregistrer</div>
          </div>
        </div>
        <!-- view modal for the client -->
        <div id="clientView-modal" class="ui meduim modal">
        <h3 class="ui header">
            <i class="clipboard outline icon"></i>
            <div class="content">
                Client Informations :
            </div>
        </h3>
        <div class="ui segment">
            <div class="ui two column stackable center aligned grid">
                <div class="ui vertical divider"><i class="ui hand point right outline icon"></i></div>
                <div class="middle aligned row">
                    <div class="column">
                        <div class="ui centered card" >
                            <img src="../assets/images/avatar.jpg">
                        </div>
                    </div>
                    <div class="column">
                        <div class="ui segments">
                            <div class="ui blue segment">
                                CIN : {{ client_view.cin }}
                            </div>
                            <div class="ui blue segment">
                                Full name : {{ client_view.firstname }} {{client_view.lastname}} 
                            </div>
                            <div class="ui blue segment">
                                Phone : {{ client_view.phone }}
                            </div>
                            <div class="ui blue segment">
                                Email address : {{ client_view.email }}
                            </div>
                            <div class="ui blue segment">
                                Subscription : {{ client_view.subscription }}
                            </div>
                            <div class="ui blue segment">
                                Start at : {{ client_view.startAt }}
                            </div>
                            <div class="ui blue segment">
                                End at : {{ client_view.endAt }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui bottom attached center aligned segment">    
            <div class="ui  primary labeled icon button">
              <i class="plus icon"></i> Add a new event
            </div>
        </div>

          <!-- <div class="content">
              <div class="ui raised segments">
                <div class="ui center aligned header segment">
                  <div class="ui centered card" >
                    <img src="../assets/images/avatar.jpg">
                  </div>
                  <div class="content">
                    <h4> {{ client_view.firstname }} {{client_view.lastname}} </h4>
                  </div>
                </div>
                <div class="ui segments">
                  <div class="ui blue segment">
                    <h5> Phone : {{ client_view.phone }}</h5>
                  </div>
                  <div class="ui blue segment">
                    <h5> Email address : {{ client_view.email }}</h5>
                  </div>
                  <div class="ui blue segment">
                    <h5> Subscription : {{ client_view.subscription }}</h5>
                  </div>
                  <div class="ui blue segment">
                    <h5> Start at : {{ client_view.startAt }}</h5>
                  </div>
                  <div class="ui blue segment">
                    <h5> End at : {{ client_view.endAt }}</h5>
                  </div>
                </div>
                <div class="ui horizontal segments">
                  <div class="ui center aligned blue segment">
                  </div>
                  <div class="ui center aligned blue segment">
                  </div>
                </div>
              </div>
          </div> -->
        </div>
         <!-- search input -->
        <div class="ui action input">
          <input type="text" v-model="searchInput" placeholder="Search by CIN">
          <button class="ui blue button" @click="retrieveClients()"> <i class="search icon"></i> Search</button>
        </div>
        <!-- table contains clients info -->
        <table class="ui selectable celled table">
          <thead>
            <tr>
              <th>CIN</th>
              <th>Full name</th>
              <th>Phone number</th>
              <th>Subscription</th>
              <th>Start at</th>
              <th>End at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row,index) in clients" :key="index">
              <td @click="toggleViewClient(row)">{{ row.cin }}</td>
              <td @click="toggleViewClient(row)">{{ row.firstname }} {{ row.lastname }}</td>
              <td @click="toggleViewClient(row)">{{ row.phone }}</td>
              <td @click="toggleViewClient(row)">{{ row.subscription }}</td>
              <td @click="toggleViewClient(row)">{{ row.startAt }}</td>
              <td @click="toggleViewClient(row)">{{ row.endAt }}</td>
              <td>
                <button class="compact circular ui medium icon  positive button" @click="toggleUpdateClient(row)"><i class="edit icon"></i></button>
                <button class="compact circular ui medium icon  negative button" @click="DeleteClient(row.id)"><i class="delete icon"></i></button>

              </td>
            </tr>
          </tbody>
          <tfoot class="full-width">
            <tr>
              <th colspan="4">
                <div class="ui  primary labeled icon button" @click="toggleInsertClient()">
                  <i class="plus icon"></i> Ajouter un nouveau client
                </div>
              </th>
              <th colspan="4">
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
    </div>
</template>
<script>
  import EmployeeService from '../services/employee.service';
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';

export default {
  name: 'client',
  components:{DatePicker},
  data() {
    return {
      successful : false,
      message:'',
      searchInput:'',

      page: 1,
      count: 0,
      pageSize: 8,

      clients:[],
      client_view:{}
    };
  },
  methods : {
    
    toggleViewClient(row){
        this.client_view={}
        this.client_view=JSON.parse(JSON.stringify(row))
        $('#clientView-modal').modal('show')
      },
    toggleInsertClient() {
      this.client_view={}
      $('#client-modal').modal('show')
    },
    toggleUpdateClient(row) {
      this.client_view= JSON.parse(JSON.stringify(row));
      $('#client-modal').modal('show')
    },

    getRequestParams(cin, page, pageSize) {
      let params = {};
      
      if(cin){
        params["clientCIN"] = cin;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },
    retrieveClients() {
      const params = this.getRequestParams(
        this.searchInput,
        this.page,
        this.pageSize
      );
      EmployeeService.listAllClients(params)
        .then(response => {
          const { clients, totalItems, totalPages } = response.data;
          this.clients = clients;
          this.count = totalItems;
          this.totolPages = totalPages;

        })
        .catch(e => {
          console.log(e);
        });
    },
    handlePageChange(value) {
      this.page = value;
      this.retrieveClients();
    },
    AddNewClient(client){
      EmployeeService.addNewClient(client)
        .then(
            data => {
              this.message = data.message;
              this.successful = true;
              this.retrieveClients()
              $('#client-modal').modal('hide')
              this.$notify({
                group: 'crud',
                title: 'Success message',
                type: 'success',
                text: 'Client is added with success!'
              });
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
        )
    },
    UpdateClient(client){
      EmployeeService.updateClient(client)
        .then(
          data => {
            this.message = data.message;
            this.successful = true;
            this.retrieveClients()
            $('#client-modal').modal('hide')
            this.$notify({
                group: 'crud',
                title: 'Cuccess message',
                type: 'success',
                text: 'Client is Updated with success!'
            });
          },
          error => {
              this.message = error.toString()
              this.successful = false;
          }
        )
    },
    DeleteClient(employeeId){
      EmployeeService.deleteClient(employeeId)
        .then(
          data => {
            this.message = data.message;
            this.successful = true;
            this.retrieveClients()
            this.$notify({
                group: 'crud',
                title: 'Warnning message',
                type: 'warn',
                text: 'Client is deleted with success!'
            });
          },
          error => {
              this.message = error.toString()
              this.successful = false;
          }
        )
    },

  },
  mounted() {

    // if(this.client_view.startAt){this.client_view.startAt = this.client_view.startAt.substring(0, 10)}

    $('#tasks .menu .item')
      .tab({
        context: 'parent'
      })
    ;
    this.retrieveClients()

  }
  
};
</script>
<style scoped>
  .ui.modal{
    margin: 0 auto!important;
    top: auto !important;
    left: auto !important;

  }
</style>
