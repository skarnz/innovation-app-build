// Base URL for our backend API
const API_BASE_URL = 'http://localhost:3000'; // Adjust if backend runs elsewhere

/**
 * Helper function to handle fetch responses and errors.
 * @param {Response} response - The response object from fetch.
 * @returns {Promise<any>} - The JSON parsed body.
 * @throws {Error} - Throws an error if the response is not ok.
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      // If response is not JSON, use status text
      errorData = { message: response.statusText };
    }
    const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
    error.status = response.status;
    error.data = errorData; 
    throw error;
  }
  // Handle cases where response might be empty (e.g., 204 No Content)
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
      return await response.json();
  }
  return null; // Return null or handle non-JSON responses as needed
};

// === API Service Functions ===

/**
 * Fetches files for a given project.
 * @param {string|number} projectId - The ID of the project.
 * @returns {Promise<Array<any>>} - A promise resolving to an array of file objects.
 */
export const getFiles = async (projectId) => {
  const response = await fetch(`${API_BASE_URL}/api/files?projectId=${encodeURIComponent(projectId)}`);
  return handleResponse(response);
};

/**
 * Sends a prompt to the AI backend proxy.
 * @param {string} model - The AI model to use ('claude', 'gpt', 'gemini').
 * @param {string} prompt - The user's prompt.
 * @returns {Promise<{reply: string}>} - A promise resolving to the AI's reply.
 */
export const getAiReply = async (model, prompt) => {
  const response = await fetch(`${API_BASE_URL}/api/ai`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model, prompt }),
  });
  return handleResponse(response);
};

/**
 * Checks the current authentication status with the backend.
 * @returns {Promise<{authenticated: boolean, user?: any}>} - Status object.
 */
export const getAuthStatus = async () => {
    // Include credentials to ensure session cookies are sent
    const response = await fetch(`${API_BASE_URL}/auth/status`, { credentials: 'include' });
    return handleResponse(response);
};

/**
 * Initiates the GitHub OAuth login flow by redirecting the user.
 */
export const loginWithGithub = () => {
    window.location.href = `${API_BASE_URL}/auth/github`;
};

/**
 * Logs the user out via the backend endpoint.
 */
export const logout = async () => {
    // Include credentials to ensure session cookies are sent
    const response = await fetch(`${API_BASE_URL}/auth/logout`, { credentials: 'include' });
    // Logout might redirect or return status, handle accordingly
    // For now, we assume it redirects, or we check status if needed
    console.log('Logout request sent. Status:', response.status);
    // Optionally, redirect frontend after logout confirmation if needed
    // window.location.href = '/login'; 
    return response; // Return raw response for flexibility
};

// Add more functions here later for:
// - Posting file metadata (POST /api/files)
// - Deleting file metadata (DELETE /api/files/:id)
// - Other API endpoints as needed 