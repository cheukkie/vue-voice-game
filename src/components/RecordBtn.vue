<template>
    <div>
        <div v-if="webSpeech">
            {{ score }}
            <button @click="startDictation" :disabled="recording">Record</button>
            <!-- <button @click="stopDictation" :disabled="webSpeech ? false : true">Stop</button> -->
            <div>
                {{ error }}
            </div>
            <div>
                <span v-if="word">Lees op: {{ word }}</span> <span v-if="output"> - Output: {{ output }}</span>
            </div>
        </div>
        <div v-else>
            Upgrade now
        </div>
    </div>
</template>

<script>

import { getRandomInt } from '@/utils';

export default {
    name: 'RecordBtn',
    data: function(){
        return {
            recording: false,
            webSpeech : false,
            recognition: null,
            output: '',
            error: '',

            score: 0,

            list: [
                'Sybe',
                'Paul',
                'Emanuel',
                'Jos',
            ],
            word: '',
        }
    },
    mounted: function(){
        window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        
        if ( !('webkitSpeechRecognition' in window) ) {
            // speech recognition API not supported
            // Do stuff
        } else {
            // speech recognition API supported
            this.webSpeech = true;
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.maxAlternatives = 3;
            this.recognition.lang = "nl-NL";
        }
    },
    methods:{
        resetRound(){
            this.output = '';
            this.error = '';
            this.word = this.list[getRandomInt(0,this.list.length)];
        },
        startDictation() {
            //let permission = false;
            const vm = this;

            this.resetRound();
            this.recognition.start();
            
            //1.
            this.recognition.onstart = function (e){
                console.log('onstart');
                vm.recording = true;
            };
            //2.
            this.recognition.onaudiostart = function (e) {
                console.log('audio start');
            }
            //3.
            this.recognition.onsoundstart = function (e){
                console.log('on sound start');
            };


            //4.
            this.recognition.onspeechstart = function (e){
                console.log('onspeechstart');
            };
            //5.
            this.recognition.onspeechend = function (e){
                console.log('onspeechend');
            };

            //6.
            this.recognition.onsoundend = function (e){
                console.log('on sound end');
            };
            //7.
            this.recognition.onaudioend = function (e) {
                console.log('audio end');
            }
            //8.
            this.recognition.onend = function (e) {
                console.log('on end');
                //console.log(vm.output);
                if( vm.output === '' ){
                    console.log('Je moet wel iets zeggen ');
                }
                if( vm.output.toLowerCase() === vm.word.toLowerCase() ){
                    vm.score++;
                }
                if( vm.output.toLowerCase() !== vm.word.toLowerCase() && vm.score >= 1 ){
                    vm.score--;
                }
                vm.recording = false;
            }

            //---
            this.recognition.onerror = function (e) {
                console.log(`error: ${e.error}`);
                vm.error = e.error;
            }
            this.recognition.onnomatch = function(e) {
                console.log('no match');
            }
            this.recognition.onresult = function (e) {
                //console.log( e.results[0].length );
                const altArray = [];
                for (let i = 0; i < e.results[0].length; i++) {
                    const element = e.results[0][i].transcript;
                    altArray.push(element);
                }
                console.log( altArray );
                console.log(`resultaat: ${e.results[0][0].transcript}`);
                
                vm.output = e.results[0][0].transcript;
            };

            //---
            

        },
        stopDictation(){
            this.recognition.stop();
        }
    }
}
</script>

<style>

</style>
