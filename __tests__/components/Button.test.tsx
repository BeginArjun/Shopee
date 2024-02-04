// FILEPATH: /E:/ReactNative/Project/Frontend/__tests__/Button.test.tsx

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { CartBtn } from '../../components/Button';
import CartProvider  from '../../context/Cart'; // import your CartProvider
import fetchMock from 'jest-fetch-mock';
import {describe,it} from '@jest/globals';

fetchMock.enableMocks();

describe('CartBtn', () => {
    it('sends a request when clicked', async () => {
        const userId = 'testUser';
        const productId = 'testProduct';
        const cartId = 'testCart';

        // Mock the fetch calls
        fetch.mockResponseOnce(JSON.stringify({ success: true }));
        fetch.mockResponseOnce(JSON.stringify({ cart: [] }));

        const { getByText } = render(
            <CartProvider>
                <CartBtn userId={userId} productId={productId} cartId={cartId} />
            </CartProvider>
        );

        // Simulate a click on the button
        fireEvent.press(getByText('Add to Cart')); // replace 'Add to Cart' with the actual text on your button

        // Wait for the fetch calls to complete
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

        // Check the fetch calls
        expect(fetch).toHaveBeenNthCalledWith(1, `http://192.168.137.1:3000/api/cart/${userId}?product=${productId}`, expect.anything());
        expect(fetch).toHaveBeenNthCalledWith(2, `http://192.168.137.1:3000/api/cart/${cartId}`);
    });
});