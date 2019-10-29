//import axios from 'axios';
import { shuffleArray } from '@/utils/utils.js';

const state = {
    players: [],
    gameStarted: false,
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
    gameSettingsStatus: state => state.gameSettingsSet,
    gameStarted: state => state.gameStarted
};

const actions = {

    startGame({commit}){
        commit('START_GAME');
        commit('SHUFFLE_PLAYERS');
    },

    settingsSet({commit}){
        commit('SETTINGS_SET');
    },

    resetGame({commit}){
        commit('RESET_GAME');
    },

    removePlayer({commit},player){
        commit('DELETE_PLAYER', player);
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

};

const mutations = {
    //MAKE MUTATIONS ALL CAPS
    NEW_PLAYER: (state, player) => state.players.unshift(player),
    DELETE_PLAYER: (state,player )=> state.players.splice(player,1),
    SELECT_FIRST_PLAYER: () => state.gameCurPlayerIndex = 0,
    SELECT_NEXT_PLAYER: () => state.gameCurPlayerIndex++,
    SHUFFLE_PLAYERS: () => state.players = shuffleArray(state.players),

    SETTINGS_SET: () => state.gameSettingsSet = true,
    START_GAME: () => {
        state.gameStarted = true;
    },
    RESET_GAME: () => {
        state.gameStarted = false;
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
    
};

export default {
    state,
    getters,
    actions,
    mutations
};