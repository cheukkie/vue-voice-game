<template>
    <div class="selectHolder">
        <select class="btn is-block" @change="select" v-model="selectValue" :disabled="disabled">
            <option disabled value="">{{placeholder}}</option>
            <option v-for="(option,index) in options" :value="option.value" :key="index">
                {{ option.label }}
            </option>
        </select>
        <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FormInputSelect',
        props: {
            disabled: Boolean,
            value: [Number,String],
            placeholder: String,
            options: Array
        },
        data: function () {
            return {
                selectValue: ''
            }
        },
        methods:{
            select(){
                this.$emit('input', this.selectValue);
            }
        },
    }
</script>

<style lang="scss" scoped>

    .btn{
        @include rem(padding, 10px 35px 10px 15px);
    }
    .selectHolder{
        position:relative;
        .icon{
            position: absolute;
            top: 0;
            @include rem(right, 15px);
            height: 100%;
            display: flex;
            align-items: center;
            svg{
                display: inline-block;
                path{
                    fill: $color1;
                }
            }
        }
        &:hover{
            .icon svg path{
                fill: #ffffff;
            }
        }
        select[disabled] + .icon svg path{
            fill: rgba(0, 0, 0, 0.15);
        }
    }
    
</style>