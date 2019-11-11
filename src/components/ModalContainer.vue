<template>
    <div class="modal">
        <div class="container">
            <div class="panel">
                <a class="btn modal-close" title="Close modal" @click.prevent="$router.replace({'query': null});">
                    <span class="svg-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
                    </span>
                </a>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalContainer'
}
</script>
<style lang="scss" scoped>
    @import '@/styles/setup/_variables.scss';
    .modal{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 10px;
        background-color: rgba(0,0,0,0.25);
        .modal-close{
            position: absolute;
            top: 0px;
            right: 10px;
            width: 40px;
            height: 40px;
            padding: 12px;
            svg path{
                fill: $color1;
            }
            &:hover{
                svg path{
                    fill: #fff;
                }   
            }
        }
    }
    .container{
        position: relative;
        height: 100%;
    }
    .panel {
        position: relative;
        background-color: rgba(255, 255, 255, 0.85);
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 20px 15px rgba(0, 0, 0, 0.15);
        background-color: #ffffff;
    }
</style>
