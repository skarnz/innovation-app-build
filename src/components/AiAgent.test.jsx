import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest'; // vi for spies/mocks if needed
import AiAgent from './AiAgent';

describe('AiAgent', () => {
  it('renders the AI agent component when open', () => {
    render(<AiAgent />);

    // Check for key elements
    expect(screen.getByText('AI Agent')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ask AI...')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument(); // The model selector
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('can be closed and reopened', () => {
    render(<AiAgent />);

    // Find and click the close button (using its text content 'X' for simplicity)
    const closeButton = screen.getByRole('button', { name: 'X' });
    fireEvent.click(closeButton);

    // Agent should disappear, toggle button should appear
    expect(screen.queryByText('AI Agent')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open ai agent/i })).toBeInTheDocument();

    // Click the toggle button to reopen
    fireEvent.click(screen.getByRole('button', { name: /open ai agent/i }));

    // Agent should reappear
    expect(screen.getByText('AI Agent')).toBeInTheDocument();
  });

  // Add more tests later for sending messages, model selection changes etc.
}); 