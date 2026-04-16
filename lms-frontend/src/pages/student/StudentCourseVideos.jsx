import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getCourseVideosApi,
  streamVideoApi,
} from "../../services/studentApi";

const StudentCourseVideos = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);
  const [activeTitle, setActiveTitle] = useState("");

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const res = await getCourseVideosApi(courseId);
      setVideos(res.data);
    } catch {
      toast.error("Failed to load videos");
    }
  };

  const playVideo = async (video) => {
    try {
      const blob = await streamVideoApi(video.videoId);
      const url = URL.createObjectURL(blob);

      setVideoUrl(url);
      setActiveTitle(video.title);
    } catch (err) {
      toast.error(
        err.message === "Video stream failed"
          ? "Video file missing on server"
          : "Unauthorized"
      );
    }
  };

  return (
    <div className="container-fluid py-4 min-vh-100 bg-light">
      {/* HEADER */}
      <div className="d-flex align-items-center mb-4 px-3">
        <button className="btn btn-outline-secondary me-3 rounded-circle p-2 d-flex align-items-center justify-content-center"
          style={{ width: '40px', height: '40px' }}
          onClick={() => navigate("/student/my-courses")}>
          &larr;
        </button>
        <div>
          <h4 className="fw-bold mb-0 text-dark">Course Player</h4>
          <small className="text-muted">Watch and learn at your own pace</small>
        </div>
      </div>

      <div className="row g-4 px-3">
        {/* MAIN VIDEO AREA */}
        <div className="col-lg-8 col-xl-9">
          {videoUrl ? (
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden bg-black">
              <div className="card-body p-0">
                <video
                  src={videoUrl}
                  controls
                  controlsList="nodownload"
                  autoPlay
                  className="w-100 d-block"
                  style={{ maxHeight: '70vh', objectFit: 'contain' }}
                />
              </div>
              <div className="card-footer bg-white p-4">
                <h3 className="fw-bold mb-2 text-dark">{activeTitle}</h3>
                <p className="text-muted mb-0">Now Playing</p>
              </div>
            </div>
          ) : (
            <div className="card border-0 shadow-sm rounded-4 h-100 d-flex align-items-center justify-content-center p-5 text-center bg-white" style={{ minHeight: '400px' }}>
              <div>
                <div className="display-1 mb-3">🎬</div>
                <h3 className="fw-bold text-muted">Select a video to start playing</h3>
                <p className="text-muted">Choose from the playlist on the right</p>
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR PLAYLIST */}
        <div className="col-lg-4 col-xl-3">
          <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">
            <div className="card-header bg-purple text-white p-3 border-0">
              <h5 className="mb-0 fw-bold">📺 Course Content</h5>
              <small className="opacity-75">{videos.length} Videos available</small>
            </div>
            <div className="list-group list-group-flush overflow-auto" style={{ maxHeight: '70vh' }}>
              {videos.map((v, idx) => (
                <button
                  key={v.videoId}
                  onClick={() => playVideo(v)}
                  className={`list-group-item list-group-item-action p-3 border-bottom d-flex align-items-start gap-3 ${activeTitle === v.title ? 'bg-purple-light text-purple border-start border-4 border-purple' : ''}`}
                  style={{ transition: 'all 0.2s' }}
                >
                  <span className="badge bg-light text-dark border rounded-circle p-2 mt-1" style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {idx + 1}
                  </span>
                  <div>
                    <h6 className="mb-1 fw-bold">{v.title}</h6>
                    <small className="text-muted">Video • Click to play</small>
                  </div>
                </button>
              ))}
            </div>
            {videos.length === 0 && (
              <div className="p-4 text-center text-muted">
                <small>No videos uploaded yet.</small>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCourseVideos;
