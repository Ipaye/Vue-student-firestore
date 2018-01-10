<template>
  <div id="dashboard">
    <h2>All Student</h2>
    <div class="row">
      <div v-for="student in Students" :key="student.id">
        <div class="col s12 m4 l4">
          <div class="card z-depth-2 hoverable">
            <div class="card-content">
              <span class="card-title">{{student.firstName}} {{student.lastName}} </span>
              <p class="lead">Matric No -
                <span class="chip">
                  {{student['matric_no']}}
                </span>
              </p>
              <p>Department -
                <span class="colored">{{student.department}}</span>
              </p>
            </div>
            <div class="card-action">
              <router-link class="waves-effect waves-light btn" :to="{name: 'ViewStudent', params: {student_id : student['matric_no']}}">
                View Student
                <i class="fa fa-eye"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed-action-btn">
      <router-link to="/student/new" class="btn-floating btn-large coral">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import{db} from '@/services/firebaseInit';

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
.lead {
  color: black;
  font-weight: bold;
  font-family: Cambria, Cochin, Georgia, Times, Times New Roman, serif;
}
.colored {
  font-family: monospace;
  font-weight: 300;
}
</style>
