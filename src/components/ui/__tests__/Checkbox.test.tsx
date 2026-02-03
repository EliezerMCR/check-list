import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  it('should call onChange when clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const { container } = render(<Checkbox checked={false} onChange={handleChange} />);

    const button = container.querySelector('button');
    await user.click(button!);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
