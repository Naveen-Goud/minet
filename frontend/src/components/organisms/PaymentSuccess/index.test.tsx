import { render, screen } from '@testing-library/react';
import PaymentSuccess from '.';
import '@testing-library/jest-dom'

describe('PaymentSuccess component', () => {
    test('should render the correct content for purchase', () => {
        render(<PaymentSuccess totalAmount='1000'
            transactionType='Purchase'
            crypto='BTC' />);
        expect(screen.getByText('1000 BTC')).toBeInTheDocument();
        expect(screen.getByText(/buy crypto/i)).toBeInTheDocument();
        expect(screen.queryByText(/sell crypto/i)).toBeNull();
        expect(screen.getByText(/crypto wallet/i)).toBeInTheDocument();
    });

    test('should render the correct content for sell', () => {
        render(<PaymentSuccess totalAmount='1000'
            transactionType='Sell'
            crypto='BTC' />);
        expect(screen.getByText('1000 BTC')).toBeInTheDocument();
        expect(screen.getByText(/sell crypto/i)).toBeInTheDocument();
        expect(screen.queryByText(/buy crypto/i)).toBeNull();
        expect(screen.getByText(/Rupee coin/i)).toBeInTheDocument();
    });
});
