const conversionCtrl = require('../conversionCtrl');

describe('conversionCtrl', () => {
    describe('convertToUSD', () => {
        it('should convert 1 EUR to USD correctly', () => {
            const result = conversionCtrl.convertToUSD(1);
            expect(result).toBe(1.18); // Replace with the expected conversion rate
        });

        it('should convert 10 EUR to USD correctly', () => {
            const result = conversionCtrl.convertToUSD(10);
            expect(result).toBe(11.8); // Replace with the expected conversion rate
        });

        // Add more test cases for different conversion scenarios
    });

    describe('convertToEUR', () => {
        it('should convert 1 USD to EUR correctly', () => {
            const result = conversionCtrl.convertToEUR(1);
            expect(result).toBe(0.85); // Replace with the expected conversion rate
        });

        it('should convert 10 USD to EUR correctly', () => {
            const result = conversionCtrl.convertToEUR(10);
            expect(result).toBe(8.5); // Replace with the expected conversion rate
        });

        // Add more test cases for different conversion scenarios
    });

    // Add more test cases for other functions in conversionCtrl.js
});
