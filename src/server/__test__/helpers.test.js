const { generateid, dateFormatter } = require("../helpers.js")


const list = []


describe("Testing the helpers functionality", () => {
    test("Testing the generateid() function first id", () => {
        const firstid = generateid(list)
        expect(firstid).toEqual(1);
    });
    test("Testing the generateid() function next id", () => {
        list.push({ id: 23 })
        const nextid = generateid(list)
        expect(nextid).toEqual(24);
    });

    test("Testing the dateFormatter() function with input", () => {
        const day = 2;
        const year = 2029;
        const month = 4;
        const date = new Date();
        date.setDate(day);
        date.setFullYear(year);
        date.setMonth(month - 1)
        const datestring = dateFormatter(date)
        expect(datestring).toEqual(`${year}-0${month}-0${day}`);
    });
    test("Testing the dateFormatter() function empty input", () => {
        const now = new Date();
        let day = now.getDate();
        if (day < 10) {
            day = '0' + day
        }
        let month = now.getMonth() + 1;
        if (month < 10) {
            month = '0' + month
        }
        const year = now.getFullYear()
        const datestring = dateFormatter()
        expect(datestring).toEqual(`${year}-${month}-${day}`);
    });
});