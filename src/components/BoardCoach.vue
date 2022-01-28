<template>
  <div class="ui raised container segment">
    <div id="coach_tasks">
      <div class="ui pointing blue secondary menu">
        <a class="item active" data-tab="privateClients">Private clients management</a>
        <a class="item" data-tab="planningP">Planning management</a>
      </div>

      <div class="ui tab blue segment active" data-tab="privateClients">
        <clients></clients>
      </div>

      <div class="ui blue tab segment" data-tab="planningP">
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
      </div>
    </div>
  </div>  
</template>
<script>
export default {
  name: "coach",
  components:{
  },
  data() {
    return{
      clients:[],
      page: 1,
      limit: 10,
      count: 0,
    }
  },
  mounted(){
    $('#coach_tasks .menu .item')
      .tab({
        context: 'parent'
      })
  }
}
</script>