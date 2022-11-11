import arabic_codes from "./arabic.json";
import english_codes from "./english.json";

interface LangWords {
  arabic: [string, string, any];
  english: [string, string, any];
}
const words: LangWords = {
  arabic: ["ذكر", "أنثى", arabic_codes],
  english: ["Male", "Female", english_codes],
};

function isValid(national_id: string = "0"): boolean {
  let data = getIdentity(national_id);
  if (
    [
      data.type,
      data.century,
      data.birthDate?.day,
      data.birthDate?.year,
      data.birthDate?.month,
      data.governorate,
    ].some((v) => !v)
  )
    return false;
  if (data.age && data.age < 0) return false;
  if (
    data.birthDate &&
    data.birthDate.date &&
    Date.now() - +new Date(data.birthDate.date) < 0
  )
    return false;
  else return true;
}

function getIdentity(national: string, lang: "english" | "arabic" = "english") {
  const century: string | undefined =
    national.slice(0, 1) === "2"
      ? "20"
      : national.slice(0, 1) === "3"
      ? "21"
      : undefined;

  const year = Number(century) - 1 + national.slice(1, 3);
  const month: string = national.slice(3, 5);
  const governorate: string = words[lang][2][+national.slice(7, 9)];
  const day: string = national.slice(5, 7);
  const age = new Date().getFullYear() - Number(year);
  const type =
    +national.slice(9, 13) % 2 === 0 ? words[lang][1] : words[lang][0];
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

export { getIdentity, isValid };
