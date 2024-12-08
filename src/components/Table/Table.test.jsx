import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import Table from './index';
import mockData from '../../mocks/mockData.json'


describe('Table Component', () => {
  test('renders table with data', () => {
    render(<Table kickStarterProjectsData={mockData} />);
    expect(screen.getByText('S. No')).toBeInTheDocument();
    expect(screen.getByText('Percentage funded')).toBeInTheDocument();
    expect(screen.getByText('Amount pledged')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('$500')).toBeInTheDocument();
  });

  test('pagination works correctly', () => {
    render(<Table kickStarterProjectsData={mockData} />);
    const nextButton = screen.getByText('Next >');
    const prevButton = screen.getByText('< Prev');

    expect(prevButton).toBeDisabled();
    fireEvent.click(nextButton);
    expect(prevButton).not.toBeDisabled();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('$1000')).toBeInTheDocument();
    fireEvent.click(prevButton);
    expect(prevButton).toBeDisabled();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('$500')).toBeInTheDocument();
  });

  test('next button is disabled on the last page', () => {
    render(<Table kickStarterProjectsData={mockData} />);
    const nextButton = screen.getByText('Next >');
    fireEvent.click(nextButton);
    expect(nextButton).toBeDisabled();
  });
});