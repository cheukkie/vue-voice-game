//import axios from 'axios';
import { shuffleArray } from '@/js/utils.js';

const state = {
    players: [],
    current_player_index: 0,
    max_lives: 3,
    max_players: 1,
};

const getters = {
    curPlayer: state => state.players[state.current_player_index],
};

const actions = {

    addPlayer({ commit }, player) {
        commit('NEW_PLAYER', {
            name: player,
            score: 0,
            lives: state.max_lives,
            winner: false,
            currentPlayer: false
        });
    },
    
    setMaxPlayers({commit},qty){
        commit('SET_MAX_PLAYERS',qty);
    },

    keepFirstPlayer({commit}){
        commit('KEEP_FIRST_PLAYER');
    },

    removePlayer({commit},player){
        commit('DELETE_PLAYER', player);
    },
    
    nextPlayer({commit}){
        commit('SELECT_NEXT_PLAYER');
        commit('SET_PLAYER_ACTIVE');
    },

    selectFirstPlayer({commit}){
        commit('SELECT_FIRST_PLAYER');
        commit('SET_PLAYER_ACTIVE');
    },

    setPlayerLives({commit},lives){
        commit('SET_PLAYER_LIVES',lives);
    },

    setWinningPlayer({commit},playerIndex){
        commit('SET_WINNING_PLAYER',playerIndex);
    },

    addPoint({commit}){
        commit('ADD_POINT');
    },

    removePoint({commit}){
        commit('REMOVE_POINT');
    },

    removeLife({commit}){
        commit('REMOVE_LIFE');
    },

};

const mutations = {
    NEW_PLAYER: (state, player) => state.players.push(player),
    DELETE_PLAYER: (state,player )=> state.players.splice(player,1),
    KEEP_FIRST_PLAYER: () => state.players = state.players.splice(1),
    SELECT_FIRST_PLAYER: () => state.current_player_index = 0,
    SELECT_NEXT_PLAYER: () => state.current_player_index++,
    SET_PLAYER_ACTIVE: () => {
        for (let i = 0; i < state.players.length; i++) {
            state.players[i].currentPlayer = false;
        }
        state.players[state.current_player_index].currentPlayer = true;
    },
    SHUFFLE_PLAYERS: () => state.players = shuffleArray(state.players),
    SET_PLAYER_LIVES: (state,lives) => {
        state.max_lives = lives;
        for (let i = 0; i < state.players.length; i++) {
            state.players[i].lives = state.max_lives;
        }
    },
    SET_WINNING_PLAYER: (state,playerIndex) => {
        if( state.players[playerIndex] ){
            state.players[playerIndex].winner = true;
            state.gameOver = true;
        }
        if( state.players.length > 0 ){
            for (let i = 0; i < state.players.length; i++) {
                state.players[i].currentPlayer = false;
            }
        }
    },
    SET_MAX_PLAYERS: (state,qty) => { state.max_players = qty; },

    ADD_POINT: () => state.players[state.current_player_index].score++,
    ADD_LIFE: () => state.players[state.current_player_index].lives++,
    REMOVE_LIFE: () => {state.players[state.current_player_index].lives--},
    REMOVE_POINT: () => state.players[state.current_player_index].score--,
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};