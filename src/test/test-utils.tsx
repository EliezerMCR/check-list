import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckListProvider } from '../context/CheckListProvider';
import type { CheckList } from '../types';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialLists?: CheckList[];
}

export function renderWithProviders(
  ui: React.ReactElement,
  options?: CustomRenderOptions
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <CheckListProvider>{children}</CheckListProvider>
  );

  const user = userEvent.setup();

  return {
    user,
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
}

// Re-export specific testing library functions
export { screen, waitFor, within } from '@testing-library/react';
export { userEvent };
