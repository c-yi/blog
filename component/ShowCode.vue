<template>
  <div>
    <div class="show-button" @click="codeShow=!codeShow">
      {{ codeShow ? '隐藏代码 △ ' : '显示代码 ▽ ' }}
    </div>
    <div v-show="codeShow">
      <slot/>
    </div>
    <div class="show-button" @click="codeShow=!codeShow" v-show="codeShow">
      {{ codeShow ? '隐藏代码 △ ' : '显示代码 ▽ ' }}
    </div>
  </div>
</template>

<script setup>
import {ref } from "vue";
import {useData} from 'vitepress'

const codeShow = ref (false);
const theme = useData()
console.log("=> theme", theme);

</script>

<style scoped lang="less">
.show-button {
  width: 100%;
  height: 40px;
  color: orangered;
  font-weight: 700;
  background-color: #f3f5f7;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}

</style>
