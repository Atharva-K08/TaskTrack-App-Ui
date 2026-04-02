import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createStudentThunk,
  getStudentsThunk,
  updateStudentThunk,
} from "../../features/student/studentSlice";
import {
  createUsersThunk,
  fetchUsersThunk,
} from "../../features/users/userSlice";
import { fetchBatchThunk } from "../../features/batches/batchSlice";

function Student() {
  const dispatch = useDispatch();
  const { students, loading } = useSelector((state) => state.student);
  const { users } = useSelector((state) => state.user);
  const { batches } = useSelector((state) => state.batch);
  console.log(batches);
  const [formData, setFormData] = useState({
    userId: "",
    batchId: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(getStudentsThunk());
    dispatch(fetchUsersThunk("student"));
    dispatch(fetchBatchThunk());
  }, []);

  /* ------------------- HANDLERS ------------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => {
    setFormData({ userId: "", batchId: "" });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await dispatch(updateStudentThunk({ id: editId, data: formData }));
    } else {
      await dispatch(createStudentThunk(formData));
    }

    dispatch(getStudentsThunk());
    reset();
  };

  const handleEdit = (student) => {
    setEditId(student._id);
    setFormData({
      userId: student.user?._id || "",
      batchId: student.batch?._id || "",
    });
  };

  /* ------------------- UI ------------------- */

  return (
    <>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ top: "100px" }}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Create Student
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <RegisterStudent />
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center my-4">
          <h3>Student Management</h3>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            + Add Student
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mb-4">
          <select
            name="userId"
            placeholder="User ID"
            value={formData.userId}
            onChange={handleChange}
            className="form-control mb-2"
            required
          >
            <option value="">-------- Select Student ----------</option>
            {users.length != 0 ? (
              users.map((user, index) => {
                return (
                  <>
                    <option key={index} value={user._id}>
                      {user.name}
                    </option>
                  </>
                );
              })
            ) : (
              <option>Loading...</option>
            )}
          </select>

          <select
            name="batchId"
            placeholder="Batch ID"
            value={formData.batchId}
            onChange={handleChange}
            className="form-control mb-2"
          >
            <option value="">--------------- Select Batch -------------</option>
            {batches.length != 0 ? (
              batches.map((batch, index) => {
                return (
                  <>
                    <option key={index} value={batch._id}>
                      {batch.name}
                    </option>
                  </>
                );
              })
            ) : (
              <option>Loading...</option>
            )}
          </select>

          <button className="btn btn-primary w-100">
            {editId ? "Update Student" : "Create Student"}
          </button>
        </form>

        {/* TABLE */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Stundent Name</th>
              <th>Batch</th>
              <th>Progress</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>
                  {users.find((u) => u._id === student.user)?.name || "N/A"}
                </td>
                <td>
                  {batches.find((b) => b._id === student.batch)?.name || "N/A"}
                </td>
                <td>{student.progress}%</td>

                {/* <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </button>

              </td> */}
              </tr>
            ))}
          </tbody>
        </table>

        {loading && <p>Loading...</p>}
      </div>
    </>
  );
}

export default Student;

function RegisterStudent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const dispatch = useDispatch();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);
    dispatch(createUsersThunk(formData));
    // Reset form
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "student",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Student Registration
        </h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded form-control"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded form-control"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded form-control"
        />

        {/* Role (Hidden / Fixed) */}
        <input type="hidden" name="role" value="student" />

        <button type="submit" className="btn btn-warning w-100 py-2 mt-4">
          Register
        </button>
      </form>
    </div>
  );
}
