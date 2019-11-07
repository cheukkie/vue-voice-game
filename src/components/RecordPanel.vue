<template>
    <div>
        <RecordBtn ref="recordButton" v-if="showRecordBtn" :showPulse="true" @recordBtnOutput="checkOutput" color="red" />
        <br><br>
        <div class="btn-group">
            <button class="btn" v-if="!showNextPlayerBtn" @click="skipWord">Skip word</button>
        </div>
        <div v-if="resultStatus=== 'success'">
            <h2>Good job!</h2>
            <p>
                We heard your word <strong>{{ word.current }}</strong> correctly!
            </p>
        </div>
        <div v-else-if="resultStatus === 'error'">
            <h2>That's too bad!</h2>
            <p>
                Your word was {{word.current}}.<br>
                We heard <span v-if="word.output">{{ word.output }}</span><span v-else>nothing</span>.
            </p>
        </div>
        <button v-if="showNextPlayerBtn" class="btn" @click="selectNextPlayer" title="Next player">
            Next player
        </button>

        <NotificationContainer v-if="showRecordBtn" :auto-hide-after="5" type="modal" role="default" pos-x="center" pos-y="center">
            <h2>{{ player.name }}</h2>
            <br><br>
            <p>
                Your word is<br>
                <strong class="current-word">{{ word.current }}</strong>
            </p>
            <br><br><br>
            <p>Start saying the word in...</p>
            <br>
            <CountDown @countDownFinished="clickRecord" :time="5" />
        </NotificationContainer>
        
        <AudioWave :animate="isWaveStarted" />
    </div>
</template>

<script>
    import { getRandomInt } from '@/utils/utils';
    import { mapActions, mapGetters } from 'vuex';

    import RecordBtn from '@/components/RecordBtn.vue';
    import AudioWave from '@/components/AudioWave.vue';
    import CountDown from '@/components/CountDown.vue';
    import NotificationContainer from '@/components/NotificationContainer.vue';

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
                resultStatus: '',
                
                word:{
                    output: '',
                    current: '',
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
                }

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
                this.word.output = '';
                this.showNextPlayerBtn = false;
                this.showRecordBtn = true;
                this.resultStatus = '';
                this.word.current = this.word.list[getRandomInt(0, this.word.list.length)];
            },
            skipWord(){
                this.showNextPlayerBtn = true;
                this.showRecordBtn = false;
                this.resultStatus = 'error';
                //this.removePoint();
            },
            checkWord() {
                console.log('output: ' + this.word.output.toLowerCase().replace(/\s/g, ''));
                console.log('current: ' + this.word.current.toLowerCase().replace(/\s/g, ''));
                if (this.word.output.toLowerCase().replace(/\s/g, '') === this.word.current.toLowerCase().replace(/\s/g, '')) {
                    this.addPoint();
                    this.resultStatus = 'success';
                }
                if (
                    this.word.output.toLowerCase().replace(/\s/g, '') !== this.word.current.toLowerCase().replace(/\s/g, '')
                ) {
                    this.resultStatus = 'error';
                    if( this.player.score >= 1 ){
                        //this.removePoint();
                    }
                }
                this.showNextPlayerBtn = true;
            },
            checkOutput(word) {
                this.word.output = word;
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
    .btn-group{
        position: relative;
    }
</style>