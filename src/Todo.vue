<template>
  <div id="todo">
    <h2 class="title">Todo</h2>

    <div>
      <form class="todo-form" @submit.prevent="handleSubmitTodoForm">
        <input class="form-input" type="text" v-model="content" />
        <button class="form-button" type="submit">Submit</button>
      </form>

      <h3>List Todo</h3>

      <ol class="todo-list">
        <li class="list-item" v-for="todo in todos">
          {{ todo }}
          <p class="item-content">{{ todo.content }}</p>
          <input
            class="item-mark"
            type="checkbox"
            name="checkbox"
            v-bind:data-todoId="todo.id"
            v-bind:checked="todo.completed"
            v-on:change="handleChangeStatus"
          />
          <button
            class="item-delete"
            v-on:click="() => handleDeleteTodo(todo.id)"
          >
            Delete
          </button>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Todo",
  components: {},
  data() {
    return {
      content: ""
    };
  },
  computed: {
    ...mapState({
      todos: state => state.todos
    })
  },
  methods: {
    handleSubmitTodoForm() {
      this.$store.commit("addTodo", this.content);
    },

    handleDeleteTodo(id) {
      this.$store.commit("deleteTodo", id);
    },

    handleChangeStatus(event) {
      const { checked } = event.target;
      const { todoid } = event.target.dataset;

      this.$store.commit("markCompletedTodo", {
        status: checked,
        todoId: todoid
      });
    }
  }
};
</script>

<style scoped>
ol,
ul,
li {
  padding: 0;
  margin: 0;
}

#todo {
  width: 50%;
  margin: auto;
}
#todo > .title {
  font-size: 3rem;
  text-align: center;
}

#todo .todo-form {
  padding: 2rem;
  text-align: center;
}

#todo .todo-form .form-input {
  padding: 1.5em;
}

#todo .todo-form .form-button {
  font-size: 1rem;
  font-weight: 600;
  padding: 1.125em;
}

#todo .todo-list .list-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #b7b7b7;
}

#todo .todo-list .list-item .item-content {
  flex: 2;
  font-size: 2rem;
  text-align: right;
}

#todo .todo-list .list-item .item-mark {
  flex: 1;
  width: 50px;
  height: 50px;
}

#todo .todo-list .list-item .item-delete {
  flex: 1;
  width: fit-content;
  height: 50px;
  font-size: 1.4rem;
}
</style>
