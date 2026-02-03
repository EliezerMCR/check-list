import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../../test/test-utils';
import { CheckListItem } from '../CheckListItem';

describe('CheckListItem - User Interactions', () => {
  const mockItem = {
    message: 'Test task',
    done: false,
    created_at: new Date('2026-02-01T12:00:00Z'),
  };
  const defaultProps = {
    item: mockItem,
    isChecked: false,
    onToggle: vi.fn(),
    onEdit: vi.fn(),
    onDelete: vi.fn(),
    isDuplicate: vi.fn(() => false),
  };

  it('should toggle item when checkbox is clicked', async () => {
    const onToggle = vi.fn();
    const { user, container } = renderWithProviders(
      <CheckListItem {...defaultProps} onToggle={onToggle} />
    );

    const checkbox = container.querySelector('button');
    await user.click(checkbox!);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('should call onEdit with new message', async () => {
    const onEdit = vi.fn();
    const { user, container } = renderWithProviders(
      <CheckListItem {...defaultProps} onEdit={onEdit} />
    );

    // Click edit button
    const buttons = container.querySelectorAll('button');
    await user.click(buttons[1]);

    await waitFor(async () => {
      const input = screen.getByDisplayValue('Test task');
      await user.clear(input);
      await user.type(input, 'Updated task');

      // Click save button
      const saveButton = container.querySelector('button');
      await user.click(saveButton!);
    });

    expect(onEdit).toHaveBeenCalledWith('Updated task');
  });

  it('should call onDelete when delete button is clicked', async () => {
    const onDelete = vi.fn();
    const { user, container } = renderWithProviders(
      <CheckListItem {...defaultProps} onDelete={onDelete} />
    );

    const buttons = container.querySelectorAll('button');
    await user.click(buttons[2]);

    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('should show validation error for empty message', async () => {
    const { user, container } = renderWithProviders(
      <CheckListItem {...defaultProps} />
    );

    const buttons = container.querySelectorAll('button');
    await user.click(buttons[1]);

    await waitFor(async () => {
      const input = screen.getByDisplayValue('Test task');
      await user.clear(input);

      // Try to save empty
      const saveButton = container.querySelector('button');
      await user.click(saveButton!);
    });

    expect(screen.getByText('El texto de la tarea es requerido')).toBeInTheDocument();
  });
});
