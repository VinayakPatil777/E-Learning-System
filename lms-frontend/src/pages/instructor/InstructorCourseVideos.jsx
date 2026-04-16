import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getVideosByCourseApi,
  uploadVideoApi,
  deleteVideoApi,
} from "../../features/instructor/instructorApi";

import "./InstructorCourseVideos.css";

const InstructorCourseVideos = () => {
  const { courseId } = useParams();

  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // ================= LOAD VIDEOS =================
  const loadVideos = async () => {
    try {
      const res = await getVideosByCourseApi(courseId);
      setVideos(res.data);
    } catch {
      toast.error("Failed to load videos");
    }
  };

  useEffect(() => {
    loadVideos();
  }, [courseId]);

  // ================= UPLOAD =================
  const uploadVideo = async (e) => {
    e.preventDefault();

    if (!title || !file) {
      toast.error("Title and video file required");
      return;
    }

    try {
      setLoading(true);
      await uploadVideoApi(courseId, title, file);
      toast.success("Video uploaded successfully");

      setTitle("");
      setFile(null);
      document.getElementById("videoFile").value = "";

      loadVideos();
    } catch {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const deleteVideo = async (videoId) => {
    if (!window.confirm("Delete this video?")) return;

    try {
      await deleteVideoApi(videoId);
      toast.success("Video deleted");
      loadVideos();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="container py-5">
      {/* ================= HEADER ================= */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-white border shadow-sm rounded-pill px-4 py-2 fw-bold text-secondary d-flex align-items-center gap-2 hover-scale transition-all"
              onClick={() => window.history.back()}
            >
              <span style={{ fontSize: '1.2rem', lineHeight: 0 }}>←</span> Back
            </button>
            <div>
              <h2 className="fw-bold mb-0 text-dark">🎬 Course Content</h2>
              <p className="text-muted mb-0">Manage your course videos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-5">
        {/* ================= LEFT: UPLOAD CARD ================= */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden sticky-top" style={{ top: '100px', zIndex: 90 }}>
            <div className="card-header bg-purple text-white p-4 border-0">
              <h5 className="fw-bold mb-0">Upload New Component</h5>
              <small className="opacity-75">Add a new lecture to this course</small>
            </div>
            <div className="card-body p-4">
              <form onSubmit={uploadVideo}>
                <div className="mb-3">
                  <label className="form-label fw-bold small text-muted text-uppercase">Lecture Title</label>
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light border-0"
                    placeholder="e.g. Introduction to React"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold small text-muted text-uppercase">Video File</label>
                  <div className="file-upload-wrapper border-2 border-dashed border-purple bg-purple bg-opacity-10 rounded-3 p-4 text-center cursor-pointer transition-all hover-border-purple">
                    <input
                      id="videoFile"
                      type="file"
                      accept="video/*"
                      className="form-control d-none"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    <label htmlFor="videoFile" className="cursor-pointer w-100 h-100 d-block">
                      <div className="mb-2 text-purple" style={{ fontSize: '2rem' }}>☁️</div>
                      {file ? (
                        <span className="fw-bold text-purple">{file.name}</span>
                      ) : (
                        <span className="text-muted fw-medium">Click to browse video</span>
                      )}
                    </label>
                  </div>
                </div>

                <button
                  disabled={loading}
                  className="btn btn-purple btn-lg w-100 rounded-pill shadow-purple fw-bold d-flex align-items-center justify-content-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <span>🚀</span> Upload Lecture
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ================= RIGHT: VIDEO LIST ================= */}
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-dark mb-0">Course Lectures <span className="badge bg-purple-light text-purple rounded-pill ms-2">{videos.length}</span></h4>
          </div>

          {videos.length === 0 ? (
            <div className="text-center py-5 bg-white rounded-4 shadow-sm border border-dashed">
              <div className="display-1 mb-3 opacity-25">🎥</div>
              <h4 className="fw-bold text-muted">No lectures yet</h4>
              <p className="text-muted">Upload your first video to get started!</p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {videos.map((v, index) => (
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden hover-card transition-all" key={v.videoId}>
                  <div className="card-body p-0 d-flex align-items-center">
                    {/* Index & Icon */}
                    <div className="bg-light p-4 d-flex flex-column align-items-center justify-content-center text-muted border-end" style={{ minWidth: '80px' }}>
                      <span className="fw-bold h5 mb-0">#{index + 1}</span>
                    </div>

                    {/* Info */}
                    <div className="p-4 flex-grow-1">
                      <h5 className="fw-bold text-dark mb-1">{v.title}</h5>
                      <div className="d-flex align-items-center gap-2 text-muted small">
                        <span className="badge bg-light text-secondary border">MP4</span>
                        <span>•</span>
                        <span className="text-truncate" style={{ maxWidth: '200px' }}>{v.filePath.split("\\").pop()}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pe-4">
                      <button
                        className="btn btn-light text-danger rounded-circle p-2 d-flex align-items-center justify-content-center hover-scale shadow-sm"
                        onClick={() => deleteVideo(v.videoId)}
                        title="Delete Video"
                        style={{ width: '45px', height: '45px' }}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorCourseVideos;
