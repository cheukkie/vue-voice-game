<template>
    <div>
        <span v-if="output"> - Output: {{ output }}</span>
        <RecordBtn ref="recordButton" v-if="showRecordBtn" :showPulse="true" @recordBtnOutput="checkOutput" color="red" />
        <button class="btn" v-if="showNextPlayerBtn" @click="selectNextPlayer" title="Next player">
            Next
        </button>

        <NotificationContainer v-if="showRecordBtn" :auto-hide-after="5" type="modal" role="default" pos-x="center" pos-y="center">
            <h2>{{ player.name }}</h2>
            <br>
            <p>
                Your word is<br>
                <strong class="current-word">{{ word }}</strong>
            </p>
            <br><br><br>
            <CountDown @countDownFinished="clickRecord" :time="5" />
        </NotificationContainer>
        <AudioWave :animate="isWaveStarted" />
    </div>
</template>

<script>
    import {
        getRandomInt
    } from '@/utils/utils';
    import {
        mapActions,
        mapGetters
    } from 'vuex';

    import RecordBtn from '@/components/RecordBtn.vue';
    import AudioWave from '@/components/AudioWave.vue';
    import NotificationContainer from '@/components/NotificationContainer.vue';
    import CountDown from '@/components/CountDown.vue';

    export default {
        name: 'RecordPanel',
        props: {
            player: Object
        },
        data: function () {
            return {
                isWaveStarted: false,
                showNextPlayerBtn: false,
                showRecordBtn: false,
                output: '',
                word: '',
                list: [
                    'Inhoud',
                    'Sensor',
                    'Obligaat',
                    'Redmiddel',
                    'Snoeperij',
                    'Indiaanse',
                    'Hemelhoog',
                    'Enquêteur',
                    'Begintune',
                    'Wonderblad',
                    'Wintergoed',
                    'Winterpeen',
                    'Voortrekker',
                    'Informatica',
                    'Warmvoelend',
                    'Onopvallend',
                    'Watergebrek',
                    'Zilverfolie',
                    'Reaffectatie',
                    'Binnenpagina',
                    'Gekrenktheid',
                    'Zuidoostkust',
                    'Roddelaarster',
                    'Dopinggebruik',
                    'Olieproducent',
                    'Flexiemorfeem',
                    'Leeftijdsgroep',
                    'Zorgvoorziening',
                    'Nietradioactief',
                    'Gedesoriënteerd',
                    'Avonturenverhaal',
                    'Basisberoepsgericht',
                    'Leningenportefeuille',
                    'Burgemeestersbenoeming',
                    'Fietspompreparatiesetje',
                    'Vijfhonderdduizendklapper',
                ],

            };
        },
        mounted: function () {
            this.resetRound();
            this.isWaveStarted = true;
        },

        methods: {
            ...mapActions(['nextPlayer', 'addPoint', 'removePoint']),
            selectNextPlayer() {
                this.nextPlayer();
                this.resetRound();
            },
            clickRecord(val){
                this.$refs.recordButton.$el.click();
            },
            resetRound() {
                this.output = '';
                this.showNextPlayerBtn = false;
                this.showRecordBtn = true;
                if (!this.retry) {
                    this.word = this.list[getRandomInt(0, this.list.length)];
                }
            },
            checkWord() {
                console.log('output: ' + this.output.toLowerCase().replace(/\s/g, ''));
                console.log('word: ' + this.output.toLowerCase().replace(/\s/g, ''));
                if (this.output.toLowerCase().replace(/\s/g, '') === this.word.toLowerCase().replace(/\s/g, '')) {
                    this.addPoint();
                }
                if (
                    this.output.toLowerCase().replace(/\s/g, '') !== this.word.toLowerCase().replace(/\s/g, '') &&
                    this.player.score >= 1
                ) {
                    //this.removePoint();
                }
                this.showNextPlayerBtn = true;
            },
            checkOutput(word) {
                this.output = word;
                this.checkWord();
                this.showRecordBtn = false;
            }
        },
        components: {
            RecordBtn,
            AudioWave,
            NotificationContainer,
            CountDown
        }
    };
</script>

<style lang="scss" scoped>
    .current-word{
        word-break: break-all;
        font-size: 30px;
    }
</style>