import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../store';
import Navbar from '../Navbar';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill TextEncoder for Node.js environment
if (typeof global.TextEncoder === 'undefined') {
    globalThis.TextEncoder = TextEncoder as typeof globalThis.TextEncoder;
    globalThis.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;
}

describe('Navbar', () => {
  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/some text/)).toBeInTheDocument();
  });
});
