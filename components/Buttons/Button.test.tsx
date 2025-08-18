import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '@/components/Buttons/Button';

describe('Button', () => {
  test('calls onclick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Add</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  test('does not call onClick when disabled', async () => {
  const onClick = jest.fn(); 
  render(<Button onClick={onClick} disabled>Add</Button>);

  await userEvent.click(screen.getByRole('button', { name: /add/i }));
  expect(onClick).not.toHaveBeenCalled();
});
});
