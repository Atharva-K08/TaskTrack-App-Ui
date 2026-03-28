import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createBatchThunk,
  fetchBatchThunk,
} from "../../features/batches/batchSlice";
import { useSelector } from "react-redux";

function Batches() {
  return (
    <div>
      <CourseForm />
      <BatchTable />
    </div>
  );
}

export default Batches;

const CourseForm = () => {
  const dispatch = useDispatch();
  // Parsing ISO strings to YYYY-MM-DD for HTML5 date inputs
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    dispatch(createBatchThunk(formData));
    reset();
    dispatch(fetchBatchThunk());
  };

  const reset = () => {
    setFormData({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Batch Details</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Course Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Description</label>
              <textarea
                className="form-control"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="d-grid mt-3">
              <button type="submit" className="btn btn-primary btn-lg">
                Update Batch
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const BatchTable = () => {
  // Pulling data from the Redux store
  const { batches, loading } = useSelector((state) => state.batch);
  console.log("==============");
  console.log("BatchTable Rendered with batches:", batches);
  console.log("==============");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBatchThunk());
  }, []);

  if (loading && batches.length === 0 && !batches) {
    return <p className="p-4 text-blue-500">Loading batch data...</p>;
  }

  return (
    <div className="table-responsive p-4">
      <table className="table table-hover border">
        <thead className="table-light">
          <tr>
            <th scope="col">Batch Name</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {batches.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="text-center text-muted fst-italic py-4"
              >
                No batches found.
              </td>
            </tr>
          ) : (
            batches.map((batch) => (
              <tr key={batch._id}>
                <td className="fw-bold">{batch.name}</td>
                <td>{new Date(batch.startDate).toLocaleDateString()}</td>
                <td>{new Date(batch.endDate).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge rounded-pill ${
                      batch.status === "Active"
                        ? "bg-success"
                        : batch.status === "Pending"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                    }`}
                  >
                    {batch.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
