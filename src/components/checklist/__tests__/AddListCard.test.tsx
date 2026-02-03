import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../../test/test-utils';
import { AddListCard } from '../AddListCard';

describe('AddListCard - User Interactions', () => {
  it('should create list when user submits', async () => {
    const onListCreated = vi.fn();
    const { user } = renderWithProviders(<AddListCard onListCreated={onListCreated} />);

    await user.click(screen.getByText('Agregar lista'));

    const input = screen.getByPlaceholderText('Nombre de la lista...');
    await user.type(input, 'Shopping List');

    await user.click(screen.getByText('Crear'));

    await waitFor(() => {
      expect(onListCreated).toHaveBeenCalledWith(expect.stringMatching(/^shopping-list-\d+$/));
    });
  });

  it('should show validation error for empty title', async () => {
    const { user } = renderWithProviders(<AddListCard />);

    await user.click(screen.getByText('Agregar lista'));
    await user.click(screen.getByText('Crear'));

    expect(screen.getByText('El nombre de la lista es requerido')).toBeInTheDocument();
  });

  it('should show validation error for duplicate title', async () => {
    const { user } = renderWithProviders(<AddListCard />);

    // Create first list
    await user.click(screen.getByText('Agregar lista'));
    let input = screen.getByPlaceholderText('Nombre de la lista...');
    await user.type(input, 'Shopping');
    await user.click(screen.getByText('Crear'));

    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Nombre de la lista...')).not.toBeInTheDocument();
    });

    // Try duplicate
    await user.click(screen.getByText('Agregar lista'));
    input = screen.getByPlaceholderText('Nombre de la lista...');
    await user.type(input, 'Shopping');
    await user.click(screen.getByText('Crear'));

    expect(screen.getByText('Ya existe una lista con este nombre')).toBeInTheDocument();
  });
});
