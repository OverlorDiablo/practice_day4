<template>
  <div class="student-info">
    <p>{{ student.name }}</p>
    <p>{{ student.group }}</p>
    <img src="https://robohash.org/1 2 3" alt="" />
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  props: {
    id: "",
  },
  data: function () {
    return {
      student: {},
    };
  },

  mounted: function () {
    Vue.axios
      .get("http://46.101.212.195:3000/students/" + this.id)
      .then((response) => {
        this.student = response.data;
      });
  },
};
</script>

<style scoped>
.student-info {
  display: flex;
  justify-content: center;
  align-items: center;
}


p{
  font-size: 16px;
  margin-right: 20px;
}

img{
  width: 100px;
}
</style>