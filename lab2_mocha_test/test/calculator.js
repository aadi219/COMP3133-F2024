import calculator from '../app/calculator.js';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('Addition', () => {
    it('[SUCCESS] should return 7 for 5 + 2', () => { 
        const result = calculator.add(5, 2);
        expect(result).to.equal(7);
    });

    it('[FAIL] should return 8 for 5 + 2', () => {
        const result = calculator.add(5, 2);
        expect(result).to.equal(8);
    });
});

describe('Subtraction', () => {
    it('[SUCCESS] should return 3 for 5 - 2', () => { 
        const result = calculator.sub(5, 2);
        expect(result).to.equal(3);
    });

    it('[FAIL] should return 5 for 5 - 2', () => {
        const result = calculator.sub(5, 2);
        expect(result).to.equal(5);
    });
});

describe('Multiplication', () => {
    it('[SUCCESS] should return 10 for 5 * 2', () => { 
        const result = calculator.mul(5, 2);
        expect(result).to.equal(10);
    });

    it('[FAIL] should return 12 for 5 * 2', () => {
        const result = calculator.mul(5, 2);
        expect(result).to.equal(12);
    });
});

describe('Division', () => {
    it('[SUCCESS] should return 5 for 10 / 2', () => { 
        const result = calculator.div(10, 2);
        expect(result).to.equal(5);
    });

    it('[FAIL] should return 2 for 10 * 2', () => {
        const result = calculator.div(10, 2);
        expect(result).to.equal(2);
    });
});
