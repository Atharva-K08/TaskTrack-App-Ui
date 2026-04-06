import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersListThunk,
  fetchUsersThunk,
} from "../../features/users/userSlice";
import { fetchBatchThunk } from "../../features/batches/batchSlice";
import { getStudentsThunk } from "../../features/student/studentSlice";
import { getTeachersThunk } from "../../features/teacher/teacherSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.student.students);
  const teachers = useSelector((state) => state.teacher.teachers);
  const batches = useSelector((state) => state.batch.batches);
  const users = useSelector((state) => state.user.users);
  useEffect(() => {
    dispatch(fetchUsersListThunk());
    dispatch(getStudentsThunk());
    dispatch(getTeachersThunk());
    dispatch(fetchBatchThunk());
  }, []);
  console.log(students, teachers, batches, users);
  return (
    <div>
      <h1 className="p-3">Admin Dashboard</h1>
      <div className="container">
        <div className="row">
          <div className="col-6 mb-3">
            <div className="card p-3 h4">Students: {students.length} </div>
            <div>
              {students.map((s) => {
                return <div key={s._id}>{users.find((u) => u._id == s.user).name}</div>;
              })}
            </div>
          </div>
          <div className="col-6 mb-3">
            <div className="card p-3 h4">Teachers: {teachers.length}</div>
            <div>
              {teachers.map((t) => {
                return <div key={t._id}>{t.user.name}</div>;
              })}
            </div>
          </div>

          <div className="col-6 mb-3">
            <div className="card p-3 h4">Batches: {batches.length}</div>
            <div>
              {
                batches.map((b) => {
                  return <div key={b._id}>{b.name}</div>;
                })
              }
            </div>
          </div>
          <div className="col-6 mb-3">
            <div className="card p-3 h4">Tests: 0</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
