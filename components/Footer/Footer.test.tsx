import {render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '@components/Footer/Footer';

test('show count and trigger clearAllTask',async()=>{
    const user = userEvent.setup();
    const mockClear = jest.fn();
    render(<Footer totalTasks={3} clearAllTasks={mockClear}/>);
    expect(screen.getByText(/3/i)).toBeInTheDocument();
    expect(screen.getByText(/task\(s\) left/i)).toBeInTheDocument();
     await user.click(screen.getByRole('button',{name:/Clear All Tasks/i}));
expect(mockClear).toHaveBeenCalled();
});