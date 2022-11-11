"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arabic_json_1 = __importDefault(require("./arabic.json"));
const english_json_1 = __importDefault(require("./english.json"));
const words = {
    arabic: ["ذكر", "أنثى", arabic_json_1.default],
    english: ["Male", "Female", english_json_1.default],
};
console.log(getIdentity("20004201800961"));
function getIdentity(national, lang = "english") {
    const century = national.slice(0, 1) === "2"
        ? "20"
        : national.slice(0, 1) === "3"
            ? "21"
            : undefined;
    const year = Number(century) - 1 + national.slice(1, 3);
    const month = national.slice(3, 5);
    const governorate = words[lang][2][+national.slice(7, 9)];
    const day = national.slice(5, 7);
    const age = new Date().getFullYear() - Number(year);
    const type = +national.slice(9, 13) % 2 === 0 ? words[lang][1] : words[lang][0];
    if ([type, day, year, month, governorate, century].some((v) => !v))
        return {
            error: `Invalid national ID number: ${national}. Please enter the correct one`,
        };
    return {
        type,
        age,
        governorate,
        century,
        national_id: national,
        birthDate: {
            year,
            month,
            day,
            date: new Date(+year, +month, +day),
            text: `${year}/${month}/${day}`,
        },
    };
}
//# sourceMappingURL=index.js.map