import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './src/pages/login/index'; // Adjust the path as necessary

describe('Login Component', () => {
  it('renders the login form with all fields and button', () => {
    const { getByLabelText, getByText } = render(<Login />);
    
    expect(getByLabelText(/Email/i)).toBeInTheDocument();
    expect(getByLabelText(/Password/i)).toBeInTheDocument();
    expect(getByText(/Login/i)).toBeInTheDocument();
  });

  it('allows the user to enter their credentials and attempt to log in', async () => {
    const { getByLabelText, getByRole } = render(<Login />);
    const emailInput = getByLabelText(/Email/i);
    const passwordInput = getByLabelText(/Password/i);
    const loginButton = getByRole('button', { name: /Login/i });

    // Mock successful API call
    LoginUser.mockResolvedValue({ data: 'mockToken', message: 'Login successful' });

    // Simulate user typing
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    // Simulate form submit
    fireEvent.click(loginButton);

    // Wait for expected outcome
    await waitFor(() => {
      expect(LoginUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
      });
    });
  });
});
