import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [
      {
        id: 1,
        content: "Đi chợ",
        completed: false
      },
      {
        id: 2,
        content: "Đi ăn",
        completed: false
      }
    ]
  },
  mutations: {
    addTodo(state, todoContent) {
      const newTodo = {
        id: Date.now(),
        content: todoContent,
        completed: false
      };

      state.todos.push(newTodo);
    },

    deleteTodo(state, todoId) {
      state.todos = state.todos.filter(
        todo => Number(todo.id) !== Number(todoId)
      );
    },

    markCompletedTodo(state, { todoId, status }) {
      state.todos = state.todos.map(todo => {
        if (Number(todo.id) === Number(todoId)) todo.completed = status;

        return todo;
      });
    }
  }
});
