<template>
    <div>
        <h2>Players</h2>
        <AllPlayers view="list" />
        <div v-if="allPlayers.length < maxPlayers">
            <form @submit.prevent="onSubmit">
                <div class="inputHolder">
                    <input ref="player" type="text" placeholder="New player" v-model="name" :disabled="isRecording">
                </div>
                <div v-for="(n,index) in (maxPlayers-(allPlayers.length+1))" :key="index">
                    <div class="inputHolder">
                        <input disabled type="text" placeholder="New player">
                    </div>
                </div>
                <button @click.prevent="onSubmit" class="hide">Add player</button>
            </form>
            <div class="btn-group">
                <RecordBtn color="red" @click.native="startRecording" @recordBtnOutput="addName" :showInterimResults="true" />
                <button @click.prevent="onSubmit" class="btn-icon is-blue" :disabled="!name || isRecording" title="Add player">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M19.5 15c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-7.18 4h-14.815l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 6.751 0 7.506 7.595 3.64 13.679-1.292 2.031-2.64 3.63-2.64 5.821 0 1.747.696 3.331 1.82 4.5z"/></svg>
                </button>
            </div>
        </div>
        <router-link to="/multiplayer/playing" v-if="allPlayers.length === maxPlayers">
            <button :disabled="allPlayers.length < maxPlayers" class="btn is-block" @click="beginGame">Start</button>
        </router-link>
        <router-link to="/multiplayer/info">
            <button class="btn is-block is-ghost">Back</button>
        </router-link>
    </div>
</template>

<script>
    import { mapGetters,mapActions } from 'vuex';
    import AllPlayers from '@/components/AllPlayers.vue';
    import RecordBtn from '@/components/RecordBtn.vue';

    export default {
        name: 'Players',
        data: function () {
            return {
                name: '',
                isRecording: false
            };
        },
        updated: function () {
            const vm = this;
            this.$nextTick(function () {
                if( vm.allPlayers.length < vm.maxPlayers ){
                    vm.$refs.player.focus();
                }
            });
        },
        mounted: function(){
            const vm = this;
            if( vm.allPlayers.length < vm.maxPlayers ){
                this.$refs.player.focus();
            }
        },
        methods: {
            ...mapActions(['addPlayer','startGame','settingsSet']),
            beginGame() {
                this.settingsSet();
                this.startGame();
            },
            onSubmit() {
                this.addPlayer( this.capitalize(this.name) );
                this.name = '';
            },
            addName(output){
                this.name = this.capitalize(output);
                this.isRecording = false;
            },
            capitalize: function (value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            },
            startRecording(){
                this.isRecording = true;
            }
        },
        computed:{
            ...mapGetters(['allPlayers','maxPlayers']),
        },
        components:{
            RecordBtn,
            AllPlayers
        }
    };
</script>
<style lang="scss" scoped>

    $borderRadius: 25px;
    .inputHolder{
        display: flex;
        justify-content: center;
        width: 100%;
        @include rem(height, 40px);
        @include rem(margin-bottom, 5px);
    }
    input[type="text"]{
        -webkit-appearance: none;
        display: block;
        width: 100%;
        border: none;
        @include rem(padding, 0 15px);
        border: solid 1px #dddddd;
        border-radius: $borderRadius;
        color: $color1;
        @include rem(font-size, 14px);
        font-weight: bold;
        outline: 0;
        &:focus{
            border-color: $color1;
        }
        &:disabled{
            opacity: .35;
        }
    }
    
</style>
