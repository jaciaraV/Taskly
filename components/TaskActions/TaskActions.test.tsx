
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskActions from '@components/TaskActions/TaskActions';

const task = { _id: '1', title: 'Read 20 min', completed: false };

describe('TaskActions', () => {
  test('opens the menu by clicking on the three dots and closes with ESC', async () => {
    const user = userEvent.setup();

    render(
      <TaskActions
        task={task}
        onEdit={jest.fn()}
        onInfo={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    const kebab = screen.getByRole('button', { name: /read 20 min/i });
    await user.click(kebab);
    expect(await screen.findByRole('button', { name: /edit/i })).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('button', { name: /edit/i })).toBeNull();
  });

  test('triggers correct callbacks (Edit, Info, Delete)', async () => {
    const user = userEvent.setup();
    const onEdit = jest.fn();
    const onInfo = jest.fn();
    const onDelete = jest.fn();

    render(
      <TaskActions task={task} onEdit={onEdit} onInfo={onInfo} onDelete={onDelete} />
    );
    await user.click(screen.getByRole('button', { name: /read 20 min/i }));
    await user.click(await screen.findByRole('button', { name: /edit/i }));
    expect(onEdit).toHaveBeenCalledWith(task);
    await user.click(screen.getByRole('button', { name: /read 20 min/i }));
    await user.click(await screen.findByRole('button', { name: /info/i }));
    expect(onInfo).toHaveBeenCalledWith(task);
    await user.click(screen.getByRole('button', { name: /read 20 min/i }));
    await user.click(await screen.findByRole('button', { name: /delete/i }));
    expect(onDelete).toHaveBeenCalledWith(task);
  });
});
