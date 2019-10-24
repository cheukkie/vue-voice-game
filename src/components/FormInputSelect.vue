<template>
    <div>
        <select class="btn" @change="select" v-model="selectValue">
            <option disabled value="">{{placeholder}}</option>
            <option v-for="(option,index) in options" :value="option.value" :key="index">
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<script>
    export default {
        name: 'FormInputSelect',
        props: {
            value: Number,
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

<style>

</style>