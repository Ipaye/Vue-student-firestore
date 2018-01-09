<template>
  <div id="app">
    <navbar />
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
  name: 'app',
  components: {
    Navbar,
  },
};
</script>

<style>
.jumbotron {
  margin-top: 10px;
  padding-top: 2px;
}
</style>
