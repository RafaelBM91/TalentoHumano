<template>
  <div class="columns is-centered is-multiline">
    <Top />
    <nuxt/>
  </div>
</template>

<script>
  import Top from '~components/Top'
  export default {
    components: { Top }
  }
</script>

<style>
  html {
    height: 100%;
  }
  body {
    height: 100%;
    /*background-image: url('/logo_imet.png');
    background-size: 100%;
    background-repeat: no-repeat;*/
  }
</style>
