import df from "danfojs-node";
import { sprintsCapacity } from "./SprintCapacity.js";
import { objectiveFunction } from "./ObjectiveFunction.js";

var capacitySptrints = 60; //in hours

const checkClone = (solution) => {
  let sol = [];
  solution.forEach((id) => {
    if (!sol.includes(id)) {
      sol.push(id);
    } else {
      sol.push(1 + Math.floor(Math.random() * 99));
    }
  });
  return sol;
};

const createSolution = (bd) => {
  let current = [];
  while (sprintsCapacity(current, bd) < capacitySptrints) {
    let id = 1 + parseInt(Math.floor(Math.random() * 99));
    current.push(id);
    current = checkClone(current);
  }
  console.log(`Current Solution: ${current}`);
  return current;
};

const extendsNeighborhood = (current) => {
  let neighbor1 = [...current];
  neighbor1[0] = neighbor1[0] + 1;
  neighbor1 = checkClone(neighbor1);

  let neighbor2 = [...current];
  neighbor2[1] = neighbor2[1] + 1;
  neighbor2 = checkClone(neighbor2);

  let neighbor3 = [...current];
  neighbor3[2] = neighbor3[2] + 1;
  neighbor3 = checkClone(neighbor3);

  let neighbor4 = [...current];
  neighbor4[3] = neighbor4[3] + 1;
  neighbor4 = checkClone(neighbor4);

  let neighborhood = [neighbor1, neighbor2, neighbor3, neighbor4];

  return neighborhood;
};

const hcProcess = async (iterations) => {
  const bd = await df.read_csv("database/base.csv");
  let c = 0;
  var current = createSolution(bd);
  var fitCurrent;
  var fitNeighbor;

  while (c < iterations) {
    const neighborhood = extendsNeighborhood(current);

    neighborhood.forEach((sol) => {
      fitCurrent = objectiveFunction(current, capacitySptrints, bd);
      fitNeighbor = objectiveFunction(sol, capacitySptrints, bd);

      console.log(
        `Neighbor: [${sol}], Fit: ${fitNeighbor}, Estimate/h: ${sprintsCapacity(
          sol,
          bd
        )}`
      );

      if (fitNeighbor <= fitCurrent) {
        current = sol;
      } else current;
    });
    c = c + 1;

    console.log(
      `New Current: [${current}], Fit: ${fitCurrent}, Estimate/h: ${sprintsCapacity(
        current,
        bd
      )}`
    );
  }
};

hcProcess(10);
