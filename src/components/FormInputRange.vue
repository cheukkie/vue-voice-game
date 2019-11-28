<template>
  <!-- eslint-disable -->
  <div>
    <button class="btn" @click="decrement" :disabled="min === rangeValue">-</button>
    <div class="inputValue">{{ label }}: {{ rangeValue}}</div>
    <input class="hide" :min="min" :max="max" type="range" v-model="rangeValue">
    <button class="btn" @click="increment" :disabled="max === rangeValue">+</button>
  </div>
</template>

<script>
export default {
  name: 'FormInputRange',
  props: {
    value: {
      type: Number,
      default: this.min,
    },
    label: {
      type: String,
      default: 'Label niet ingevuld',
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      rangeValue: this.value,
    };
  },
  methods: {
    increment() {
      if (this.rangeValue + 1 <= this.max) {
        this.rangeValue += 1;
        this.$emit('input', parseInt(this.rangeValue, 10));
      }
    },
    decrement() {
      if (this.rangeValue - 1 >= this.min) {
        this.rangeValue -= 1;
        this.$emit('input', parseInt(this.rangeValue, 10));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  div {
    display: flex;
    flex-direction: row;
    @include rem(margin-bottom, 5px);

    button {
      flex: 1;
      margin: 0;
    }

    .inputValue {
      -webkit-appearance: none;
      flex: 10;
      display: block;
      background-color: #ffffff;
      @include rem(border-radius, 25px);
      border: none;
      color: $color1;
      font-weight: bold;
      @include rem(font-size, 16px);
      @include rem(padding, 10px 15px);
      @include rem(margin, 0 5px);
    }
  }
</style>
