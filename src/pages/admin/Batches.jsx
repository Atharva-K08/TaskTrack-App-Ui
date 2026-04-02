import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createBatchThunk,
  deleteBatchThunk,
  fetchBatchThunk,
  updateBatchThunk,
} from "../../features/batches/batchSlice";
import { useSelector } from "react-redux";
function Batches() {
  const [selectedBatch, setSelectedBatch] = useState(null);

  return (
    <div>
      <CourseForm
        selectedBatch={selectedBatch}
        setSelectedBatch={setSelectedBatch}
      />

      <BatchTable setSelectedBatch={setSelectedBatch} />
    </div>
  );
}

export default Batches;
const CourseForm = ({ selectedBatch, setSelectedBatch }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  // Prefill form when editing
  useEffect(() => {
    if (selectedBatch) {
      setFormData({
        name: selectedBatch.name || "",
        description: selectedBatch.description || "",
        startDate: selectedBatch.startDate?.slice(0, 10) || "",
        endDate: selectedBatch.endDate?.slice(0, 10) || "",
      });
    }
  }, [selectedBatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => {
    setFormData({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
    });
    setSelectedBatch(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedBatch) {
      // UPDATE
      await dispatch(
        updateBatchThunk({ id: selectedBatch._id, data: formData }),
      );
    } else {
      // CREATE
      await dispatch(createBatchThunk(formData));
    }

    dispatch(fetchBatchThunk());
    reset();
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            {selectedBatch ? "Edit Batch" : "Create Batch"}
          </h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              className="form-control mb-3"
              placeholder="Batch Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              className="form-control mb-3"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />

            <div className="row">
              <div className="col-md-6">
                <input
                  type="date"
                  name="startDate"
                  className="form-control"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  type="date"
                  name="endDate"
                  className="form-control"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button className="btn btn-primary mt-3 w-100">
              {selectedBatch ? "Update Batch" : "Create Batch"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
const BatchTable = ({ setSelectedBatch }) => {
  const { batches, loading } = useSelector((state) => state.batch);
  console.log("-------------------");
  console.log("b", batches);
  console.log("-------------------");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBatchThunk());
  }, []);

  return (
    <div className="table-responsive p-4">
      {!loading ? (
        <table className="table table-hover border">
          <thead>
            <tr>
              <th>Name</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {batches.map((batch) => (
              <tr key={batch._id}>
                <td>{batch.name}</td>
                <td>{batch.startDate?.slice(0, 10)}</td>
                <td>{batch.endDate?.slice(0, 10)}</td>
                <td>{batch.status}</td>

                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => setSelectedBatch(batch)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => dispatch(deleteBatchThunk(batch._id))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};
