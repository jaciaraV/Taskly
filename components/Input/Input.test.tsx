import {render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '@components/Input/Input';

describe('Input',()=>{
    test('render placeholder and call oneChange',async()=>{
        const user = userEvent.setup();
        const handleChange = jest.fn();
        
        render( <Input value=''
            onChange={handleChange}
            placeholder='Enter you new Task'></Input>
        );
     const input = screen.getByPlaceholderText(/Enter you new task/i);
     await user.type(input,'Hello');
     expect(handleChange).toHaveBeenCalled();
     expect(handleChange).toHaveBeenCalledTimes(5);
    });
});