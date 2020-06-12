<template>
  <v-app>
    <todo-list></todo-list>
  </v-app>
</template>

<script>
import TodoList from '@/ui/components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList
  },
  data: () => ({
    //
  })
}
</script>
