<template>
  <div id="dashboard">

    <ul class="collection with-header">
      <li class="collection-header"><h4>Students</h4></li>
      <li v-for="student in Students" :key="student.id" class="collection-item">
        <router-link class="secondary-content" :to="{name: 'ViewStudent', params: {Student_id : student.id}}"> <i class="fa fa-eye"></i> </router-link>
        <p>Matric Number: {{student['matric_no']}} </p>
        <p>Full Name: {{student.firstName}} {{student.lastName}} </p>
      </li>
    </ul>

    <div class="fixed-action-btn">
      <router-link to="/student/new" class="btn-floating btn-large coral">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from '@/services/firebaseInit';

export default {
  name: 'dashboard',
  data() {
    return {
      Students: [],
    };
  },
  created() {
    db.collection('Students').orderBy('Student_id').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        const data = {
          'id': doc.id,
          'matric_no': doc.data().Student_id,
          'firstName': doc.data().firstName,
          'lastName': doc.data().lastName,
          'email': doc.data().email,
          'level': doc.data().level,
          'department': doc.data().department,
        };
        this.Students.push(data);
      });
    });
  },
};

</script>

<style>

</style>
