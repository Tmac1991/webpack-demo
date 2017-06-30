<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <demo-header :add="add"></demo-header>
      <list :todos="todos" :remove="remove"></list>
      <demo-footer :todos="todos" :remove-selected="removeSelected":select-all-todos="selectAllTodos"></demo-footer>
   </div>
  </div>
</template>

<script>
import header from './header.vue'
import list from './list.vue'
import footer from './footer.vue'
import localStorageUtil from '../util/localStorageUtil.js'
export default {
    data(){
        return{
          todos:[]
        }
    },
    created () {
      setTimeout(()=>{
        this.todos = localStorageUtil.readTodos()
      },1000)
    },
    methods:{
      add(todo){
          this.todos.unshift(todo)
      },
      remove(index){
       this.todos.splice(index, 1)
      },
      removeSelected(){
        this.todos =  this.todos.filter(todo => !todo.complete)
      },
      selectAllTodos(isCheck){
         this.todos.forEach(todo =>{
             todo.complete = isCheck
         })
      }
    },
    watch:{
      todos:{
          deep: true,
          /*handler(newTodos){
          localStorageUtil.saveTodos(newTodos)
          }*/
          handler:localStorageUtil.saveTodos
      }
    },
    components:{
        'demo-header': header,
          list,
        'demo-footer': footer
    }
}

</script>

<style>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
