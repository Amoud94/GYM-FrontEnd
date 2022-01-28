<template>
    <div class="container">
        <!--Notify modal-->
        <div id="notify-modal" class="ui large modal">
          <div class="content">
            <h4 class="ui dividing header">Notify manager about damage in machine : {{machine_view.ref}} </h4>
            <form class="ui equal width  form">
                <div class="field">
                  <label>Machine Ref : </label>
                  <input type="text" class="text" v-bind:value="machine_view.ref" disabled> 
                </div>
                <div class="field">
                  <label>Subject : </label>
                  <input type="text"  v-model="notification.subject"    placeholder="Ref :">
                </div>
                <div class="field">
                  <label>Description : </label>
                  <textarea v-model="notification.desc" placeholder="Description :"></textarea>
                </div>
            </form>
          </div>
          <div class="actions">
            <div class="ui medium primary icon button"  @click="AddNewMachine(machine_view)">Send notification </div>
          </div>
        </div>
        <!-- modal for the client ADD and Update operationts-->
        <div id="machine-modal" class="ui large modal">
          <div class="content">
            <h4 class="ui dividing header" v-if="machine_view.id">Modifier les infos du machine : {{machine_view.ref}}</h4>
            <h4 class="ui dividing header" v-else>Ajouter une nouvelle machine : </h4>
            <form class="ui equal width  form">
              <div class="fields">
                <div class="field">
                  <label>Ref : </label>
                  <input type="text"  v-model="machine_view.ref"    placeholder="Ref :">
                </div>
                <div class="field">
                  <label>Name : </label>
                  <input type="text"  v-model="machine_view.name"   placeholder="Name :">
                </div>
                <div class="field">
                  <label>Category: </label>
                  <input type="text"  v-model="machine_view.category"   placeholder="Category :">
                </div>
              </div>
              <div class="fields">
                <div class="field">
                  <label>Description : </label>
                  <textarea v-model="machine_view.desc" placeholder="Description :"></textarea>
                </div>
              </div>
            </form>
          </div>
          <div class="actions">
            <div class="ui positive submit button" v-if="machine_view.id" @click="UpdateMachine(machine_view)">Modifier</div>
            <div class="ui medium primary icon button" v-else @click="AddNewMachine(machine_view)">Enregistrer</div>
          </div>
        </div>

        <div class="ui action input">
          <input type="text" v-model="searchInput" placeholder="Search by reference">
          <button class="ui blue button" @click="retrieveMachines()"> <i class="search icon"></i> Search</button>
        </div>
        <!-- table contains clients info -->
        <table class="ui selectable celled table">
          <thead>
            <tr>
              <th>Ref</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row,index) in machines" :key="index">
              <td @click="toggleViewMachine(row)">{{ row.ref }}</td>
              <td @click="toggleViewMachine(row)">{{ row.name }}</td>
              <td @click="toggleViewMachine(row)">{{ row.category }}</td>
              <td @click="toggleViewMachine(row)">{{ row.desc }}</td>
              <td>
                <button class="compact circular ui primary button" @click="toggleNotifyModal(row)"> report <i class="right info icon"></i></button>
                <button class="compact circular ui positive button" @click="toggleUpdateMachine(row)"> update <i class="right write icon"></i></button>
                <button class="compact circular ui negative button" @click="DeleteMachine(row.id)"> delete <i class="right delete icon"></i></button>
              </td>
            </tr>
          </tbody>
          <tfoot class="full-width">
            <tr>
              <th colspan="4">
                <div class="ui  primary labeled icon button" @click="toggleInsertMachine()">
                  <i class="plus icon"></i> Ajouter une nouvelle machine
                </div>
              </th>
              <th colspan="1">
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


export default {
  name: 'machine',
  data() {
    return {
      successful : false,
      message:'',
      searchInput:'',

      page: 1,
      count: 0,
      pageSize: 8,

      machines:[],
      machine_view:{},

      notification : {}
    };
  },
  methods : {
    
    toggleNotifyModal(row){
        this.machine_view=JSON.parse(JSON.stringify(row))
        $('#notify-modal').modal('show')
    },
    toggleViewMachine(row){
        this.machine_view=JSON.parse(JSON.stringify(row))
        $('#machineView-modal').modal('show')
      },
    toggleInsertMachine() {
      this.machine_view={}
      $('#machine-modal').modal('show')
    },
    toggleUpdateMachine(row) {
      this.machine_view= JSON.parse(JSON.stringify(row));
      $('#machine-modal').modal('show')
    },

    getRequestParams(ref, page, pageSize) {
      let params = {};
      
      if(ref){
        params["machineRef"] = ref;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },
    retrieveMachines() {
      const params = this.getRequestParams(
        this.searchInput,
        this.page,
        this.pageSize
      );
      EmployeeService.listAllMachines(params)
        .then(response => {
          const { machines, totalItems, totalPages } = response.data;
          this.machines = machines;
          this.count = totalItems;
          this.totolPages = totalPages;

        })
        .catch(e => {
          console.log(e);
        });
    },
    handlePageChange(value) {
      this.page = value;
      this.listAllMachines();
    },
    AddNewMachine(machine){
      EmployeeService.addNewMachine(machine)
        .then(
            data => {
              this.message = data.message;
              this.successful = true;
              this.retrieveMachines()
              $('#machine-modal').modal('hide')
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
    UpdateMachine(machine){
      EmployeeService.updateMachine(machine)
        .then(
          data => {
            this.message = data.message;
            this.successful = true;
            this.retrieveMachines()
            $('#machine-modal').modal('hide')
            this.$notify({
                group: 'crud',
                title: 'Cuccess message',
                type: 'success',
                text: 'Machine is Updated with success!'
            });
          },
          error => {
              this.message = error.toString()
              this.successful = false;
          }
        )
    },
    DeleteMachine(machineId){
      EmployeeService.deleteMachine(machineId)
        .then(
          data => {
            this.message = data.message;
            this.successful = true;
            this.retrieveMachines()
            this.$notify({
                group: 'crud',
                title: 'Warnning message',
                type: 'warn',
                text: 'Machine is deleted with success!'
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
    
    $('#tasks .menu .item')
      .tab({
        context: 'parent'
      })
    ;
    this.retrieveMachines()

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
