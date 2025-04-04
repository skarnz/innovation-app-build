import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Placeholder for API base URL - adjust if backend runs elsewhere
const API_BASE_URL = '/api';

// --- Authentication ---

export async function getAuthStatus() {
  // TODO: Implement actual fetch call to backend endpoint (e.g., /api/auth/status)
  console.log('TODO: Fetching auth status...');
  // Placeholder: Simulate logged-out state initially
  return { isAuthenticated: false, user: null };
}

export async function loginWithGithub() {
  // Redirects the user to the backend GitHub login route
  window.location.href = `${API_BASE_URL}/auth/github`;
}

export async function loginWithGoogle() {
    // Placeholder: Implement Google login redirect if needed
    console.warn('Google login not implemented yet.');
    // window.location.href = `${API_BASE_URL}/auth/google`;
}


export async function logout() {
  // Redirects the user to the backend logout route
  window.location.href = `${API_BASE_URL}/auth/logout`;
}

// --- File Management ---

export async function getFiles(projectId: string) {
  // TODO: Implement actual fetch call to backend endpoint (e.g., /api/projects/{projectId}/files)
  console.log(`TODO: Fetching files for project ${projectId}...`);
  // Placeholder: Return empty array
  return [];
}

// --- AI Agent ---

export async function getAiReply(message: string, context: any) {
  // TODO: Implement actual fetch call to backend endpoint (e.g., /api/ai/chat)
  console.log('TODO: Sending message to AI...', { message, context });
  // Placeholder: Return a simple response
  return { reply: 'AI response placeholder.' };
}

// Add other necessary API functions as identified... 