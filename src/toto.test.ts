import {describe, it, expect} from "vitest"

describe("test d'exemple", () =>{
    it("somme ok", ()=>{
        const input1 = 1;
        const input2 = 2;
        const expected = 3;

        const result = input1 + input2

        expect(result).toBe(expected)
    });
});
