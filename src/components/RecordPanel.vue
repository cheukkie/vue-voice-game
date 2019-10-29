<template>
    <div>
        <div>
            {{ player.name }} is aan de beurt! <br><br>
        </div>
        <div>
            <span v-if="word">Lees op: {{ word }}</span> <span v-if="output"> - Output: {{ output }}</span>
        </div>
        <RecordBtn v-if="showRecordBtn" @recordBtnOutput="checkOutput" color="red"/>
        <button class="btn" v-if="showNextPlayerBtn" @click="selectNextPlayer" title="Next player">
            Next
        </button>
    </div>
</template>

<script>
    import { getRandomInt } from '@/utils/utils';
    import { mapActions, mapGetters } from 'vuex';
    
    import RecordBtn from '@/components/RecordBtn.vue';

    export default {
        name: 'RecordPanel',
        props: {
            player: Object
        },
        data: function () {
            return {           
                showNextPlayerBtn: false,
                showRecordBtn: false,
                output: '',     
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
                    'Aansprakelijkheidsverzekeraar',
                    'Huwelijksvruchtbaarheidscijfer',
                    'Vertegenwoordigingsovereenkomst',
                    'Kunstnijverheidstentoonstelling',
                    'Chronischevermoeidheidssyndroom',
                    'Medeverantwoordelijkheidsheffing',
                    'Aankoopwaardegarantieverzekering',
                    'Arbeidsongeschiktheidsverzekering',
                    'Pensioenfondstoetredingsvoorwaarden',
                    'Elektriciteitsproductiemaatschappij',
                    'Hippopotomonstrosesquippedaliofobie',
                    'Zandzeepsodemineraalwatersteenstralen',

                ],
                word: ''
            };
        },
        mounted: function () {
            this.resetRound();
        },
        
        methods: {
            ...mapActions(['nextPlayer', 'addPoint', 'removePoint']),
            selectNextPlayer() {
                this.nextPlayer();
                this.resetRound();
            },
            resetRound() {
                this.output = '';
                this.showNextPlayerBtn = false;
                this.showRecordBtn = true;
                if (!this.retry) {
                    this.word = this.list[getRandomInt(0, this.list.length)];
                }
            },
            checkWord(){
                if (this.output.toLowerCase().replace(' ','') === this.word.toLowerCase().replace(' ','')) {
                    this.addPoint();
                }
                if (
                    this.output.toLowerCase().replace(' ','') !== this.word.toLowerCase().replace(' ','') &&
                    this.player.score >= 1
                ) {
                    this.removePoint();
                }
                this.showNextPlayerBtn = true;
            },
            checkOutput(word){
                this.output = word;
                this.checkWord();
                this.showRecordBtn = false;
            }
        },
        components:{
            RecordBtn
        }
    };
</script>

<style >
    
</style>