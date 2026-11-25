import { describe, it, expect } from "vitest";
import { formatEUR } from "./format"

describe('formatEUR', () => {
    it('formate 123450 centimes en euros', ()=>{
        //arange
        const input = 123450
        // act
        const result = formatEUR(input)
        //assert
        expect(result.replace(/\s/g, ' ')).toBe('1 234,50 €')
    });
});