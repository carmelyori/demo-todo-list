import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders To-Do List title', () => {
  render(<App />);
  const link Element = screen.getByText(/To-Do List/i);
  expect(link Element).toBeInTheDocument();
});

test('adds a new task', () => {
  render(<App />);
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'New Task' } });
  fireEvent.click(screen.getByText(/Add Task/i));
  expect(screen.getByText(/New Task/i)).toBeInTheDocument();
});

test('deletes a task', () => {
  render(<App />);
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'New Task' } });
  fireEvent.click(screen.getByText(/Add Task/i));
  fireEvent.click(screen.getByText(/Delete/i));
  expect(screen.queryByText(/New Task/i)).not.toBeInTheDocument();
});

test('toggles task completion', () => {
  render(<App />);
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'New Task' } });
  fireEvent.click(screen.getByText(/Add Task/i));
  fireEvent.click(screen.getByText(/New Task/i));
  fireEvent.click(screen.getByText(/New Task/i));
  expect(screen.getByText(/New Task/i)).toHaveStyle('text-decoration: line-through');
});
