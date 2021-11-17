<template>
  <div>
    <div class="theme" :class="getTheme">
      <input
        type="radio"
        name="theme"
        :checked="getTheme === 'white'"
        v-on:change="setTheme('white')"
      />white
      <input
        type="radio"
        name="theme"
        :checked="getTheme === 'red'"
        v-on:change="setTheme('red')"
      />red
    </div>
    <table>
      <tr v-for="student in students" v-bind:key="student._id">
        <td>
          <router-link :to="'/student-info/' + student._id">{{
            student.name
          }}</router-link>
        </td>

        <td>{{ student.group }}</td>
        <td><input type="checkbox" v-model="student.isDonePr" /></td>

        <td>
          <button class="btn" v-on:click="btnDelete(student._id)">
            Удалить
          </button>
        </td>
      </tr>
    </table>

    <p>Всего студентов: {{ studentsCount }}</p>

    <br />
    <input type="text" v-model="studentName" />
    <input type="text" v-model="studentGroup" />
    <input type="checkbox" v-model="studentPr" />

    <button @click="addStudent">Добавить</button>
  </div>
</template>



<script>
import Vue from "vue";

var students = [];
var newStudent = {};

export default {
  data: function () {
    return {
      students: students,
      newStudent: newStudent,
      studentId: null,
      studentName: "",
      studentGroup: "",
      studentPr: null,
    };
  },

  mounted: function () {
    Vue.axios
      .get("http://46.101.212.195:3000/students")
      .then(({ data: students }) => {
        this.students = [...students];
      })
      .then(() => this.$store.commit("setCount", this.students.length));
  },
  computed: {
    studentsCount: function () {
      return this.$store.getters.getCount;
    },
    getTheme: function () {
      return (this.currentTheme = this.$store.getters.getTheme);
    },
  },

  methods: {
    btnDelete: function (id) {
      Vue.axios
        .delete(`http://46.101.212.195:3000/students/${id}`)
        .then(
          () =>
            (this.students = this.students.filter(
              (student) => student._id !== id
            ))
        )
        .then(() => this.$store.commit("setCount", this.students.length));
    },
    addStudent() {
      newStudent = {
        name: this.studentName,
        group: this.studentGroup,
        isDonePr: this.studentPr,
      };
      Vue.axios
        .post("http://46.101.212.195:3000/students", newStudent)
        .then(({ data }) => this.students.push(data))
        .then(() => this.$store.commit("setCount", this.students.length));
      this.studentName = this.studentGroup = "";
      this.studentPr = null;
    },
    setTheme: function (theme) {
      this.$store.commit("setTheme", theme);
    },
  },
};
</script>



<style scoped>
.theme{
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
}

.theme input{
  margin-left: 65px;
}

.white {
  background-color: #ffffff;
}

.red {
  background-color: #8f3838;
}
</style>