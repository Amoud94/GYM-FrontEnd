<template>
  <div class="ui raised segment container">
    <div id="manager_tasks">
      <div class="ui pointing blue secondary menu">
        <a class="item active" data-tab="employees">Employees management</a>
        <a class="item" data-tab="planning">Planning</a>
        <a class="item" data-tab="attendancie">Employee attendancie</a>
      </div>
      <div class="ui tab blue segment active" data-tab="employees">
        <employees></employees>
      </div>
      <div class="ui blue tab segment" data-tab="planning">
        <schedule></schedule>
      </div>
      <div class="ui blue tab segment" data-tab="attendancie">
      </div>
    </div>


  </div>  
</template>
<script>
import Employees from './Employees.vue';
import Schedule from './Schedule.vue';

export default {
  name: "manager",
  components:{
    Employees,
    Schedule
  },

  mounted() {
    $('#manager_tasks .menu .item')
      .tab({
        context: 'parent'
      })
    ;
  }
}
</script>
<style scoped>
</style>