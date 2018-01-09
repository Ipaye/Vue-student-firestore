<template>
 <div id="viewstudent">
   <h2>View Student</h2>
 </div>
</template>

<script>
import db from '@/services/firebaseInit';

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
    };
  },watch: {
    '$route' : fetchData,
  },
  beforeRouteEnter: (to, from, next) => {
    db.collection('Student').where('student_id', '==', to.params.student_id).get().then(querySnapshot => {
      querySnapshot.forEach( doc => {
        next(vm => {
          vm.matric_no = doc.data().Student_id;
          vm.firstName = doc.data().firstName;
          vm.lastName = doc.data().lastName;
          vm.department = doc.data().department;
          vm.level = doc.data().level;
        });
      });
    });
  },
};

</script>

<style>

</style>
