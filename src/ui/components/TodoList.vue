<template>
  <v-container class="todo-list">
    <v-row align="center" justify="center">
      <v-col align-self="center" lg="5">
        <h2>Todo with IndexdDB demo</h2>
        <v-text-field
          class="mt-4"
          solo
          v-model="todoMessage"
          label="Enter a todo"
          append-icon="playlist_add"
          @click:append="addTodo"
          @keypress.enter="addTodo"
        ></v-text-field>
        <v-card>
          <v-slide-y-transition group>
            <v-list-item v-for="(todo, index) in todos" :key="index">
              <v-list-item-action>
                <v-checkbox v-model="todo.completed"></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-text-field
                  flat
                  solo
                  v-model="todo.body"
                  dense
                  hide-details
                  :readonly="index !== activeTodoIndex"
                  :ref="`todoField${index}`"
                  @keypress.enter="activeTodoIndex = null"
                ></v-text-field>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                  icon
                  v-if="index !== activeTodoIndex"
                  @click="editTodo(index)"
                >
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-btn icon v-else @click="activeTodoIndex = null">
                  <v-icon>check_circle</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-action @click="deleteTodo(index)">
                <v-btn icon color="red lighten-2">
                  <v-icon>delete_outline</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-slide-y-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'TodoList',
  data: () => ({
    todoMessage: '',
    todos: [
      {
        body: 'todo1',
        completed: false
      },
      {
        body: 'todo2',
        completed: false
      },
      {
        body: 'todo3',
        completed: true
      }
    ],
    activeTodoIndex: null
  }),
  methods: {
    addTodo() {
      this.todos.push({
        body: this.todoMessage,
        completed: false
      })
      this.todoMessage = ''
    },
    updateTodo(index) {
      this.todos[index].completed = !this.todos[index].completed
    },
    deleteTodo(index) {
      this.todos.splice(index, 1)
    },
    editTodo(index) {
      this.activeTodoIndex = index
      this.$refs[`todoField${index}`][0].focus()
    }
  }
}
</script>
