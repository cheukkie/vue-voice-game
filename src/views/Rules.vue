<template>
    <div>
        <h2>Rules</h2>
        <FormInputRange v-model="gameModeSettings.maxPlayers" :min="2" :max="4" label="Spelers" />
        <FormInputSelect v-model="gameModeSettings.targetScore" placeholder="Select win score - default 5"
            :options="gameModeSettings.scoreOptions" />
        <br>
        <router-link to="/multiplayer/players">
            <button class="btn" @click="saveGameSettings">Opslaan</button>
        </router-link>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import FormInputRange from '@/components/FormInputRange.vue';
    import FormInputSelect from '@/components/FormInputSelect.vue';

    export default {
        data: function () {
            return {
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
        methods:{
            ...mapActions(['setWinningScore','settingsSet','setMaxPlayers']),
            saveGameSettings() {
                const winningScore = parseInt(this.gameModeSettings.targetScore);
                const maxPlayers = parseInt(this.gameModeSettings.maxPlayers);

                this.setMaxPlayers(maxPlayers);
                this.setWinningScore(winningScore);
                this.settingsSet();
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
