//import axios from 'axios';
import { shuffleArray } from '@/js/utils.js';

const state = {
    players: [],
    
    gameStarted: false,
    gameRound: 1,
    gameCurPlayerIndex: 0,
    gameWinningScore: 5,
    gameOver: false,
    gameSettingsSet: false,
    gameMaxPlayers: 2,

    waveAnimation: false,
    mobileUser: false
};

const getters = {
    allPlayers: state => state.players,
    curPlayer: state => state.players[state.gameCurPlayerIndex],
    curRound: state => state.gameRound,
    gameWinningScore: state => state.gameWinningScore,
    gameOverStatus: state => state.gameOver,
    gameSettingsStatus: state => state.gameSettingsSet,
    gameStarted: state => state.gameStarted,
    maxPlayers: state => state.gameMaxPlayers,

    isAudioWaveStarted: state => state.waveAnimation,
    isMobileUser: state => state.mobileUser
};

const actions = {

    startGame({commit}){
        commit('START_GAME');
        commit('SHUFFLE_PLAYERS');
        commit('MAKE_PLAYER_ACTIVE');
        // commit('MAKE_AUDIOWAVE_ACTIVE');
    },

    setWinningScore({commit},score){
        commit('SET_WINNING_SCORE',score);
    },

    settingsSet({commit}){
        commit('SETTINGS_SET');
    },

    setMobileUser({commit},user){
        commit('SET_MOBILE_USER',user);
    },

    setMaxPlayers({commit},qty){
        commit('SET_MAX_PLAYERS',qty);
    },

    resetGame({commit}){
        commit('RESET_GAME');
    },
    
    addPlayer({ commit }, player) {
        commit('NEW_PLAYER', {
            name: player,
            score: 0,
            winner: false,
            currentPlayer: false
        });
    },
    
    removePlayer({commit},player){
        commit('DELETE_PLAYER', player);
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
        commit('MAKE_PLAYER_ACTIVE');
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

   

};

const mutations = {
    NEW_PLAYER: (state, player) => state.players.push(player),
    DELETE_PLAYER: (state,player )=> state.players.splice(player,1),
    SELECT_FIRST_PLAYER: () => state.gameCurPlayerIndex = 0,
    SELECT_NEXT_PLAYER: () => state.gameCurPlayerIndex++,
    MAKE_PLAYER_ACTIVE: () => {
        for (let i = 0; i < state.players.length; i++) {
            state.players[i].currentPlayer = false;
        }
        state.players[state.gameCurPlayerIndex].currentPlayer = true;
    },

    MAKE_AUDIOWAVE_ACTIVE: () => state.waveAnimation = true,

    SHUFFLE_PLAYERS: () => state.players = shuffleArray(state.players),
    
    SETTINGS_SET: () => state.gameSettingsSet = true,

    SET_MOBILE_USER: (state,user) => state.mobileUser = user,

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
                state.players[i].currentPlayer = false;
            }
        }
    },
    
    SET_WINNING_PLAYER: () => {
        state.players[state.gameCurPlayerIndex].winner = true;
        state.gameOver = true;
        if( state.players.length > 0 ){
            for (let i = 0; i < state.players.length; i++) {
                state.players[i].currentPlayer = false;
            }
        }
    },

    ADD_ROUND: () => state.gameRound++,
    ADD_POINT: () => state.players[state.gameCurPlayerIndex].score++,
    REMOVE_POINT: () => state.players[state.gameCurPlayerIndex].score--,
    SET_WINNING_SCORE: (state,score) => (state.gameWinningScore = score),
    SET_MAX_PLAYERS: (state,qty) => { state.gameMaxPlayers = qty; },
    
};

export default {
    state,
    getters,
    actions,
    mutations
};