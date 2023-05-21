import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import AuthLayout from './index';

describe('Auth layout', () => {
  it('renders children components', () => {
    render(
      <AuthLayout title="test auth layout">
        <h1>test auth layout</h1>
        <p>Some content</p>
      </AuthLayout>
    );

    expect(screen.getByText('test auth layout')).toBeInTheDocument();
    expect(screen.getByText('Some content')).toBeInTheDocument();
  });

  it('renders background image', () => {
    render(
      <AuthLayout title="test auth layout">
        <h1>test auth layout</h1>
      </AuthLayout>
    );

    const backgroundImage = screen.getByAltText('Auth Background');
    expect(backgroundImage).toBeInTheDocument();
    expect(backgroundImage.getAttribute('src')).toBe('/images/auth-bg.png');
  });
});
