import { useState, useEffect } from 'react';

export default function QuestionsModal({ show, quizData, onClose, isLoading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    console.log('[v0] QuestionsModal - Show:', show, 'Quiz:', quizData?.quiz_id);
    if (show) {
      setCurrentPage(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show, quizData]);

  if (!show || !quizData) return null;

  const questions = quizData.questions || [];
  const totalPages = Math.ceil(questions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuestions = questions.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleClose = () => {
    console.log('[v0] Closing QuestionsModal');
    onClose();
  };

  const getCorrectAnswerText = (question) => {
    if (question.correct_answer !== undefined) {
      const index = question.correct_answer;
      return question.options && question.options[index] ? question.options[index] : 'N/A';
    }
    return 'N/A';
  };

  return (
    <>
      <div 
        className="modal"
        style={{ 
          display: show ? 'block' : 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1050,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          width: '100%',
          height: '100%'
        }}
        onClick={handleClose}
      >
        <div 
          className="modal-dialog modal-lg"
          style={{ position: 'relative', margin: '1.75rem auto' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{quizData.title} - Questions</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : questions.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted">No questions available</p>
              </div>
            ) : (
              <>
                <div className="mb-3">
                  <p className="text-muted mb-0">
                    Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, questions.length)} of {questions.length} questions
                  </p>
                </div>

                {paginatedQuestions.map((question, index) => (
                  <div key={question.id || startIndex + index} className="card mb-3">
                    <div className="card-body">
                      <h6 className="card-title mb-3">
                        <span className="badge bg-primary me-2">{startIndex + index + 1}</span>
                        {question.question}
                      </h6>

                      <div className="ms-4">
                        {question.type === 'percentage' ? (
                          <>
                            <strong className="text-muted d-block mb-2">Options (Percentage Range):</strong>
                            <ul className="list-unstyled">
                              {question.options && question.options.map((option, optionIndex) => (
                                <li 
                                  key={optionIndex}
                                  className={`mb-2 p-2 rounded ${
                                    optionIndex === question.correct_answer 
                                      ? 'bg-success bg-opacity-10 border-start border-success border-3' 
                                      : 'border-start border-secondary border-3'
                                  }`}
                                >
                                  <span className="me-2">
                                    {String.fromCharCode(65 + optionIndex)}.
                                  </span>
                                  {option}%
                                  {optionIndex === question.correct_answer && (
                                    <span className="badge bg-success ms-2">Correct</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                            {question.tolerance && (
                              <small className="text-muted">Tolerance: ±{question.tolerance}%</small>
                            )}
                          </>
                        ) : (
                          <>
                            <strong className="text-muted d-block mb-2">Options:</strong>
                            <ul className="list-unstyled">
                              {question.options && question.options.map((option, optionIndex) => (
                                <li 
                                  key={optionIndex}
                                  className={`mb-2 p-2 rounded ${
                                    optionIndex === question.correct_answer 
                                      ? 'bg-success bg-opacity-10 border-start border-success border-3' 
                                      : 'border-start border-secondary border-3'
                                  }`}
                                >
                                  <span className="me-2">
                                    {String.fromCharCode(65 + optionIndex)}.
                                  </span>
                                  {option}
                                  {optionIndex === question.correct_answer && (
                                    <span className="badge bg-success ms-2">Correct</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="modal-footer">
            <div className="me-auto">
              <small className="text-muted">
                Page {currentPage} of {totalPages || 1}
              </small>
            </div>
            <button 
              type="button" 
              className="btn btn-sm btn-outline-primary"
              onClick={handlePrevious}
              disabled={currentPage === 1 || isLoading}
            >
              <i className="fas fa-chevron-left me-1"></i>Previous
            </button>
            <button 
              type="button" 
              className="btn btn-sm btn-outline-primary"
              onClick={handleNext}
              disabled={currentPage === totalPages || isLoading}
            >
              Next<i className="fas fa-chevron-right ms-1"></i>
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={handleClose}
            >
              Close
            </button>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
