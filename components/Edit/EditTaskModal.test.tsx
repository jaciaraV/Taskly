
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskActions from '@components/TaskActions/TaskActions';


describe('TaskActions', () => {
  const task = { _id: '1', title: 'Read 20 min', completed: false };

  test('open the menu and call onEdit', async () => {
    const user = userEvent.setup();
    const onEdit = jest.fn();
    const onInfo = jest.fn();
    const onDelete = jest.fn();

    render(<TaskActions task={task} onEdit={onEdit} onInfo={onInfo} onDelete={onDelete} />);
    const menuButton = screen.getByRole('button', { name: /read 20 min/i });
    await user.click(menuButton);
    const editBtn = await screen.findByRole('button', { name: /edit/i });
    await user.click(editBtn);
    expect(onEdit).toHaveBeenCalledWith(task);
    expect(onInfo).not.toHaveBeenCalled();
    expect(onDelete).not.toHaveBeenCalled();
  });

  test('open the menu and call onInfo', async () => {
    const user = userEvent.setup();
    const onEdit = jest.fn();
    const onInfo = jest.fn();
    const onDelete = jest.fn();

    render(<TaskActions task={task} onEdit={onEdit} onInfo={onInfo} onDelete={onDelete} />);

    const menuButton = screen.getByRole('button', { name: /read 20 min/i });
    await user.click(menuButton);

    const infoBtn = await screen.findByRole('button', { name: /info/i });
    await user.click(infoBtn);

    expect(onInfo).toHaveBeenCalledWith(task);
    expect(onEdit).not.toHaveBeenCalled();
    expect(onDelete).not.toHaveBeenCalled();
  });

  test('open the menu and call onDelete', async () => {
    const user = userEvent.setup();
    const onEdit = jest.fn();
    const onInfo = jest.fn();
    const onDelete = jest.fn();

    render(<TaskActions task={task} onEdit={onEdit} onInfo={onInfo} onDelete={onDelete} />);

    const menuButton = screen.getByRole('button', { name: /read 20 min/i });
    await user.click(menuButton);

    const delBtn = await screen.findByRole('button', { name: /delete/i });
    await user.click(delBtn);

    expect(onDelete).toHaveBeenCalledWith(task);
    expect(onEdit).not.toHaveBeenCalled();
    expect(onInfo).not.toHaveBeenCalled();
  });

  test('close the menu with ESC', async () => {
    const user = userEvent.setup();
    render(
      <TaskActions
        task={task}
        onEdit={jest.fn()}
        onInfo={jest.fn()}
        onDelete={jest.fn()}
      />
    );

    const menuButton = screen.getByRole('button', { name: /read 20 min/i });
    await user.click(menuButton);
    await screen.findByRole('button', { name: /edit/i });
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('button', { name: /edit/i })).toBeNull();
  });
});
