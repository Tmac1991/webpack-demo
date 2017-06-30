const TODOS_KEY = "todo_key"
export default {
  readTodos(){
    return JSON.parse(localStorage.getItem(TODOS_KEY) || '[]')
  },
  saveTodos(todos){
    localStorage.setItem(TODOS_KEY,JSON.stringify(todos))
  }
}
