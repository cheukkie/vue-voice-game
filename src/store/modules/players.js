/* eslint-disable no-return-assign, no-shadow */
import { shuffleArray } from '@/js/utils';

const state = {
  players: [],
  current_player_index: 0,
  max_lives: 3,
  max_players: 1,
};

const getters = {
  getCurrentPlayer: (state) => state.players[state.current_player_index],
};
const actions = {

  // initStore({commit}){
  //     console.log('store init players');
  // },

  nextPlayer({ commit }) {
    commit('SELECT_NEXT_PLAYER');
    commit('SET_PLAYER_ACTIVE');
  },

  selectFirstPlayer({ commit }) {
    commit('SELECT_FIRST_PLAYER');
    commit('SET_PLAYER_ACTIVE');
  },

};

const mutations = {
  NEW_PLAYER: (state, playerName) => state.players.push({
    name: playerName,
    score: 0,
    lives: state.max_lives,
    winner: false,
    currentPlayer: false,
  }),
  DELETE_PLAYER: (state, player) => state.players.splice(player, 1),
  KEEP_FIRST_PLAYER: () => state.players = state.players.splice(1),
  SELECT_FIRST_PLAYER: () => state.current_player_index = 0,
  SELECT_NEXT_PLAYER: () => state.current_player_index + 1,
  SET_PLAYER_ACTIVE: () => {
    for (let i = 0; i < state.players.length; i + 1) {
      state.players[i].currentPlayer = false;
    }
    state.players[state.current_player_index].currentPlayer = true;
  },
  SHUFFLE_PLAYERS: () => state.players = shuffleArray(state.players),
  SET_PLAYER_LIVES: (state, lives) => {
    state.max_lives = lives;
    for (let i = 0; i < state.players.length; i + 1) {
      state.players[i].lives = state.max_lives;
    }
  },
  SET_WINNING_PLAYER: (state, playerIndex) => {
    if (state.players[playerIndex]) {
      state.players[playerIndex].winner = true;
      state.gameOver = true;
    }
    if (state.players.length > 0) {
      for (let i = 0; i < state.players.length; i + 1) {
        state.players[i].currentPlayer = false;
      }
    }
  },
  SET_MAX_PLAYERS: (state, qty) => { state.max_players = qty; },

  ADD_POINT: () => state.players[state.current_player_index].score += 1,
  ADD_LIFE: () => state.players[state.current_player_index].lives += 1,
  REMOVE_LIFE: () => { state.players[state.current_player_index].lives -= 1; },
  REMOVE_POINT: () => state.players[state.current_player_index].score -= 1,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
