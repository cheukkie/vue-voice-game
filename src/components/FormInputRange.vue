<template>
    <div>
        <button class="btn" @click="decrement">-</button>
        <div class="inputValue">{{ label }}: {{ rangeValue}}</div>
        <input class="hide" :min="min" :max="max" type="range" v-model="rangeValue">
        <button class="btn" @click="increment">+</button>
    </div>
</template>

<script>
    export default {
        name: 'FormInputRange',
        props: {
            value: Number,
            label: String,
            min: Number,
            max: Number
        },
        data: function () {
            return {
                rangeValue: this.min,
            }
        },
        methods:{
            increment(){
                if( this.rangeValue+1 <= this.max ){
                    this.rangeValue++;
                    this.$emit('input', parseInt(this.rangeValue))
                }
            },
            decrement(){
                if( this.rangeValue-1 >= this.min ){
                    this.rangeValue--;
                    this.$emit('input', parseInt(this.rangeValue))
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .hide{
        display: none;
    }
    div{
        display: flex;
        flex-direction: row;
        button{
            flex: 1;
            margin: 0;
        }
        .inputValue{
            flex: 10;
            border-radius: 25px;
            display: block;
            border: none;
            -webkit-appearance: none;
            color: #f4a000;
            background-color: #ffffff;
            font-weight: bold;
            font-size: 16px;
            padding: 10px 15px;
            margin: 0 5px;
        }
    }
</style>
