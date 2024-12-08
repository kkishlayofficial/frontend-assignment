import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import "@testing-library/jest-dom";
import mockData from './mocks/mockData.json'
import App from './App';

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(mockData);
    },
  });
});

describe('renders App component', () => {
  test("renders loading state initially", () => {
      render(<App />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("renders projects after fetching data", async () => {
    await act(async () => {
      render(<App />);
    });
    await waitFor(() => expect(screen.getByText(/Highly-Rated Kick Starter Projects/i)).toBeInTheDocument());
    expect(screen.getByText(/50%/i)).toBeInTheDocument();
    expect(screen.getByText(/500/i)).toBeInTheDocument();
  });

  test("renders error message on fetch failure", async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        json: () => {
          return Promise.reject({
            message: 'Internal Server Error'
          });
        },
      });
    });
    await act(async () => {
      render(<App />);
    });
    await waitFor(() => expect(screen.getByText(/Internal Server Error/i)).toBeInTheDocument());
  });
})