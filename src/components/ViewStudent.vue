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
  }

};

</script>

<style>

</style>
