<template>
    <div>
        <div>
            {{ this.player.name }}:{{ this.player.score }}
        </div>
        <button v-if="!recordingDone" @click="startDictation" :disabled="recording">
            <span v-if="!retry">Opnemen</span>
            <span v-else>Opnieuw opnemen</span>
        </button>
        <div>
            {{ error }}
        </div>
        <div>
            <span v-if="word">Lees op: {{ word }}</span> <span v-if="output"> - Output: {{ output }}</span>
        </div>
        <button v-if="recordingDone" @click="selectNextPlayer">Next player</button>
    </div>
</template>

<script>
    import { getRandomInt } from '@/utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'RecordBtn',
        props: {
            player: Object
        },
        data: function () {
            return {
                recording: false,
                recordingDone: false,
                recognition: null,
                retry: false,
                output: '',
                error: '',

                list: [
                    'Watergebrek',
                    'Don',
                    'Flexiemorfeem',
                    'Hemelhoog',
                    'Aansprakelijkheidsverzekeraar',
                    'Snoeperij',
                    'Warmvoelend',
                    'Leningenportefeuille',
                    'Inhoud',
                    'Caracole',
                    'Sensor',
                    'Obligaat',
                    'Spiraallijn',
                    'Wintergoed',
                    'Enquêteur',
                    'Begintune',
                    'Voortrekker',
                    'Reaffectatie',
                    'Avonturenverhaal',
                    'Wipperig',
                    'Dopinggebruik',
                    'Wonderblad',
                    'Burgemeestersbenoeming',
                    'Leeftijdsgroep',
                    'Olieproducent',
                    'Winterpeen',
                    'Nietradioactief',
                    'Indiaanse',
                    'Informatica',
                    'Onopvallend'
                ],
                word: ''
            };
        },
        mounted: function () {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.maxAlternatives = 3;
            this.recognition.lang = 'nl-NL';
        },
        methods: {
            ...mapGetters(['curPlayer']),
            ...mapActions(['nextPlayer','addPoint','removePoint']),
            selectNextPlayer(){
                this.nextPlayer();
                this.recordingDone = false;
                this.output = '';
                this.word = '';
            },
            resetRound() {
                this.output = '';
                this.error = '';
                if( !this.retry ){
                    this.word = this.list[getRandomInt(0, this.list.length)];
                }
                this.retry = false;
            },
            startDictation() {
                //let permission = false;
                const vm = this;

                this.resetRound();
                this.recognition.start();

                //1.
                this.recognition.onstart = function (e) {
                    console.log('onstart');
                    vm.recording = true;
                };
                //2.
                this.recognition.onaudiostart = function (e) {
                    console.log('audio start');
                };
                //3.
                this.recognition.onsoundstart = function (e) {
                    console.log('on sound start');
                };

                //4.
                this.recognition.onspeechstart = function (e) {
                    console.log('onspeechstart');
                };
                //5.
                this.recognition.onspeechend = function (e) {
                    console.log('onspeechend');
                };

                //6.
                this.recognition.onsoundend = function (e) {
                    console.log('on sound end');
                };
                //7.
                this.recognition.onaudioend = function (e) {
                    console.log('audio end');
                };
                //8.
                this.recognition.onend = function (e) {
                    console.log('on end');
                    //console.log(vm.output);
                    if (vm.output === '') {
                        console.log('Je moet wel iets zeggen ');
                        vm.retry = true;
                    }
                    if (
                        vm.output.toLowerCase() === vm.word.toLowerCase() ||
                        vm.output.toLowerCase().replace(' ', '') === vm.word.toLowerCase()
                    ) {
                        //vm.score++;
                        vm.addPoint();
                    }
                    if (
                        vm.output.toLowerCase() !== vm.word.toLowerCase() &&
                        vm.curPlayer().score >= 1
                    ) {
                        //vm.score--;
                        vm.removePoint();
                    }
                    vm.recording = false;
                };

                //---
                this.recognition.onerror = function (e) {
                    console.log(`error: ${e.error}`);
                    vm.error = e.error;
                };
                this.recognition.onnomatch = function (e) {
                    console.log('no match');
                };
                this.recognition.onresult = function (e) {
                    //console.log( e.results[0].length );
                    const altArray = [];
                    for (let i = 0; i < e.results[0].length; i++) {
                        const element = e.results[0][i].transcript;
                        altArray.push(element);
                    }
                    console.log(altArray);
                    console.log(`resultaat: ${e.results[0][0].transcript}`);

                    vm.output = e.results[0][0].transcript;
                    vm.recordingDone = true;
                };

                //---
            },
            stopDictation() {
                this.recognition.stop();
            }
        }
    };
</script>

<style>
</style>