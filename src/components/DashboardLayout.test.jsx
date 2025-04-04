import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DashboardLayout from './DashboardLayout';

describe('DashboardLayout', () => {
  it('renders header, footer, and children', () => {
    const testMessage = 'Test Children Content';
    render(
      <DashboardLayout>
        <div>{testMessage}</div>
      </DashboardLayout>
    );

    // Check for placeholders / static text
    expect(screen.getByText(/App Header \/ Navigation/i)).toBeInTheDocument();
    expect(screen.getByText(/App Footer/i)).toBeInTheDocument();

    // Check if children are rendered
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });
}); 