<template>
  <div id="editstudent">
    <div class="row">
      <form class="col s12 card editStudent z-depth-3 hoverable" @submit.prevent="updateStudent">
        <h4>Edit Student Record</h4>
        <div class="row">
          <div class="input-field col s12 l6">
            <input v-model="firstName" type="text" class="validate" required>
            <label for="first_name">First Name</label>
          </div>
          <div class="input-field col s12 l6">
            <input v-model="lastName" type="text" class="validate" required>
            <label for="last_name">Last Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12 l4 m4">
            <input v-model="level" type="text" class="validate" required>
            <label for="Level">Level</label>
          </div>
          <div class="input-field col s12 l4 m4">
            <input v-model="matric_no" type="number" class="validate" required>
            <label for="Matric No">Matric Number</label>
          </div>
          <div class="input-field col s12 l4 m4">
            <input v-model="department" type="text" class="validate" required>
            <label for="Department">Department</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input v-model="email" type="email" class="validate">
            <label for="Email">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <button type="submit" class="waves-effect waves-light btn">Submit</button>
            <router-link to="/" class="waves-effect waves-light btn red">Cancel
              <i class="fa fa-undo"></i>
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {db} from '../services/firebaseInit';
export default {
  name: 'editstudent',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      matric_no: '',
      level: '',
      department: '',
    };
  },  beforeRouteEnter: (to, from, next) => {
    db.collection('Students').where('Student_id', '==' ,to.params.student_id).get().then((querySnapshot) => {
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        next( (vm) => {
          vm.student_id = doc.id;
          vm.matric_no = doc.data().Student_id;
          vm.firstName = doc.data().firstName;
          vm.lastName = doc.data().lastName;
          vm.department = doc.data().department;
          vm.level = doc.data().level;
          vm.email = doc.data().email;
        })
      })
    })
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData(){
      db.collection('Students').where('Student_id', '==', this.$route.params.student_id).get().then((querySnapshot) => {
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          this.student_id = doc.id;
          this.matric_no = doc.data().Student_id;
          this.firstName = doc.data().firstName;
          this.lastName = doc.data().lastName;
          this.department = doc.data().department;
          this.level = doc.data().level;
          this.email = doc.data().email;
        })
      })
    },
    updateStudent(){
        db.collection('Students').where('Student_id', '==', this.$route.params.student_id).get().then((querySnapshot) => {
          console.log(querySnapshot);
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              Student_id: this.matric_no,
              firstName: this.firstName,
              lastName: this.lastName,
              level: this.level,
              department: this.department,
              email: this.email,
            }).then(() => {
              this.$router.push({name: 'ViewStudent', params: {student_id: this.matric_no}})
            })
          })
        }).catch((err) => {
          console.error('Something went wrong', err);
        })
      }
    }
  }

</script>

<style>
.editStudent {
  padding: 30px;
  margin-top: 20px;
}
</style>
