import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getCourseById } from '../api/courses';
import { getLessonsByCourse } from '../api/lessons';
import { useAuth } from '../context/AuthContext';
import GlobalLoader from '../components/GlobalLoader';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function CourseLessons() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [courseData, setCourseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [courseId]);

  const fetchData = async () => {
    setIsLoading(true);
    
    // Fetch course details
    const courseResult = await getCourseById(courseId, token);
    if (courseResult.success) {
      setCourseData(courseResult.data);
    }

    // Fetch lessons for this course
    const lessonsResult = await getLessonsByCourse(courseId, token);
    
    if (lessonsResult.success) {
      setLessons(lessonsResult.data || []);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Load Lessons',
        text: lessonsResult.message || 'An error occurred while fetching lessons',
      });
      setLessons([]);
    }
    
    setIsLoading(false);
  };

  const getContentTypeIcon = (contentType) => {
    const iconMap = {
      'text': 'fas fa-file-alt',
      'video': 'fas fa-video',
      'audio': 'fas fa-headphones',
      'doc': 'fas fa-file-word',
      'pdf': 'fas fa-file-pdf',
    };
    return iconMap[contentType?.toLowerCase()] || 'fas fa-file';
  };

  const getContentTypeBadge = (contentType) => {
    const badgeMap = {
      'text': 'bg-info',
      'video': 'bg-danger',
      'audio': 'bg-primary',
      'doc': 'bg-warning',
      'pdf': 'bg-secondary',
    };
    return badgeMap[contentType?.toLowerCase()] || 'bg-dark';
  };

  const handleViewLesson = (lesson) => {
    // Build content display based on content type and available URLs
    let contentHtml = `
      <div class="text-start">
        <p><strong>Duration:</strong> ${lesson.duration || 'N/A'}</p>
        <p><strong>Type:</strong> ${lesson.content_type || 'N/A'}</p>
        <p><strong>Description:</strong> ${lesson.description || 'No description'}</p>
    `;

    // Display content based on type
    if (lesson.content_type === 'text' && lesson.content) {
      contentHtml += `
        <div class="alert alert-info mt-3">
          <strong>Content:</strong>
          <div class="mt-2">${lesson.content}</div>
        </div>
      `;
    } else if (lesson.content_type === 'video' && lesson.video_url) {
      contentHtml += `
        <div class="mt-3">
          <strong>Video:</strong>
          <div class="mt-2">
            <video width="100%" height="400" controls style="border-radius: 8px; background: #000;">
              <source src="${lesson.video_url}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      `;
    } else if (lesson.content_type === 'audio' && lesson.file_url) {
      contentHtml += `
        <div class="mt-3">
          <strong>Audio:</strong>
          <div class="mt-2">
            <audio controls style="width: 100%;">
              <source src="${lesson.file_url}" type="audio/webm">
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      `;
    } else if (lesson.content_type === 'doc' && lesson.file_url) {
      const fileName = lesson.file_url.split('/').pop();
      contentHtml += `
        <div class="mt-3">
          <strong>Document:</strong>
          <div class="mt-2">
            <a href="${lesson.file_url}" target="_blank" class="btn btn-outline-primary btn-sm">
              <i class="fas fa-file-download me-2"></i>Download ${fileName}
            </a>
          </div>
        </div>
      `;
    } else if (lesson.content_type === 'pdf' && lesson.file_url) {
      contentHtml += `
        <div class="mt-3">
          <strong>PDF File:</strong>
          <div class="mt-2">
            <a href="${lesson.file_url}" target="_blank" class="btn btn-outline-danger btn-sm me-2">
              <i class="fas fa-file-pdf me-2"></i>View PDF
            </a>
            <a href="${lesson.file_url}" download class="btn btn-outline-primary btn-sm">
              <i class="fas fa-download me-2"></i>Download
            </a>
          </div>
        </div>
      `;
    }

    contentHtml += `</div>`;

    Swal.fire({
      title: lesson.title,
      html: contentHtml,
      icon: 'info',
      width: '700px',
      confirmButtonText: 'Close',
    });
  };

  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="content-page-header">
              <div>
                <button 
                  onClick={() => navigate('/courses')}
                  className="btn btn-link p-0 me-2"
                >
                  <i className="fas fa-arrow-left"></i>
                </button>
                <h5 style={{ display: 'inline' }}>
                  {courseData?.title} - Lessons
                </h5>
              </div>
              <div className="list-btn">
                <ul className="filter-list">
                  <li>
                    <Link className="btn btn-primary" to={`/add-lesson?courseId=${courseId}`}>
                      <i className="fa fa-plus-circle me-2"></i>
                      Add Lesson
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  {isLoading ? (
                    <div className="d-flex justify-content-center">
                      <GlobalLoader visible={true} size="medium" />
                    </div>
                  ) : lessons.length === 0 ? (
                    <div className="text-center py-5">
                      <p className="text-muted">No lessons found for this course</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Order</th>
                            <th>Lesson Title</th>
                            <th>Type</th>
                            <th>Duration</th>
                            <th>Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lessons.map((lesson) => {
                            // Determine available content types
                            const availableTypes = [];
                            if (lesson.allowed_types && Array.isArray(lesson.allowed_types)) {
                              lesson.allowed_types.forEach(type => {
                                const urlField = `${type}_url`;
                                if (lesson[urlField]) {
                                  availableTypes.push(type);
                                }
                              });
                            }

                            return (
                              <tr key={lesson.id}>
                                <td>
                                  <span className="badge bg-primary">{lesson.order || '-'}</span>
                                </td>
                                <td>{lesson.title}</td>
                                <td>
                                  <span className={`badge ${getContentTypeBadge(lesson.content_type)}`}>
                                    <i className={`${getContentTypeIcon(lesson.content_type)} me-1`}></i>
                                    {lesson.content_type}
                                  </span>
                                </td>
                                <td>{lesson.duration || '-'}</td>
                                <td>{lesson.description || '-'}</td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <button 
                                      className="btn btn-sm btn-outline-primary"
                                      onClick={() => handleViewLesson(lesson)}
                                      title="View Lesson"
                                    >
                                      <i className="fas fa-eye"></i>
                                    </button>
                                    <button 
                                      className="btn btn-sm btn-outline-warning"
                                      title="Edit Lesson"
                                    >
                                      <i className="fas fa-edit"></i>
                                    </button>
                                    <button 
                                      className="btn btn-sm btn-outline-danger"
                                      title="Delete Lesson"
                                    >
                                      <i className="fas fa-trash"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
