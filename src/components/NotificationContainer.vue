<template>
    <div class="notification" :pos-x="posX" :pos-y="posY" :type="type" :auto-hide-after="autoHideAfter" :role="role">
        <span class="notification-icon" v-if="role === 'warning' || role === 'success' || role === 'error'">
            <span class="svg-icon" v-if="role === 'warning'">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M12 5.177l8.631 15.823h-17.262l8.631-15.823zm0-4.177l-12 22h24l-12-22zm-1 9h2v6h-2v-6zm1 9.75c-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25 1.25.56 1.25 1.25-.561 1.25-1.25 1.25z"/></svg>
            </span>
            <span class="svg-icon" v-if="role === 'error'">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 6h2v8h-2v-8zm1 12.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/></svg>
            </span>
            <span class="svg-icon" v-if="role === 'success'">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.25 8.891l-1.421-1.409-6.105 6.218-3.078-2.937-1.396 1.436 4.5 4.319 7.5-7.627z"/></svg>
            </span>
        </span>
        <span class="notification-msg">
            <h2 v-if="title">{{ title }}</h2>
            <p v-if="msg">{{ msg }}</p>
            <slot></slot>
        </span>
        <button class="notification-close" @click="hideNotification" v-if="autoHideAfter === 0">
            <span class="svg-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
            </span>
        </button>
    </div>
</template>

<script>
export default {
    props:{
        show: Boolean,
        autoHideAfter: Number,
        posX: String,
        posY: String,
        type: String,
        role: String,
        title: String,
        msg: String,
    },
    data: function(){
        return {

        }
    },
    mounted: function(){
        const vm = this;
        vm.$el.classList.add('is-visible');

        if( vm.autoHideAfter !== 0 ){
            setTimeout(()=>{
                vm.$el.classList.remove('is-visible');
            },vm.autoHideAfter*1000);
        }
    },
    methods:{
        hideNotification(){
            this.$el.classList.remove('is-visible');
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '@/styles/setup/_variables.scss';

    .notification{
        $gp: &;
        $margin: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;

        padding: 0 10px;
        margin: auto;

        width: calc(100% - 30px);
        background-color: $color4;
        border-radius: 5px;
        
        text-align: left;
        color: #fff;

        visibility: hidden;
        opacity: 0;
        transition: all .75s ease-out;
        
        &.is-visible{ 
            transform: translate3d(0, 0, 0) !important;
            visibility: visible;
            opacity: 1;
        }
        &[role="warning"]{ 
            background-color: $color1; 
        }
        &[role="error"]{ 
            background-color: $color2; 
        }
        &[role="success"]{ 
            background-color: $color3;
        }

        svg{
            path{
                fill: #fff;
            }
        }
        &-icon{
            width: 30px;
            height: 30px;
        }
        &-msg{
            flex: 1;
            padding: 5px 10px;
            h2{
                font-size: 16px;
                margin: 0;
            }
            p{
                font-size: 14px;
                margin: 0;
            }
        }
        &-close{
            -webkit-appearance: none;
            border: none;
            background-color: transparent;
            width: 32px;
            height: 32px;
            padding: 10px;
            cursor: pointer;
        }

        &[pos="bottom"]{
            top: auto;
            bottom: $margin;
            transform: translate3d(0, 100%, 0);
        }
        &[pos="top"]{
            top: $margin;
            bottom: auto;
            transform: translate3d(0, -100%, 0);
        }
        &[type="toast"]{
            padding: 10px;
            align-items: flex-start;
            width: 300px;
            #{$gp}-close{
                position: absolute;
                right: 10px;
            }
            &.pos-left{
                left: $margin;
                right: auto;
            }
            &.pos-right{
                left: auto;
                right: $margin;
            }
        }
        &[type="modal"]{
            padding: 10px;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            width: calc(100% - 30px);
            max-width: 300px;
            max-height: 300px;
            bottom: 0;
            top: 0;
            left: 0;
            right: 0;
            
            #{$gp}-icon{
                width: 40px;
                height: 40px;
                margin-bottom: 10px;
            }
            #{$gp}-msg{
                flex: none;
            }
            #{$gp}-close{
                position: absolute;
                top: 10px;
                right: 10px;
            }
        }
    }

    // Success
    // Error
    // Warning
</style>
