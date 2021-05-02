export const sprintsCapacity = (solution, bd) => {
  const data = [];
  const dataEstimate = [];

  for (let i = 0; i < solution.length; i++) {
    data.push(bd.iloc({ rows: [solution[i] - 1], columns: ["0:5"] }));
    dataEstimate.push(data[i].loc({ columns: ["Estimativa"] }));
  }

  let estimate = 0;

  dataEstimate.map((item) => {
    if (parseInt(item.data) !== null) {
      estimate += parseInt(item.data);
    }
  });

  return estimate;
};
