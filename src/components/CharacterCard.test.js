// CharacterCard.test.js
import React from 'react';
import { render } from '@testing-library/react';
import CharacterCard from './CharacterCard';

describe('CharacterCard Component', () => {
  const mockDetails = {
    image: 'mock-image-url',
    name: 'John Doe',
    status: 'Alive',
    species: 'Human',
    location: { url: 'location-url', name: 'Earth' },
    origin: { url: 'origin-url', name: 'Unknown' },
  };

  test('renders CharacterCard correctly', () => {
    const { getByText } = render(<CharacterCard details={mockDetails} />);
    
    // Add more assertions based on your component's structure
    expect(getByText(/John Doe/i)).toBeInTheDocument();
    expect(getByText(/Alive - Human/i)).toBeInTheDocument();
    // ... add more assertions
  });
});
