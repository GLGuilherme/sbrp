import { sprintsCapacity } from "./SprintCapacity.js";

export const objectiveFunction = (solution, capacitySptrints, bd) => {
  const solutionCapacity = sprintsCapacity(solution, bd);
  const data = [];
  const grauDep = [];

  solution.forEach((item, index) => {
    data.push(bd.iloc({ rows: [item - 1], columns: ["0:4"] }));
    grauDep.push(data[index].loc({ columns: ["Grau de dependencia"] }));
  });

  let gpd = 0;
  grauDep.forEach((item) => {
    if (parseInt(item.data) !== null) {
      gpd += parseInt(item.data);
    }
  });
  gpd = gpd / solution.length;

  let fitValue = 0;
  let total = 0;

  solution.forEach((item, index) => {
    fitValue += parseInt(data[index].loc({ columns: ["Prioridade"] }).data);
  });

  if (solutionCapacity === capacitySptrints) {
    total = fitValue - gpd + 0.1 * (fitValue - gpd);
  } else if (
    0.6 * capacitySptrints >= solutionCapacity &&
    solutionCapacity <= 0.9 * capacitySptrints
  ) {
    total = 0.9 * (fitValue - gpd);
  } else if (solutionCapacity <= 0.59 * capacitySptrints) {
    total = 0.8 * (fitValue - gpd);
  } else {
    total = fitValue - gpd;
  }

  return total;
};
