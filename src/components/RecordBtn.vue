<template>
    <div>
        <div>
            {{ player.name }} is aan de beurt! <br><br>
        </div>
        <div>
            {{ error }}
        </div>
        <div>
            <span v-if="word">Lees op: {{ word }}</span> <span v-if="output"> - Output: {{ output }}</span>
        </div>
        <button v-if="!recordingDone" @click="startDictation" :disabled="recording">
            <span v-if="!retry && !recording" title="Record">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 10c0 2.209-1.791 4-4 4s-4-1.791-4-4v-6c0-2.209 1.791-4 4-4s4 1.791 4 4v6zm4-2v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2zm-7 13.03v-2.03h-2v2.03c-2.282.139-4 .744-4 1.47 0 .829 2.238 1.5 5 1.5s5-.671 5-1.5c0-.726-1.718-1.331-4-1.47z"/></svg>
            </span>
            <span v-else-if="recording" title="Recording...">
                <svg id="wave" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 38.05">
                    <path id="line_1" data-name="Line 1" d="M0.91,15L0.78,15A1,1,0,0,0,0,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H0.91Z"/>
                    <path id="line_2" data-name="Line 2" d="M6.91,9L6.78,9A1,1,0,0,0,6,10V28a1,1,0,1,0,2,0s0,0,0,0V10A1,1,0,0,0,7,9H6.91Z"/>
                    <path id="line_3" data-name="Line 3" d="M12.91,0L12.78,0A1,1,0,0,0,12,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H12.91Z"/>
                    <path id="line_4" data-name="Line 4" d="M18.91,10l-0.12,0A1,1,0,0,0,18,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H18.91Z"/>
                    <path id="line_5" data-name="Line 5" d="M24.91,15l-0.12,0A1,1,0,0,0,24,16v6a1,1,0,0,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H24.91Z"/>
                    <path id="line_6" data-name="Line 6" d="M30.91,10l-0.12,0A1,1,0,0,0,30,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H30.91Z"/>
                    <path id="line_7" data-name="Line 7" d="M36.91,0L36.78,0A1,1,0,0,0,36,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H36.91Z"/>
                    <path id="line_8" data-name="Line 8" d="M42.91,9L42.78,9A1,1,0,0,0,42,10V28a1,1,0,1,0,2,0s0,0,0,0V10a1,1,0,0,0-1-1H42.91Z"/>
                    <path id="line_9" data-name="Line 9" d="M48.91,15l-0.12,0A1,1,0,0,0,48,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H48.91Z"/>
                </svg>
            </span>
            <span v-else title="Try again">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.944 12.979c-.489 4.509-4.306 8.021-8.944 8.021-2.698 0-5.112-1.194-6.763-3.075l1.245-1.633c1.283 1.645 3.276 2.708 5.518 2.708 3.526 0 6.444-2.624 6.923-6.021h-2.923l4-5.25 4 5.25h-3.056zm-15.864-1.979c.487-3.387 3.4-6 6.92-6 2.237 0 4.228 1.059 5.51 2.698l1.244-1.632c-1.65-1.876-4.061-3.066-6.754-3.066-4.632 0-8.443 3.501-8.941 8h-3.059l4 5.25 4-5.25h-2.92z"/></svg>
            </span>
        </button>
        <button v-if="recordingDone" @click="selectNextPlayer" title="Next player">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 8v-4l8 8-8 8v-4h-5v-8h5zm-7 0h-2v8h2v-8zm-4.014 0h-1.986v8h1.986v-8zm-3.986 0h-1v8h1v-8z"/></svg>
        </button>
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
                    'Inhoud',
                    'Sensor',
                    'Obligaat',
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
                    'Spiraallijn',
                    'Warmvoelend',
                    'Onopvallend',
                    'Watergebrek',
                    'Reaffectatie',
                    'Dopinggebruik',
                    'Olieproducent',
                    'Flexiemorfeem',
                    'Leeftijdsgroep',
                    'Nietradioactief',
                    'Avonturenverhaal',
                    'Leningenportefeuille',
                    'Burgemeestersbenoeming',
                    'Aansprakelijkheidsverzekeraar',
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
            ...mapActions(['nextPlayer', 'addPoint', 'removePoint']),
            selectNextPlayer() {
                this.nextPlayer();
                this.recordingDone = false;
                this.output = '';
                this.word = '';
            },
            resetRound() {
                this.output = '';
                this.error = '';
                if (!this.retry) {
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
                    if (vm.output === '') {
                        console.log('Je moet wel iets zeggen ');
                        vm.retry = true;
                    }
                    if (vm.output.toLowerCase() === vm.word.toLowerCase()) {
                        vm.addPoint();
                    }
                    if (
                        vm.output.toLowerCase() !== vm.word.toLowerCase() &&
                        vm.player.score >= 1
                    ) {
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

                    vm.output = e.results[0][0].transcript.replace(' ', '');
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

<style lang="scss" scoped>
    button{
        display: block;
        width: 100px;
        height: 100px;
        padding: 20px;
        margin: 10px auto;
        -webkit-appearance: none;
        border-radius: 100%;
        background-color: rgba(219,68,55,1);
        text-align: center;
        box-shadow: 0 15px 20px 0 rgba(0,0,0,0.25);
        border: solid 10px #ffffff;
        cursor: pointer;
        transition: all .25s ease;
        outline:0;
        

        &:disabled,&:disabled:hover{
            background-color: rgba(219,68,55,1);
            box-shadow: 0 0px 5px 0 rgba(0,0,0,0.15);
            cursor: not-allowed;
        }
        &:hover{
            box-shadow: 0 5px 10px 0 rgba(0,0,0,0.15);
        }
        &:active{
            box-shadow: 0 0px 5px 0 rgba(0,0,0,0.15);
        }
        svg{
            width: 100%;
            height: 100%;
            path{
                fill: #ffffff;
            }
        }
    }

    @for $i from 1 through 9 {
        #line_#{$i} {
            animation: pulse .35s infinite;
            animation-delay: $i * .15s;
        }
    }

    @keyframes pulse {
        0% {
            transform: scaleY(1);
            transform-origin: 50% 50%;
        }
        
        50% {
            transform: scaleY(.7);
            transform-origin: 50% 50%;
        }
        
        100% {
            transform: scaleY(1);
            transform-origin: 50% 50%;
        }
    }

    @keyframes pulse-animate {
        0% {
            transform: scale(0);
            opacity: 1;
            transform-origin: center;
        }

        100% {
            transform: scale(3);
            opacity: 0;
            transform-origin: center;
        }
    }
</style>