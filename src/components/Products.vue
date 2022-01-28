<template>
    <div class="container">
        <!-- modal for the client ADD and Update operationts-->
        <div id="product-modal" class="ui large modal">
          <div class="content">
            <h4 class="ui dividing header" v-if="product_view.id">Modifier les infos du produit : {{product_view.ref}}</h4>
            <h4 class="ui dividing header" v-else>Ajouter un nouveau produit : </h4>
            <form class="ui equal width  form">
              <div class="fields">
                <div class="field">
                  <label>Ref : </label>
                  <input type="text"  v-model="product_view.ref"    placeholder="Ref :">
                </div>
                <div class="field">
                  <label>Name : </label>
                  <input type="text"  v-model="product_view.name"   placeholder="Name :">
                </div>
                <div class="field">
                  <label>Category: </label>
                  <input type="text"  v-model="product_view.category"   placeholder="Category :">
                </div>
              </div>
              <div class="fields">
                <div class="field">
                  <label>Description : </label>
                  <textarea v-model="product_view.desc" placeholder="Description :"></textarea>
                </div>
              </div>
              <div class="fields">
                <div class="field">
                  <label>Quantity: </label>
                  <input type="text"  v-model="product_view.quantity"   placeholder="Quantity :">
                </div>
                <div class="field">
                  <label>Price: </label>
                  <input type="text"  v-model="product_view.price"   placeholder="Price :">  
                </div>
              </div>
            </form>
          </div>
          <div class="actions">
            <div class="ui positive submit button" v-if="product_view.id" @click="UpdateProduct(product_view)">Modifier</div>
            <div class="ui medium primary icon button" v-else @click="AddNewProduct(product_view)">Enregistrer</div>
          </div>
        </div>

        <div class="ui action input">
          <input type="text" v-model="searchInput" placeholder="Search by category">
          <button class="ui blue button" @click="retrieveProducts()"> <i class="search icon"></i> Search</button>
        </div>
        <!-- table contains clients info -->
        <table class="ui selectable celled table">
          <thead>
            <tr>
              <th>Ref</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row,index) in products" :key="index">
              <td @click="toggleViewproduct(row)">{{ row.ref }}</td>
              <td @click="toggleViewproduct(row)">{{ row.name }}</td>
              <td @click="toggleViewproduct(row)">{{ row.category }}</td>
              <td @click="toggleViewproduct(row)">{{ row.desc }}</td>
              <td @click="toggleViewproduct(row)">{{ row.quantity }}</td>
              <td @click="toggleViewproduct(row)">{{ row.price }}</td>
              <td>
                <button class="compact circular ui medium icon  positive button" @click="toggleUpdateProduct(row)"><i class="edit icon"></i></button>
                <button class="compact circular ui medium icon  negative button" @click="DeleteProduct(row.id)"><i class="delete icon"></i></button>

              </td>
            </tr>
          </tbody>
          <tfoot class="full-width">
            <tr>
              <th colspan="4">
                <div class="ui  primary labeled icon button" @click="toggleInsertProduct()">
                  <i class="plus icon"></i> Ajouter un nouveau produit
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


export default {
  name: 'product',
  data() {
    return {
      successful : false,
      message:'',
      searchInput:'',

      page: 1,
      count: 0,
      pageSize: 8,

      products:[],
      product_view:{}
    };
  },
  methods : {
    
    toggleViewProduct(row){
        this.product_view=JSON.parse(JSON.stringify(row))
        $('#productView-modal').modal('show')
      },
    toggleInsertProduct() {
      this.product_view={}
      $('#product-modal').modal('show')
    },
    toggleUpdateProduct(row) {
      this.product_view= JSON.parse(JSON.stringify(row));
      $('#product-modal').modal('show')
    },

    getRequestParams(category, page, pageSize) {
      let params = {};
      
      if(category){
        params["productCategory"] = category;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },
    retrieveProducts() {
      const params = this.getRequestParams(
        this.searchInput,
        this.page,
        this.pageSize
      );
      EmployeeService.listAllProducts(params)
        .then(response => {
          const { products, totalItems, totalPages } = response.data;
          this.products = products;
          this.count = totalItems;
          this.totolPages = totalPages;

        })
        .catch(e => {
          console.log(e);
        });
    },
    handlePageChange(value) {
      this.page = value;
      this.retrieveProducts();
    },
    AddNewProduct(product){
      EmployeeService.addNewProduct(product)
        .then(
            data => {
              this.message = data.message;
              this.successful = true;
              this.retrieveProducts()
              $('#product-modal').modal('hide')
              this.$notify({
                group: 'crud',
                title: 'Success message',
                type: 'success',
                text: 'Product is added with success!'
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
    UpdateProduct(product){
      EmployeeService.updateProduct(product)
        .then(
          data => {
            this.message = data.message;
            this.successful = true;
            this.retrieveProducts()
            $('#product-modal').modal('hide')
            this.$notify({
                group: 'crud',
                title: 'Cuccess message',
                type: 'success',
                text: 'Product is Updated with success!'
            });
          },
          error => {
              this.message = error.toString()
              this.successful = false;
          }
        )
    },
    DeleteProduct(productId){
      EmployeeService.deleteProduct(productId)
        .then(
          data => {
            this.message = data.message;
            this.successful = true;
            this.retrieveProducts()
            this.$notify({
                group: 'crud',
                title: 'Warnning message',
                type: 'warn',
                text: 'Product is deleted with success!'
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
    this.retrieveProducts()

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
