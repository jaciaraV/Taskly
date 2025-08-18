import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteTaskModal from '@components/Delete/DeleteTask';

describe('DeleteTaskModal', () => {
  test('confirm deletion', async () => {
    const user = userEvent.setup();
    const onConfirm = jest.fn();
    const onClose = jest.fn();
    render(
      <DeleteTaskModal
        open
        taskTitle="Read 20 min"
        onConfirm={onConfirm}
        onClose={onClose}
      />,
    );
    expect(screen.getByText(/read 20 min/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /delete/i }));
    expect(onConfirm).toHaveBeenCalled();
  });

  test('cancel without deleting', async () => {
    const onConfirm = jest.fn();
    const onClose = jest.fn();
    render(
      <DeleteTaskModal
        open
        taskTitle="Test"
        onConfirm={onConfirm}
        onClose={onClose}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onConfirm).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});
