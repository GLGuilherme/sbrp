import df from "danfojs-node";
import { sprintsCapacity } from "./SprintCapacity.js";
import { objectiveFunction } from "./ObjectiveFunction.js";

var capacitySptrints = 60; //in hours

const checkClone = (solution) => {
  let sol = [];
  solution.forEach((id) => {
    if (!sol.includes(id) && id >= 1 && id <= 100) {
      sol.push(id);
    } else if (id < 1) {
      sol.push(1);
    } else if (id > 100) {
      sol.push(100);
    } else {
      sol.push(Math.floor(Math.random() * 100) + 1);
    }
  });
  return sol;
};

const createSolution = (bd) => {
  let current = [];
  while (sprintsCapacity(current, bd) < capacitySptrints) {
    let id = parseInt(Math.floor(Math.random() * 100) + 1);
    current.push(id);
  }
  current = checkClone(current);

  console.log(
    `Current Solution: [${current}], Fit: ${objectiveFunction(
      current,
      capacitySptrints,
      bd
    )}, Estimate/h: ${sprintsCapacity(current, bd)}`
  );

  return current;
};

const extendsNeighborhood = (current) => {
  const neighborhood = [];

  const translateOperation = {
    0: +1,
    1: -1,
    2: +2,
    3: -2,
  };

  for (let i = 0; i <= 3; i++) {
    let neighbor = [...current];
    const randomItem = Math.floor(Math.random() * (neighbor.length - 1));

    neighbor[randomItem] = neighbor[randomItem] + translateOperation[i];
    neighbor = checkClone(neighbor);
    neighborhood.push(neighbor);
  }

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

    console.log(
      "------------------------------------------------------------------------------------"
    );
    neighborhood.forEach((sol) => {
      fitCurrent = objectiveFunction(current, capacitySptrints, bd);
      fitNeighbor = objectiveFunction(sol, capacitySptrints, bd);

      console.log(
        `Neighbor: [${sol}], Fit: ${fitNeighbor}, Estimate/h: ${sprintsCapacity(
          sol,
          bd
        )}\n`
      );

      if (fitNeighbor <= fitCurrent) {
        current = sol;
      } else current;
    });
    console.log(
      "-------------------------------------------------------------------------------------"
    );
    c = c + 1;

    console.log(
      `New Current: [${current}], Fit: ${objectiveFunction(
        current,
        capacitySptrints,
        bd
      )}, Estimate/h: ${sprintsCapacity(current, bd)}\n`
    );
  }
};

hcProcess(10);
