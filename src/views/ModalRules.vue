<template>
    <div>
        <h2>Change rules</h2>
        <FormInputRange
            v-model="gameModeSettings.maxPlayers"
            :min="2" 
            :max="8" 
            label="Players" 
        />
        <FormInputRange
            v-if="mode ==='survival'"
            v-model="gameModeSettings.playerLives"
            :min="1"
            :max="5"
            label="Lives" 
        />
        <FormInputSelect 
            v-if="mode ==='classic'"
            v-model="gameModeSettings.targetScore" 
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
    import { mapActions } from 'vuex';
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
                    playerLives: 3,
                    placeHolderText : classic.placeHolder,
                    scoreOptions: classic.options
                }
            };
        },
        mounted: function(){
            this.button.label = this.button.states.neutral;
        },
        methods:{
            ...mapActions(['setWinningScore','setPlayerLives','settingsSet','setMaxPlayers']),
            saveGameSettings() {
                const winningScore = parseInt(this.gameModeSettings.targetScore);
                const playerLives = parseInt(this.gameModeSettings.playerLives);
                const maxPlayers = parseInt(this.gameModeSettings.maxPlayers);

                this.setMaxPlayers(maxPlayers);
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
        components:{
            FormInputRange,
            FormInputSelect
        }
    }
</script>

<style>

</style>
