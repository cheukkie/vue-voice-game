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
               
        <div v-if="resultStatus" :class="`card is-${resultStatus}`">
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
                    <h2>
                        <span v-if="word.output">That's too bad!</span>
                        <span v-else>You skipper!</span>
                    </h2>
                    <p>
                        Your word was <strong>{{word.current}}</strong>.<br>
                        <span v-if="word.output">We heard {{ word.output }}</span> 
                        <span v-else>Better luck next time!</span>.
                    </p>
                </div>
            </main>
            <footer>
                <button v-if="showNextPlayerBtn" class="btn" @click="selectNextPlayer" title="Next">
                    Next
                </button>
            </footer>
        </div>
        
        <AudioWave :animate="isWaveInit" :visible="showAudioWave" :mobileUser="isMobileUser" />
    </div>
</template>

<script>
    import { getRandomInt } from '@/js/utils';
    import { createNamespacedHelpers } from 'vuex';

    const {
        mapState: mapGameState 
    } = createNamespacedHelpers('game');

    const {
        mapState: mapPlayersState,
        mapGetters: mapPlayersGetters,
        mapActions: mapPlayersActions,
    } = createNamespacedHelpers('players');
    const {
        mapState: mapConfigState,
    } = createNamespacedHelpers('config');

    import RecordBtn from '@/components/RecordBtn.vue';
    import AudioWave from '@/components/AudioWave.vue';
    import CountDown from '@/components/CountDown.vue';

    export default {
        name: 'RecordPanel',
        props: {
            player: Object,
            mode: String,
            category: String
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
            ...mapPlayersActions([
                'nextPlayer',
                'selectFirstPlayer', 
                'addPoint',
                'addRound', 
                'removePoint',
                'removeLife',
                'setWinningPlayer'
            ]),
            selectNextPlayer() {
                if( this.category === 'multi' ){
                    if( (this.curPlayerIndex+1) < this.getAllPlayers.length ){
                        this.nextPlayer();
                    }else{
                        this.selectFirstPlayer();
                        this.addRound();
                    }
                }
                this.resetRound();
            },
            clickRecord(val){
                this.showAudioWave = true;
                this.$refs.recordButton.$el.click();
                this.$refs.cardCurrent.classList.add('is-hidden');
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
                if( this.mode === 'survival' && this.player.lives >= 1 ){
                    this.removeLife();
                    this.checkWinner();
                }
            },
            cleanWord(input){
                return input.toLowerCase().replace(/\s/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            },
            checkWord() {
                console.log('output: ' + this.word.output.toLowerCase().replace(/\s/g, ''));
                console.log('current: ' + this.word.current.toLowerCase().replace(/\s/g, ''));
                
                if ( this.cleanWord(this.word.output) === this.cleanWord(this.word.current) ){
                    this.resultStatus = 'success';
                    if( this.mode === 'classic' ){
                        this.addPoint();
                    }
                    if( this.category === 'single' ){
                        this.addRound();
                    }
                }
                if ( this.cleanWord(this.word.output) !== this.cleanWord( this.word.current ) ){
                    this.resultStatus = 'error';
                    if( this.mode === 'survival' && this.player.lives >= 1 ){
                        this.removeLife();
                    }
                    // if( this.mode === 'classic' this.player.score >= 1 ){
                    //     this.removePoint();
                    // }
                }
                this.checkWinner();
                this.showNextPlayerBtn = true;
            },
            checkOutput(word) {
                if( word !== '' ){
                    this.word.output = word;
                    this.checkWord();
                    this.showRecordBtn = false;
                }
            },
            checkWinner(){
                //classic
                if( this.mode === 'classic' && this.getCurrentPlayer.score >= this.getWinningScore ){
                    this.setWinningPlayer(this.curPlayerIndex);
                    this.$router.push(`/${this.category}/${this.mode}/winner`);
                }
                //survival
                if( this.mode === 'survival' ){
                    if( this.category === 'multi' ){
                        const survivors = this.getAllPlayers.filter( survivor =>{
                            if(survivor.lives > 0){
                                return survivor;
                            }
                        })
                        if( survivors.length === 1){
                            const winner = this.getAllPlayers.findIndex(x => x === survivors[0]);
                            this.setWinningPlayer(winner);
                            this.$router.push(`/${this.category}/${this.mode}/winner`);
                        }
                    }
                    if( this.category === 'single' && this.getCurrentPlayer.lives === 0 ){
                        console.log(`You've reached ${this.getCurrentRound} rounds`);
                        this.setWinningPlayer(this.curPlayerIndex);
                        this.$router.push(`/${this.category}/${this.mode}/winner`);
                    }
                }
            }
        },
        computed:{
            ...mapConfigState({
                isMobileUser: state => state.mobile
            }),
            ...mapGameState({
                getCurrentRound: state => state.round,
            }),
            ...mapPlayersState({
                getAllPlayers: state => state.players,
                getWinningScore: state => state.winning_score,
                curPlayerIndex: state => state.current_player_index,
            }),
            ...mapPlayersGetters(['getCurrentPlayer']),
        },
        components: {
            RecordBtn,
            AudioWave,
            CountDown
        }
    };
</script>

<style lang="scss" scoped>
    .card{
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 60vh;

        width: calc(100vw - 30px);
        width: calc(100vw - 3rem);
        @include rem(max-width, 480px);
        @include rem(border-radius, 5px);

        background-color: $color4;
        padding: 20px;
        margin: auto;
        color: #ffffff;
        
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        box-shadow: 0 15px 40px 5px rgba($color4, 0.5);
        box-shadow: 0 1.5rem 4rem .5rem rgba($color4, 0.5);

        transition: all 0.25s ease;

        .btn:not(:hover){
            color: $color4;
        }

        svg{
            path{
                fill: #ffffff;
            }
        }
        .icon{
            @include rem(height, 50px);
        }

        &.is-success{
            background-color: $color3;
            box-shadow: 0 15px 40px 5px rgba($color3, 0.5);
            box-shadow: 0 1.5rem 4rem .5rem rgba($color3, 0.5);
            .btn:not(:hover){
                color: $color3;
            }
        }

        &.is-warning{
            background-color: $color1;
            box-shadow: 0 15px 40px 5px rgba($color1, 0.5);
            box-shadow: 0 1.5rem 4rem .5rem rgba($color1, 0.5);
            .btn:not(:hover){
                color: $color1;
            }
        }

        &.is-error{
            background-color: $color2;
            box-shadow: 0 15px 40px 5px rgba($color2, 0.5);
            box-shadow: 0 1.5rem 4rem .5rem rgba($color2, 0.5);
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
            @include rem(font-size, 30px);
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
        @include rem(margin, 30px auto);
        &[disabled]{
            opacity: 1;
        }
    }

</style>