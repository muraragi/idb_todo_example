<template>
  <v-app>
    <todo-list
      :todos="todos"
      @createTodo="createTodo"
      @deleteTodo="deleteTodo"
      @updateTodo="updateTodo"
    ></todo-list>
  </v-app>
</template>

<script>
import TodoList from '@/ui/components/TodoList.vue'
import { Todo } from './entities/todo.js'
import { Database } from './services/db.js'

export default {
  name: 'App',
  components: {
    TodoList
  },
  data: () => ({
    todos: [],
    db: null
  }),
  async created() {
    this.db = new Database(1, { todo: '++id' })
    await this.db.openDb()
    const todoData = await this.db.get('todo')
    this.todos = todoData.map(
      todo => new Todo(todo.body, todo.completed, todo.createdAt, todo.id)
    )
  },
  methods: {
    createTodo(todoMessage) {
      const todo = new Todo(todoMessage, false, Date.now())
      this.todos.push(todo)
      this.db.create('todo', todo)
    },
    updateTodo(index) {
      console.log(index)
      this.todos[index].completed = !this.todos[index].completed
      this.db.update('todo', this.todos[index])
    },
    deleteTodo(index) {
      const idToDelete = this.todos[index].id
      this.todos.splice(index, 1)
      this.db.delete('todo', idToDelete)
    }
  }
}
</script>
