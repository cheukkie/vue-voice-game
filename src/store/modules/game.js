const state = {
    round: 1,
    started: false,
    winning_score: 5,
    game_over: false,
    settings_set: false,
};

const getters = {
    
};

const actions = {
    startGame({commit}){
        commit('START_GAME');
        commit('players/SHUFFLE_PLAYERS', null, { root: true });
        commit('players/SET_PLAYER_ACTIVE', null, { root: true });        
    },
    
    setWinningScore({commit},score){
        commit('SET_WINNING_SCORE',score);
    },

    settingsSet({commit}){
        commit('SETTINGS_SET');
    },

    resetGame({commit}){
        commit('RESET_GAME');
    },
    addRound({commit}){
        commit('ADD_ROUND');
    },
};

const mutations = {
    SET_TEST: (state,payload) => state.test = payload,
    ADD_ROUND: () => state.round++,
    SET_WINNING_SCORE: (state,score) => (state.winning_score = score),

    SETTINGS_SET: () => state.settings_set = true,

    START_GAME: () => {
        state.started = true;
    },
    RESET_GAME: () => {
        state.started = false;
        state.game_over = false;
        state.round = 1;
        state.winning_score = 5;
        state.gameCurPlayerIndex = 0;
        state.settings_set = false;

        if( state.players.length > 0 ){
            for (let i = 0; i < state.players.length; i++) {
                state.players[i].score = 0;
                state.players[i].winner = false;
                state.players[i].currentPlayer = false;
            }
        }
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};