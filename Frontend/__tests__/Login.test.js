import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../Screens/LoginScreen';

describe('<LoginScreen />', () => {
    it('renders correctly', () => {
        const tree = renderer.create(
            <LoginScreen navigation={{ navigate: jest.fn() }} setIsLoggedIn={jest.fn()} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('shows error message when fields are empty', async () => {
        const { getByText } = render(
            <LoginScreen navigation={{ navigate: jest.fn() }} setIsLoggedIn={jest.fn()} />
        );

        fireEvent.press(getByText('Login'));

        await waitFor(() => {
            expect(getByText('Please complete all fields.')).toBeTruthy();
        });
    });

    it('shows error message for invalid email', async () => {
        const { getByText, getByPlaceholderText } = render(
            <LoginScreen navigation={{ navigate: jest.fn() }} setIsLoggedIn={jest.fn()} />
        );

        fireEvent.changeText(getByPlaceholderText('Email'), 'invalid-email');
        fireEvent.changeText(getByPlaceholderText('Password'), 'password');
        fireEvent.press(getByText('Login'));

        await waitFor(() => {
            expect(getByText('Please enter a valid email address.')).toBeTruthy();
        });
    });
});
