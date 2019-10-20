//import axios from 'axios';

const state = {
    players: [],
    gameRound: 1,
    gameCurPlayerIndex: 0,
    gameWinningScore: 5,
    gameOver: false,
    gameSettingsSet: false
};

const getters = {
    allPlayers: state => state.players,
    curPlayer: state => state.players[state.gameCurPlayerIndex],
    curRound: state => state.gameRound,
    gameOverStatus: state => state.gameOver,
    gameSettingsStatus: state => state.gameSettingsSet
};

const actions = {

    settingsSet({commit}){
        commit('settingsSet');
    },

    resetGame({commit}){
        commit('resetGame');
    },

    removePlayer({commit},player){
        //test
        console.log(commit);
        console.log(player);
    },

    addPlayer({ commit }, player) {
        commit('newPlayer', {
            name: player,
            score: 0,
            winner: false
        });
    },

    nextPlayer({commit}){
        if( (state.gameCurPlayerIndex+1) < state.players.length ){
            commit('selectNextPlayer');
        }else{
            // const reachedScore = state.players.filter(player=>{
            //     return player.score >= state.gameWinningScore;
            // });
            // console.log( reachedScore );
            commit('selectFirstPlayer');
            commit('addRound');
        }
    },

    addPoint({commit}){
        commit('addPoint');
        if( state.players[state.gameCurPlayerIndex].score >= state.gameWinningScore ){
            commit('setWinningPlayer');
        }
    },

    removePoint({commit}){
        commit('removePoint');
    },

    setWinningScore({commit},score){
        commit('setWinningScore',score);
    },

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
    newPlayer: (state, player) => state.players.unshift(player),
    selectFirstPlayer: () => state.gameCurPlayerIndex = 0,
    selectNextPlayer: () => state.gameCurPlayerIndex++,

    settingsSet: () => state.gameSettingsSet = true,
    resetGame: () => {
        state.gameOver = false;
        state.gameRound = 1;
        state.gameWinningScore = 5;
        state.gameCurPlayerIndex = 0;
        state.gameSettingsSet = false;

        if( state.players.length > 0 ){
            for (let i = 0; i < state.players.length; i++) {
                state.players[i].score = 0;
                state.players[i].winner = false;
            }
        }
    },
    
    setWinningPlayer: () => {
        state.players[state.gameCurPlayerIndex].winner = true;
        state.gameOver = true;
    },

    addRound: () => state.gameRound++,
    addPoint: () => state.players[state.gameCurPlayerIndex].score++,
    removePoint: () => state.players[state.gameCurPlayerIndex].score--,
    setWinningScore: (state,score) => (state.gameWinningScore = score),
    
    // setTodos: (state, todos) => (state.todos = todos),
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