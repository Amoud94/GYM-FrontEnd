<template>
  <div class="ui raised segment container">
    
    <div id="employee_tasks">
      <div class="ui pointing blue secondary menu">
        <a class="item active" data-tab="clients">Clients management</a>
        <a class="item" data-tab="products">Products management</a>
        <a class="item" data-tab="machines">Machines management</a>
      </div>

      <div class="ui tab blue segment active" data-tab="clients">
        <clients></clients>
      </div>

      <div class="ui blue tab segment" data-tab="products">

        <div class="ui right aligned vertical segment">
          <div class="ui toggle checkbox">
            <input type="checkbox" name="public" v-model="view">
            <label v-if="!view">View items</label>
            <label v-else>View infos</label>
          </div>
        </div>

        <div class="ui vertical segment" v-if="!view">
          <products></products>
        </div>
        <div class="ui vertical segment" v-else>
          <products-view></products-view>
        </div>
      </div>
      
      <div class="ui blue tab segment" data-tab="machines">
        <machines></machines>
      </div>
    </div>

  </div>
</template>

<script>

import Clients from './Clients.vue';
import Machines from './Machines.vue';
import Products from './Products.vue';
import ProductsView from './ProductsView.vue';

export default {
  name: 'employee',
  components:{
    Clients,
    Machines,
    Products,
    ProductsView,
  },
  data(){
    return {
      view : false,
    }
  },
  mounted() {
    
    $('#employee_tasks .menu .item')
      .tab({
        context: 'parent'
      })
  }
  
};
</script>
<style scoped>

</style>