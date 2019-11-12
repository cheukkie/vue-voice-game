<template>
    <header>
        <h1>
            <span class="icon-holder">
                <span class="svg-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
                        <path
                            d="M15.526 11.409c-1.052.842-7.941 6.358-9.536 7.636l-2.697-2.697 7.668-9.504 4.565 4.565zm5.309-9.867c-2.055-2.055-5.388-2.055-7.443 0-1.355 1.356-1.47 2.842-1.536 3.369l5.61 5.61c.484-.054 2.002-.169 3.369-1.536 2.056-2.055 2.056-5.388 0-7.443zm-9.834 17.94c-2.292 0-3.339 1.427-4.816 2.355-1.046.656-2.036.323-2.512-.266-.173-.211-.667-.971.174-1.842l-.125-.125-1.126-1.091c-1.372 1.416-1.129 3.108-.279 4.157.975 1.204 2.936 1.812 4.795.645 1.585-.995 2.287-2.088 3.889-2.088 1.036 0 1.98.464 3.485 2.773l1.461-.952c-1.393-2.14-2.768-3.566-4.946-3.566z" />
                    </svg>
                </span>
            </span>
            Voice Game
        </h1>
    </header>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
    header{
        @include rem(padding, 10px);
    }
    h1 {
        color: $color3;
        margin: 0;
        @include rem(font-size, 24px);

        span.icon-holder {
            display: inline-flex;
            vertical-align: middle;
            justify-content: center;
            align-items: center;
            
            border-radius: 100%;
            border: solid 2px $color3;
            @include rem(padding, 5px);
            @include rem(width, 35px);
            @include rem(height, 35px);
            text-align: center;
            vertical-align: middle;
        }

        svg {
            display: inline-block;

            path {
                fill: $color3;
            }
        }
    }
</style>