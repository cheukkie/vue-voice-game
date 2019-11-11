<template>
    <div>
        <div class="card" ref="cardCurrent" v-if="showRecordBtn">
            <main>
                <h2>{{ player.name }}</h2>
                <p>
                    Your word is<br>
                    <strong class="current">{{ word.current }}</strong>
                </p>
            </main>
            <footer>
                <p>Start saying the word in...</p>
                <CountDown @countDownFinished="clickRecord" :time="cardVisibleTime" />
            </footer>
        </div>

        <RecordBtn class="record-btn" ref="recordButton" v-if="showRecordBtn" :showPulse="true" @recordBtnOutput="checkOutput" color="red" />
        <div class="btn-group">
            <button class="btn" v-if="!showNextPlayerBtn" @click="skipWord">Skip word</button>
        </div>
        
        
        <div v-if="resultStatus" :class="'card is-'+resultStatus">
            <main>
                <div v-if="resultStatus=== 'success'">
                    <div class="icon">
                        <div class="svg-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M5 22h-5v-12h5v12zm17.615-8.412c-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.666-.198-4.979-.885.906-3.656.688-8.781-1.688-8.781-1.594 0-1.896 1.807-2.375 3.469-1.221 4.242-3.312 6.017-5.687 6.885v10.878c4.382.701 6.345 2.768 10.505 2.768 3.198 0 4.852-1.735 4.852-2.666 0-.335-.272-.573-.96-.626-.811-.062-.734-.812.031-.953 1.268-.234 1.826-.914 1.826-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.133-.09 1.688-.764 1.688-1.41 0-.565-.424-1.109-1.26-1.221z"/></svg>
                        </div>
                    </div>
                    <h2>Good job!</h2>
                    <p>
                        We heard your word <strong>{{ word.current }}</strong> correctly!
                    </p>
                </div>
                <div v-else-if="resultStatus === 'error'">
                    <div class="icon">
                        <div class="svg-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M5 14h-5v-12h5v12zm18.875-4.809c0-.646-.555-1.32-1.688-1.41-.695-.055-.868-.623-.031-.812.701-.159 1.098-.652 1.098-1.181 0-.629-.559-1.309-1.826-1.543-.766-.141-.842-.891-.031-.953.688-.053.96-.291.96-.626-.001-.931-1.654-2.666-4.852-2.666-4.16 0-6.123 2.067-10.505 2.768v10.878c2.375.869 4.466 2.644 5.688 6.886.478 1.661.781 3.468 2.374 3.468 2.375 0 2.594-5.125 1.688-8.781 1.312-.688 3.751-.936 4.979-.885 1.771.072 2.271-.818 2.271-1.49 0-1.011-.833-1.35-1.354-1.51-.609-.188-.889-.807-.031-.922.836-.112 1.26-.656 1.26-1.221z"/></svg>
                        </div>
                    </div>
                    <h2>That's too bad!</h2>
                    <p>
                        Your word was <strong>{{word.current}}</strong>.<br>
                        We heard <span v-if="word.output">{{ word.output }}</span><span v-else>nothing</span>.
                    </p>
                </div>
            </main>
            <footer>
                <button v-if="showNextPlayerBtn" class="btn" @click="selectNextPlayer" title="Next player">
                    Next player
                </button>
            </footer>
        </div>
        
        <AudioWave :animate="isWaveInit" :visible="showAudioWave" :mobileUser="isMobileUser" />
    </div>
</template>

<script>
    import { getRandomInt } from '@/js/utils';
    import { mapActions, mapGetters } from 'vuex';

    import RecordBtn from '@/components/RecordBtn.vue';
    import AudioWave from '@/components/AudioWave.vue';
    import CountDown from '@/components/CountDown.vue';

    export default {
        name: 'RecordPanel',
        props: {
            player: Object
        },
        data: function () {
            return {
                isWaveInit: false,
                showAudioWave: false,
                showNextPlayerBtn: false,
                showRecordBtn: false,
                resultStatus: '',

                cardVisibleTime: 5,
                
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
                    ],
                }

            };
        },
        mounted: function () {
            this.resetRound();
            this.isWaveInit = true;
        },

        methods: {
            ...mapActions(['nextPlayer', 'addPoint', 'removePoint']),
            selectNextPlayer() {
                this.nextPlayer();
                this.resetRound();
            },
            clickRecord(val){
                this.showAudioWave = true;
                this.$refs.recordButton.$el.click();
                this.$refs.cardCurrent.classList.add('is-hidden')
            },
            resetRound() {
                this.word.output = '';
                this.showAudioWave = false;
                this.showNextPlayerBtn = false;
                this.showRecordBtn = true;
                this.resultStatus = '';
                this.word.current = this.word.list[getRandomInt(0, this.word.list.length)];
            },
            skipWord(){
                this.showNextPlayerBtn = true;
                this.showRecordBtn = false;
                this.showAudioWave = false;
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
        computed:{
            ...mapGetters(['isMobileUser']),
        },
        components: {
            RecordBtn,
            AudioWave,
            CountDown
        }
    };
</script>

<style lang="scss" scoped>
    @import '@/styles/setup/_variables.scss';
    .card{
        position: fixed;
        z-index: 1;
        background-color: $color4;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 60vh;
        padding: 20px;
        max-width: 640px;

        width: calc(100vw - 30px);
        margin: auto;
        color: #ffffff;
        border-radius: 5px;
        
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        transition: all 0.25s ease;

        svg{
            path{
                fill: #ffffff;
            }
        }
        .icon{
            height: 50px;
        }

        &.is-success{
            background-color: $color3;
            .btn:not(:hover){
                color: $color3;
            }
        }
        &.is-error{
            background-color: $color2;
            .btn:not(:hover){
                color: $color2;
            }
        }

        &.is-hidden{
            opacity: 0;
            visibility: hidden;
        }
        .current{
            word-break: break-all;
            font-size: 30px;
        }
        @media screen and (max-height: 480px) and (orientation: landscape) {
            height: 70vh;
            flex-direction: row;
            align-items: center;
        }
    }

    .btn-group{
        position: relative;
    }
    .record-btn{
        margin: 30px auto;
        &[disabled]{
            opacity: 1;
        }
    }

</style>