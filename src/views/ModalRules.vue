<template>
    <div>
        <h2>Change rules</h2>
        <FormInputRange
            v-model="gameModeSettings.maxPlayers"
            :min="2" 
            :max="8"
            :value="gameModeSettings.maxPlayers"
            label="Players" 
        />
        <FormInputRange
            v-if="mode ==='survival'"
            v-model.number="gameModeSettings.playerLives"
            :min="1"
            :max="5"
            :value="gameModeSettings.playerLives"
            label="Lives" 
        />
        <FormInputSelect 
            v-if="mode ==='classic'"
            v-model.number="gameModeSettings.targetScore" 
            :placeholder="gameModeSettings.placeHolderText"
            :options="gameModeSettings.scoreOptions" 
        />
        <br>
        <button class="btn is-block" @click="saveGameSettings">
            {{ button.label }}
        </button>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';

    const {
        mapActions: mapGameActions,
    } = createNamespacedHelpers('game');
    const {
        mapState: mapPlayersState,
        mapActions: mapPlayersActions,
    } = createNamespacedHelpers('players');

    import FormInputRange from '@/components/FormInputRange.vue';
    import FormInputSelect from '@/components/FormInputSelect.vue';

    const classic = {
        placeHolder: 'Select win score - default 5',
        options: [
            {
                value: 5,
                label: 'Winscore: 5'
            },{
                value: 10,
                label: 'Winscore: 10'
            }, {
                value: 15,
                label: 'Winscore: 15'
            }, {
                value: 20,
                label: 'Winscore: 20'
            }, {
                value: 30,
                label: 'Winscore: 30'
            }
        ]
    }

    export default {
        data: function () {
            return {
                category : this.$route.params.category,
                mode : this.$route.params.mode,
                button:{
                    label: '',
                    states: {
                        neutral: 'Save',
                        progress: 'Saving rules...',
                        success: 'Rules saved!',
                    }
                },
                gameModeSettings: {
                    maxPlayers: 2,
                    targetScore: 5,
                    playerLives: 1,
                    placeHolderText : classic.placeHolder,
                    scoreOptions: classic.options
                }
            };
        },
        mounted: function(){
            this.button.label = this.button.states.neutral;
        },
        created: function(){
            this.gameModeSettings.playerLives = this.maxLives;
            this.gameModeSettings.maxPlayers = this.maxLives;
        },
        methods:{
            ...mapGameActions([
                'setWinningScore',
                'settingsSet',
            ]),
            ...mapPlayersActions([
                'setMaxPlayers',
                'setPlayerLives',
            ]),
            saveGameSettings() {
                const winningScore = parseInt(this.gameModeSettings.targetScore);
                const playerLives = parseInt(this.gameModeSettings.playerLives);
                const newMaxPlayers = parseInt(this.gameModeSettings.maxPlayers);

                this.setMaxPlayers(newMaxPlayers);
                this.setPlayerLives(playerLives);
                this.setWinningScore(winningScore);
                this.settingsSet();
                
                this.button.label = this.button.states.progress;

                setTimeout(()=>{
                    this.button.label = this.button.states.success;
                },1000);
                setTimeout(()=>{
                    this.button.label = this.button.states.neutral;
                },2000);
                
            }
        },
        computed:{
            ...mapPlayersState({
                maxLives: state => state.max_lives,
                maxLives: state => state.max_players,
            }),
        },
        components:{
            FormInputRange,
            FormInputSelect
        }
    }
</script>

<style>

</style>
