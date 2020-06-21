<template>
  <v-container class="todo-list">
    <v-row align="center" justify="center">
      <v-col align-self="center" lg="4">
        <h2>Todo with IndexedDB demo</h2>
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
                <v-checkbox
                  :input-value="todo.completed"
                  @change="updateTodo(index)"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="todo.body"></v-list-item-title>
                <v-list-item-subtitle
                  v-text="todo.getFormattedDate()"
                ></v-list-item-subtitle>
              </v-list-item-content>
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
  props: {
    todos: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data: () => ({
    todoMessage: ''
  }),
  methods: {
    addTodo() {
      this.$emit('createTodo', this.todoMessage)
      this.todoMessage = ''
    },
    updateTodo(index) {
      this.$emit('updateTodo', index)
    },
    deleteTodo(index) {
      this.$emit('deleteTodo', index)
    }
  }
}
</script>
