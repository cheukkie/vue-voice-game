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
        commit('SETTINGS_SET');
    },

    resetGame({commit}){
        commit('RESET_GAME');
    },

    removePlayer({commit},player){
        //test
        commit('DELETE_PLAYER', player);
        console.log(commit);
        console.log(player);
    },

    addPlayer({ commit }, player) {
        commit('NEW_PLAYER', {
            name: player,
            score: 0,
            winner: false
        });
    },

    nextPlayer({commit}){
        if( (state.gameCurPlayerIndex+1) < state.players.length ){
            commit('SELECT_NEXT_PLAYER');
        }else{
            // const reachedScore = state.players.filter(player=>{
            //     return player.score >= state.gameWinningScore;
            // });
            // console.log( reachedScore );
            commit('SELECT_FIRST_PLAYER');
            commit('ADD_ROUND');
        }
    },

    addPoint({commit}){
        commit('ADD_POINT');
        if( state.players[state.gameCurPlayerIndex].score >= state.gameWinningScore ){
            commit('SET_WINNING_PLAYER');
        }
    },

    removePoint({commit}){
        commit('REMOVE_POINT');
    },

    setWinningScore({commit},score){
        commit('SET_WINNING_SCORE',score);
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
    //MAKE MUTATIONS ALL CAPS
    NEW_PLAYER: (state, player) => state.players.unshift(player),
    DELETE_PLAYER: (state,player )=> state.players.splice(player,1),
    SELECT_FIRST_PLAYER: () => state.gameCurPlayerIndex = 0,
    SELECT_NEXT_PLAYER: () => state.gameCurPlayerIndex++,

    SETTINGS_SET: () => state.gameSettingsSet = true,
    RESET_GAME: () => {
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
    
    SET_WINNING_PLAYER: () => {
        state.players[state.gameCurPlayerIndex].winner = true;
        state.gameOver = true;
    },

    ADD_ROUND: () => state.gameRound++,
    ADD_POINT: () => state.players[state.gameCurPlayerIndex].score++,
    REMOVE_POINT: () => state.players[state.gameCurPlayerIndex].score--,
    SET_WINNING_SCORE: (state,score) => (state.gameWinningScore = score),
    
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