<template>
  <div id="newstudent">

    <div class="row">
      <form class="col s12 card createStudent z-depth-3 hoverable" @submit.prevent="saveStudent">
        <h4>Create New Student Record</h4>
        <div class="row">
          <div class="input-field col s12 l6">
            <input v-model="firstName" type="text" class="validate" placeholder="Enter your firstName" required>
            <label for="first_name">First Name</label>
          </div>
          <div class="input-field col s12 l6">
            <input v-model="lastName" type="text" class="validate" placeholder="Enter your LastName" required>
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
            <label for="disabled">Email</label>
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
  name: 'newStudent',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      matric_no: '',
      level: '',
      department: '',
    };
  },
  methods: {
    saveStudent(){
      db.collection('Students').add({
        Student_id: this.matric_no,
        firstName: this.firstName,
        lastName: this.lastName,
        level: this.level,
        department: this.department,
        email: this.email,
      }).then((docRef) => {
        this.$router.push('/')
      }).catch((err) => {
        console.error('Something went Wrong', err);
      })
    }
  }
};

</script>

<style>
.createStudent {
  padding: 30px;
  margin-top: 20px;
}
</style>
