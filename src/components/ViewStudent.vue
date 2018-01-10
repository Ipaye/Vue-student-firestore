<template>
  <div id="viewstudent">
    <div class="row">
      <div class="col s12 m8 offset-m2 l8 offset-l2">
        <ul class="collection with-header z-depth-2 hoverable">
          <li class="collection-header">
            <h4>
              {{firstName}} {{lastName}} </h4>
          </li>
          <li class="collection-item">
            <span class="lead">Matric No</span> - {{matric_no}} </li>
          <li class="collection-item">
            <span class="lead">Department of</span> - {{department}} </li>
          <li class="collection-item">
            <span class="lead">Level</span> - {{level}} </li>
          <li class="collection-item">
            <span class="lead">Email</span> - {{email}} </li>
        </ul>
        <router-link to="/" class="waves-effect waves-light btn">Back
          <i class="fa fa-backward"></i>
        </router-link>
        <button @click="deleteStudent" class="waves-effect waves-light btn red">Delete
          <i class="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large coral" :to="{name: 'EditStudent', params: {student_id : matric_no}}">
        <i class="fa fa-edit"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import {db} from '@/services/firebaseInit';

export default {
  name: 'viewstudent',
  data() {
    return {
      matric_no: null,
      student_id: null,
      firstName: null,
      lastName: null,
      department: null,
      level: null,
      email: null
    };
  },
  beforeRouteEnter: (to, from, next) => {
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
    deleteStudent(){
      if(confirm('Are you sure you want to delete?')){
        db.collection('Students').where('Student_id', '==', this.$route.params.student_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
            this.$router.push('/')
          })
        })
      }
    }
  }

};

</script>

<style scoped>
.heading {
  margin-top: 20px;
  font-family: 'roboto';
}
.lead {
  font-weight: bold;
  font-family: monospace;
  font-size: 20px;
}
</style>
