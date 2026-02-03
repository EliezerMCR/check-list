import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Input } from '../Input';

describe('Input', () => {
  it('should call onChange when user types', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} placeholder="test" />);

    const input = screen.getByPlaceholderText('test');
    await user.type(input, 'Hello');

    expect(handleChange).toHaveBeenCalled();
  });

  it('should display error message', () => {
    render(<Input error errorMessage="Error message" placeholder="test" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });
});
