import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUsersThunk } from "../../features/users/userSlice";
import {
  createTeacherThunk,
  getTeachersThunk,
  updateTeacherThunk,
} from "../../features/teacher/teacherSlice";

import { fetchUsersThunk } from "../../features/users/userSlice";
import { fetchBatchThunk } from "../../features/batches/batchSlice";

function Teacher() {
  const dispatch = useDispatch();

  const { teachers, loading } = useSelector((state) => state.teacher);
  const { users } = useSelector((state) => state.user);
  const { batches } = useSelector((state) => state.batch);

  const [formData, setFormData] = useState({
    userId: "",
    expertise: "",
    experienceYears: "",
    batchIds: [],
    bio: "",
  });

  const [editId, setEditId] = useState(null);

  /* ------------------- FETCH DATA ------------------- */
  useEffect(() => {
    dispatch(getTeachersThunk());
    dispatch(fetchUsersThunk("teacher"));
    dispatch(fetchBatchThunk());
  }, [dispatch]);

  /* ------------------- HANDLERS ------------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBatchChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);

    setFormData((prev) => ({
      ...prev,
      batchIds: selected,
    }));
  };

  const reset = () => {
    setFormData({
      userId: "",
      expertise: "",
      experienceYears: "",
      batchIds: [],
      bio: "",
    });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: formData.userId,
      expertise: formData.expertise.split(","),
      experienceYears: Number(formData.experienceYears),
      batchIds: formData.batchIds,
      bio: formData.bio,
    };

    if (editId) {
      await dispatch(updateTeacherThunk({ id: editId, data: payload }));
    } else {
      await dispatch(createTeacherThunk(payload));
    }

    dispatch(getTeachersThunk());
    reset();
  };

  const handleEdit = (teacher) => {
    setEditId(teacher._id);

    setFormData({
      userId: teacher.user?._id || "",
      expertise: teacher.expertise?.join(",") || "",
      experienceYears: teacher.experienceYears || "",
      batchIds: teacher.assignedBatches?.map((b) => b._id) || [],
      bio: teacher.bio || "",
    });
  };

  /* ------------------- UI ------------------- */

  return (
    <>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center my-4">
          <h3>Teacher Management</h3>

          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#teacherModal"
          >
            + Add Teacher
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mb-4">
          {/* USER SELECT */}
          <select
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="form-control mb-2"
            required
          >
            <option value="">---- Select Teacher ----</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>

          {/* EXPERTISE */}
          <input
            type="text"
            name="expertise"
            placeholder="Expertise (comma separated)"
            value={formData.expertise}
            onChange={handleChange}
            className="form-control mb-2"
          />

          {/* EXPERIENCE */}
          <input
            type="number"
            name="experienceYears"
            placeholder="Experience (years)"
            value={formData.experienceYears}
            onChange={handleChange}
            className="form-control mb-2"
          />

          {/* BATCH MULTI SELECT */}
          <select
            multiple
            name="batchIds"
            value={formData.batchIds}
            onChange={handleBatchChange}
            className="form-control mb-2"
          >
            {batches.map((batch) => (
              <option key={batch._id} value={batch._id}>
                {batch.name}
              </option>
            ))}
          </select>

          {/* BIO */}
          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            className="form-control mb-2"
          />

          <button className="btn btn-primary w-100">
            {editId ? "Update Teacher" : "Create Teacher"}
          </button>
        </form>

        {/* TABLE */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Expertise</th>
              <th>Experience</th>
              <th>Batches</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td>{teacher.user?.name || "N/A"}</td>
                <td>{teacher.expertise?.join(", ")}</td>
                <td>{teacher.experienceYears} yrs</td>
                <td>
                  {teacher.assignedBatches?.map((b) => b.name).join(", ") ||
                    "N/A"}
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(teacher)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading && <p>Loading...</p>}
      </div>
      <div
        className="modal fade"
        id="teacherModal"
        tabIndex="-1"
        aria-labelledby="teacherModalLabel"
        aria-hidden="true"
        style={{ top: "100px" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {/* HEADER */}
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="teacherModalLabel">
                Create Teacher
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {/* BODY */}
            <div className="modal-body">
              <RegisterTeacher /> {/* UPDATED */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Teacher;

function RegisterTeacher() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "teacher", // IMPORTANT CHANGE
  });

  /* ------------------- HANDLE CHANGE ------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ------------------- HANDLE SUBMIT ------------------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Teacher Payload:", formData);

    dispatch(createUsersThunk(formData));

    // Reset form
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "teacher",
    });
  };

  /* ------------------- UI ------------------- */
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Teacher Registration
        </h2>

        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded form-control"
        />

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded form-control"
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded form-control"
        />

        {/* ROLE (FIXED) */}
        <input type="hidden" name="role" value="teacher" />

        <button type="submit" className="btn btn-primary w-100 py-2 mt-4">
          Register Teacher
        </button>
      </form>
    </div>
  );
}
