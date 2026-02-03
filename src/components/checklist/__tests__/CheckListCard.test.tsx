import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../test/test-utils';
import { CheckListCard } from '../CheckListCard';

describe('CheckListCard - User Interactions', () => {
  const mockCheckList = {
    slug: 'test-list-123',
    title: 'My List',
    items: [
      { message: 'Task 1', done: false, created_at: new Date() },
      { message: 'Task 2', done: true, created_at: new Date() },
    ],
    created_at: new Date(),
  };

  it('should render list with items', () => {
    renderWithProviders(<CheckListCard checkList={mockCheckList} />);

    expect(screen.getByText('My List')).toBeInTheDocument();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('should show progress counter', () => {
    renderWithProviders(<CheckListCard checkList={mockCheckList} />);
    expect(screen.getByText('1/2 completado')).toBeInTheDocument();
  });

  it('should show validation error for empty item', async () => {
    const { user } = renderWithProviders(<CheckListCard checkList={mockCheckList} />);

    // Find the add button next to the input
    const addButtons = screen.getAllByRole('button');
    const addButton = addButtons.find(btn =>
      btn.querySelector('svg path[d*="M12 4v16m8-8H4"]')
    );

    await user.click(addButton!);

    expect(screen.getByText('El texto de la tarea es requerido')).toBeInTheDocument();
  });

  it('should show validation error for duplicate item', async () => {
    const { user } = renderWithProviders(<CheckListCard checkList={mockCheckList} />);

    const input = screen.getByPlaceholderText('Agregar nueva tarea...');
    await user.type(input, 'Task 1');

    // Find the add button
    const addButtons = screen.getAllByRole('button');
    const addButton = addButtons.find(btn =>
      btn.querySelector('svg path[d*="M12 4v16m8-8H4"]')
    );

    await user.click(addButton!);

    expect(screen.getByText('Ya existe una tarea con este nombre')).toBeInTheDocument();
  });
});
