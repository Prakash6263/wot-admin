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
    // Build content display based on available URLs
    let contentHtml = `
      <div class="text-start">
        <p><strong>Duration:</strong> ${lesson.duration || 'N/A'}</p>
        <p><strong>Type:</strong> ${lesson.content_type || 'N/A'}</p>
        <p><strong>Description:</strong> ${lesson.description || 'No description'}</p>
    `;

    // Display available content types
    if (lesson.allowed_types && Array.isArray(lesson.allowed_types)) {
      contentHtml += `<p><strong>Content Available In:</strong></p><div class="mb-3">`;
      
      lesson.allowed_types.forEach(type => {
        let icon = '';
        let label = '';
        let urlField = `${type}_url`;
        let url = lesson[urlField];

        switch(type.toLowerCase()) {
          case 'video':
            icon = '<i class="fas fa-video text-danger"></i>';
            label = 'Video';
            break;
          case 'audio':
            icon = '<i class="fas fa-headphones text-primary"></i>';
            label = 'Audio';
            break;
          case 'text':
            icon = '<i class="fas fa-file-alt text-info"></i>';
            label = 'Text';
            break;
          case 'doc':
            icon = '<i class="fas fa-file-word text-warning"></i>';
            label = 'Document';
            break;
          case 'pdf':
            icon = '<i class="fas fa-file-pdf text-secondary"></i>';
            label = 'PDF';
            break;
          default:
            icon = '<i class="fas fa-file"></i>';
            label = type;
        }

        if (url) {
          contentHtml += `<a href="${url}" target="_blank" class="btn btn-sm btn-outline-primary me-2 mb-2">${icon} Download ${label}</a>`;
        } else {
          contentHtml += `<span class="badge bg-light text-dark me-2 mb-2">${icon} ${label} (Not available)</span>`;
        }
      });

      contentHtml += `</div>`;
    }

    // Show text content if available
    if (lesson.text_content) {
      contentHtml += `<div class="alert alert-info"><strong>Content:</strong><br/>${lesson.text_content}</div>`;
    }

    contentHtml += `</div>`;

    Swal.fire({
      title: lesson.title,
      html: contentHtml,
      icon: 'info',
      width: '600px',
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
