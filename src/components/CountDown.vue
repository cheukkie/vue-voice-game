<template>
    <div class="countdown">
        <div class="countdown-number">{{ countdown }}</div>
        <svg><circle r="18" cx="20" cy="20"></circle></svg>
    </div>
</template>

<script>
export default {
    props:{
        time: Number
    },
    data: function(){
        return {
            countdown: this.time,
            interval: null,
        }
    },
    mounted: function(){
        const vm = this;
        this.interval =  setInterval(function() {
            if( vm.countdown > 1 ){
                vm.countdown--
            }else{
                vm.countdown = 0;

                vm.$el.classList.add('is-hidden');
                clearInterval(vm.interval);
                vm.$emit('countDownFinished', true);
            }
        }, 1000);
        this.$el.style.setProperty('--countdown-time', this.time);
    }
}
</script>

<style lang="scss" scoped>
    .countdown {
        --countdown-time: 5;
        position: relative;
        margin: auto;
        height: 40px;
        width: 40px;
        text-align: center;
        transition: all .25s ease;
        &.is-hidden{
            opacity: 0;
            visibility: hidden;
        }
        svg {
            position: absolute;
            top: 0;
            right: 0;
            width: 40px;
            height: 40px;
            transform: rotateY(-180deg) rotateZ(-90deg);
            circle {
                stroke-dasharray: 113px;
                stroke-dashoffset: 0px;
                stroke-linecap: round;
                stroke-width: 2px;
                stroke: white;
                fill: none;
                animation: countdown calc(var(--countdown-time) * 1s) linear infinite forwards;
            }
        }
        .countdown-number {
            color: white;
            display: inline-block;
            line-height: 40px;
        }
    }

    @keyframes countdown {
        from {
            stroke-dashoffset: 0px;
        }
        to {
            stroke-dashoffset: 113px;
        }
    }

</style>
