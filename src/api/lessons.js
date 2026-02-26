const API_BASE_URL = 'https://api.wayoftrading.com/aitredding';

// Get all lessons for a course
export const getLessonsByCourse = async (courseId, token) => {
  try {
    const url = `${API_BASE_URL}/courses/${courseId}/lessons`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
      },
    });

    const data = await response.json();

    if (data.status === 1) {
      return {
        success: true,
        data: data.data,
        message: data.message,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to fetch lessons',
      };
    }
  } catch (error) {
    console.error('Get Lessons API Error:', error);
    return {
      success: false,
      message: error.message || 'An error occurred while fetching lessons',
    };
  }
};

// Get single lesson
export const getLessonById = async (lessonId, token) => {
  try {
    const url = `${API_BASE_URL}/courses/lessons/${lessonId}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
      },
    });

    const data = await response.json();

    if (data.status === 1) {
      return {
        success: true,
        data: data.data,
        message: data.message,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to fetch lesson',
      };
    }
  } catch (error) {
    console.error('Get Lesson API Error:', error);
    return {
      success: false,
      message: error.message || 'An error occurred while fetching lesson',
    };
  }
};

// Update lesson
export const updateLesson = async (courseId, lessonId, lessonData, token) => {
  try {
    const url = `${API_BASE_URL}/courses/lessons/${lessonId}/update`;
    
    const formData = new FormData();
    formData.append('title', lessonData.title);
    formData.append('description', lessonData.description);
    formData.append('content', lessonData.content);
    formData.append('content_type', lessonData.content_type);
    formData.append('duration', lessonData.duration || '');
    formData.append('order', lessonData.order);
    
    if (lessonData.media instanceof File) {
      formData.append('media', lessonData.media);
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
      },
      body: formData,
    });

    const data = await response.json();

    if (data.status === 1) {
      return {
        success: true,
        data: data.data,
        message: data.message,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to update lesson',
      };
    }
  } catch (error) {
    console.error('Update Lesson API Error:', error);
    return {
      success: false,
      message: error.message || 'An error occurred while updating lesson',
    };
  }
};

// Delete lesson
export const deleteLesson = async (lessonId, token) => {
  try {
    const url = `${API_BASE_URL}/courses/lessons/${lessonId}/delete`;
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
      },
    });

    const data = await response.json();

    if (data.status === 1) {
      return {
        success: true,
        data: data.data,
        message: data.message,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to delete lesson',
      };
    }
  } catch (error) {
    console.error('Delete Lesson API Error:', error);
    return {
      success: false,
      message: error.message || 'An error occurred while deleting lesson',
    };
  }
};

// Get lesson content
export const getLessonContent = async (lessonId, token) => {
  try {
    console.log('[v0] Fetching lesson content for lessonId:', lessonId);
    const url = `${API_BASE_URL}/courses/admin/lesson/${lessonId}/content`;
    console.log('[v0] API URL:', url);
    console.log('[v0] Token present:', !!token);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[v0] Get Lesson Content HTTP Error:', response.status, errorText);
      return {
        success: false,
        message: `HTTP Error: ${response.status}`,
      };
    }

    const data = await response.json();

    if (data.status === 1) {
      return {
        success: true,
        data: data.data,
        message: data.message,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to fetch lesson content',
      };
    }
  } catch (error) {
    console.error('[v0] Get Lesson Content API Error:', error);
    return {
      success: false,
      message: error.message || 'An error occurred while fetching lesson content',
    };
  }
};

// Add new lesson
export const addLesson = async (courseId, lessonData, token) => {
  try {
    const url = `${API_BASE_URL}/courses/${courseId}/lessons/add`;
    
    const formData = new FormData();
    formData.append('title', lessonData.title);
    formData.append('description', lessonData.description);
    formData.append('content', lessonData.content);
    formData.append('content_type', lessonData.content_type);
    formData.append('duration', lessonData.duration || '');
    formData.append('order', lessonData.order);
    
    if (lessonData.media instanceof File) {
      formData.append('media', lessonData.media);
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
      },
      body: formData,
    });

    const data = await response.json();

    if (data.status === 1) {
      return {
        success: true,
        data: data.data,
        message: data.message,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to add lesson',
      };
    }
  } catch (error) {
    console.error('Add Lesson API Error:', error);
    return {
      success: false,
      message: error.message || 'An error occurred while adding lesson',
    };
  }
};

// Create lesson content
export const createLessonContent = async (lessonId, contentData, token) => {
  try {
    const url = `${API_BASE_URL}/courses/admin/lesson/${lessonId}/content`;
    
    const formData = new FormData();
    formData.append('title', contentData.title);
    formData.append('content_type', contentData.content_type);
    
    if (contentData.text_content) {
      formData.append('text_content', contentData.text_content);
    }
    if (contentData.duration) {
      formData.append('duration', contentData.duration);
    }
    if (contentData.file_size) {
      formData.append('file_size', contentData.file_size);
    }
    if (contentData.is_downloadable !== undefined && contentData.is_downloadable !== null) {
      formData.append('is_downloadable', contentData.is_downloadable);
    }
    if (contentData.order_number !== undefined && contentData.order_number !== null) {
      formData.append('order_number', contentData.order_number);
    }
    if (contentData.media instanceof File) {
      formData.append('media', contentData.media);
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[v0] Create Content HTTP Error:', response.status, errorText);
      return {
        success: false,
        message: `HTTP Error: ${response.status}`,
      };
    }

    const data = await response.json();

    if (data.status === 1) {
      return {
        success: true,
        data: data.data,
        message: data.message,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to create lesson content',
      };
    }
  } catch (error) {
    console.error('[v0] Create Content API Error:', error);
    return {
      success: false,
      message: error.message || 'An error occurred while creating lesson content',
    };
  }
};

// Create lesson in chapter
export const createLesson = async (chapterId, lessonData, token) => {
  try {
    console.log('[v0] Creating lesson for chapter:', chapterId);
    const url = `${API_BASE_URL}/courses/admin/chapter/${chapterId}/lesson`;
    
    const formData = new FormData();
    formData.append('title', lessonData.title);
    formData.append('description', lessonData.description);
    formData.append('lesson_number', lessonData.lesson_number || 0);
    formData.append('duration', lessonData.duration || '');
    formData.append('xp_points', lessonData.xp_points || 0);
    formData.append('reward_points', lessonData.reward_points || 0);
    formData.append('is_preview', lessonData.is_preview || false);
    formData.append('is_locked', lessonData.is_locked || false);
    formData.append('quiz_available', lessonData.quiz_available || false);
    formData.append('status', lessonData.status || 'active');
    if (lessonData.order_number !== null && lessonData.order_number !== undefined) {
      formData.append('order_number', lessonData.order_number);
    }
    if (lessonData.thumbnail instanceof File) {
      formData.append('thumbnail', lessonData.thumbnail);
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
      },
      body: formData,
    });

    const data = await response.json();
    console.log('[v0] Create lesson response:', data);

    if (data.status === 1) {
      return {
        success: true,
        data: data.data,
        message: data.message,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to create lesson',
      };
    }
  } catch (error) {
    console.error('Create Lesson API Error:', error);
    return {
      success: false,
      message: error.message || 'An error occurred while creating lesson',
    };
  }
};
