import df from "danfojs-node";

export const sprintsCapacity = async (solution) => {
  const bd = await df.read_csv("database/base.csv");

  const data = [];
  const dataEstimate = [];

  for (let i = 0; i < solution.length; i++) {
    data.push(bd.iloc({ rows: [solution[i] - 1], columns: ["0:5"] }));
    dataEstimate.push(data[i].loc({ columns: ["Estimativa"] }));
  }

  let estimate = 0;
  dataEstimate.forEach((e) => {
    if (parseInt(e.data) !== null) {
      estimate += parseInt(e.data);
    }
  });
  console.log(estimate);
  return estimate;
};
