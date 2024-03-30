/**
 * 
 */
import { getMonth } from "./index";

describe("Date helper", () => {
    describe("When getMonth is called", () => {
        const date = new Date(2022, 0, 1); // Janvier
        it("the function return janvier for 2022-01-01 as date", () => {
            expect(getMonth(date)).toBe('janvier');
        });
        it("the function return juillet for 2022-07-08 as date", () => {
            date.setMonth(6); // Juillet
            expect(getMonth(date)).toBe('juillet');
        });
    });
})

