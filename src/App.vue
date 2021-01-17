<template>
  <div>
    <AppNavbar></AppNavbar>
    <router-view></router-view>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator';
import AppNavbar from '@/components/AppNavbar';
import AppFooter from '@/components/AppFooter';

@Component({
  components: {
    AppNavbar, AppFooter,
  },
})
export default class App extends Vue {
}
</script>

<style>
</style>
