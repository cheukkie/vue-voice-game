<template>
    <div>
        <h2>Change rules</h2>
        <FormInputRange v-model="gameModeSettings.maxPlayers" :min="2" :max="4" label="Players" />
        <FormInputSelect v-model="gameModeSettings.targetScore" placeholder="Select win score - default 5"
            :options="gameModeSettings.scoreOptions" />
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

    export default {
        data: function () {
            return {
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
                    scoreOptions: [{
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
                    }]
                }
            };
        },
        mounted: function(){
            this.button.label = this.button.states.neutral;
        },
        methods:{
            ...mapActions(['setWinningScore','settingsSet','setMaxPlayers']),
            saveGameSettings() {
                const winningScore = parseInt(this.gameModeSettings.targetScore);
                const maxPlayers = parseInt(this.gameModeSettings.maxPlayers);

                this.setMaxPlayers(maxPlayers);
                this.setWinningScore(winningScore);
                this.settingsSet();
                
                this.button.label = this.button.states.progress;

                setTimeout(()=>{
                    this.button.label = this.button.states.success;
                },1500);
                setTimeout(()=>{
                    this.button.label = this.button.states.neutral;
                },3000);
                
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
