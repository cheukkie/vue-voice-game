//import axios from 'axios';

const state = {
    players: [],
    gameRound: 1,
    gameCurPlayerIndex: 0,
};

const getters = {
    allPlayers: state => state.players,
    curPlayer: state => state.players[state.gameCurPlayerIndex],
    curRound: state => state.gameRound,
};

const actions = {

    addPlayer({ commit }, player) {
        commit('newPlayer', {
            name: player,
            score: 0
        });
    },

    nextPlayer({commit}){
        if( (state.gameCurPlayerIndex+1) < state.players.length ){
            commit('selectNextPlayer');
        }else{
            commit('selectFirstPlayer');
            commit('addRound');
        }
    },

    addPoint({commit}){
        commit('addPoint');
    },

    removePoint({commit}){
        commit('removePoint');
    }

    // async fetchTodos({
    //     commit
    // }) {
    //     const response = await axios.get(
    //         'https://jsonplaceholder.typicode.com/todos'
    //     );

    //     commit('setTodos', response.data);
    // },
    // async addTodo({
    //     commit
    // }, title) {
    //     const response = await axios.post(
    //         'https://jsonplaceholder.typicode.com/todos', {
    //             title,
    //             completed: false
    //         }
    //     );

    //     commit('newTodo', response.data);
    // },
    // async deleteTodo({
    //     commit
    // }, id) {
    //     await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    //     commit('removeTodo', id);
    // },
    // async filterTodos({
    //     commit
    // }, e) {
    //     // Get selected number
    //     const limit = parseInt(
    //         e.target.options[e.target.options.selectedIndex].innerText
    //     );

    //     const response = await axios.get(
    //         `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    //     );

    //     commit('setTodos', response.data);
    // },
    // async updateTodo({
    //     commit
    // }, updTodo) {
    //     const response = await axios.put(
    //         `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
    //         updTodo
    //     );

    //     console.log(response.data);

    //     commit('updateTodo', response.data);
    // }
};

const mutations = {
    // setTodos: (state, todos) => (state.todos = todos),
    newPlayer: (state, player) => state.players.unshift(player),
    selectFirstPlayer: () => state.gameCurPlayerIndex = 0,
    selectNextPlayer: () => state.gameCurPlayerIndex++,
    addRound: () => state.gameRound++,

    addPoint: () => state.players[state.gameCurPlayerIndex].score++,
    removePoint: () => state.players[state.gameCurPlayerIndex].score--,
    
    // removeTodo: (state, id) =>
    //     (state.todos = state.todos.filter(todo => todo.id !== id)),
    // updateTodo: (state, updTodo) => {
    //     const index = state.todos.findIndex(todo => todo.id === updTodo.id);
    //     if (index !== -1) {
    //         state.todos.splice(index, 1, updTodo);
    //     }
    // }
};

export default {
    state,
    getters,
    actions,
    mutations
};