import AppError from "@shared/errors/AppError";

export default function generateStringFromArray(arr: any) {
  let result = "";
  const currentYear = new Date().getFullYear().toString();

  arr.forEach((obj: any) => {
    const { type, value } = obj;

    if (type === "factory" || type === "pcba") {
      result += value;
    } else if (type === "sequential") {
      result += value;
    } else if (type === "year") {
      if (typeof value !== "number" || value < 1 || value > 2) {
        throw new AppError("O valor 'value' para o tipo 'year' deve ser 1 ou 2.", 400);
      }

      if (value === 1) {
        result += currentYear.charAt(currentYear.length - 1);
      } else if (value === 2) {
        result += currentYear.slice(-2);
      }
    } else if (type === "month") {
      if (value === "string") {
        const monthCodes: any = {
          1: "1",
          2: "2",
          3: "3",
          4: "4",
          5: "5",
          6: "6",
          7: "7",
          8: "8",
          9: "9",
          10: "A",
          11: "B",
          12: "C"
        };

        const currentMonth = new Date().getMonth() + 1;
        const monthCode = monthCodes[currentMonth];

        if (!monthCode) {
          throw new AppError("Valor inválido para o mês atual.", 400);
        }

        result += monthCode;
      } else if (value === "number") {
        const currentMonth = new Date().getMonth() + 1;

        const monthString = currentMonth.toString().padStart(2, "0");
        result += monthString;
      } else {
        throw new AppError("O valor 'value' para o tipo 'month' deve ser 'string' ou 'number'.", 400);
      }
    } else if (type === "day") {
      if (value === "string") {
        const dayCodes: any = {
          1: "1",
          2: "2",
          3: "3",
          4: "4",
          5: "5",
          6: "6",
          7: "7",
          8: "8",
          9: "9",
          10: "A",
          11: "B",
          12: "C",
          13: "D",
          14: "E",
          15: "F",
          16: "G",
          17: "H",
          18: "I",
          19: "J",
          20: "K",
          21: "L",
          22: "M",
          23: "N",
          24: "O",
          25: "P",
          26: "Q",
          27: "R",
          28: "S",
          29: "T",
          30: "U",
          31: "V",
        };

        const currentDay = new Date().getDate();
        const dayCode = dayCodes[currentDay];

        if (!dayCode) {
          throw new AppError("Valor inválido para o dia atual.", 400);
        }

        result += dayCode;
      } else if (value === "number") {
        const currentDay = new Date().getDate();

        const dayString = currentDay.toString().padStart(2, "0");
        result += dayString;
      } else {
        throw new AppError("O valor 'value' para o tipo 'day' deve ser 'string' ou 'number'.", 400);
      }
    } else if (type === "hour") {
      if (value === "number") {
        const currentHour = new Date().getHours().toString().padStart(2, "0");
        result += currentHour;
      } else {
        throw new AppError("O valor 'value' para o tipo 'hour' deve ser 'number'.", 400);
      }
    } else if (type === "shift") {
      result += value
    } else {
      throw new AppError(`Tipo desconhecido: ${type}`, 400);
    }
  });

  return result;
}
