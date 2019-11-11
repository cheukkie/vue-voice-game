<template>
    <div>
        <h2>Settings</h2>
        <FormInputSelect :disabled="true" v-model="language.selected" placeholder="Nederlands (More coming soon)" :options="language.options" />
        <br>
        <button class="btn is-block" @click="saveAppSettings">
            {{ button.label }}
        </button>
        <router-link to="/">
            <button class="btn is-block is-ghost">Back</button>
        </router-link>
    </div>
</template>

<script>
    import FormInputSelect from '@/components/FormInputSelect.vue';

    export default {
        data: function () {
            return {
                button:{
                    label: '',
                    states: {
                        neutral: 'Save',
                        progress: 'Saving settings...',
                        success: 'Settings saved!',
                    }
                },
                language: {
                    selected: 'NL-nl',
                    options: [
                        {
                            value: 'NL-nl',
                            label: 'Nederlands'
                        },
                        {
                            value: '',
                            label: 'English'
                        },
                        {
                            value: '',
                            label: 'Español'
                        },
                        {
                            value: '',
                            label: 'Italiano'
                        },
                        {
                            value: '',
                            label: 'Francaise'
                        },
                    ]
                }
                
            
            };
        },
        mounted: function(){
            this.button.label = this.button.states.neutral;
        },
        methods:{
            saveAppSettings() {
                
                this.button.label = this.button.states.progress;

                setTimeout(()=>{
                    this.button.label = this.button.states.success;
                },1500);
                setTimeout(()=>{
                    this.button.label = this.button.states.neutral;
                },3000);
                
            }
        },
        components:{
            FormInputSelect
        }
    }
</script>

<style>

</style>
