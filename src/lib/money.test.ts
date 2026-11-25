import { describe, it, expect } from "vitest";
import { parseAmountToCents } from "./money"

describe("parseAmountToCents", ()=> {
    it.each([
        { input: '19,99', expected: 1999 },
        { input: '19.99', expected: 1999 },
        { input: 'abc', expected: null },
        { input: '-5', expected: null },
    ])('convertit "$input" en $expected', ({ input, expected }) => {
        expect(parseAmountToCents(input)).toBe(expected)
    })

    it.todo("'1,005' doit retourner 100 ou 101 ? Voir avec PO")
});