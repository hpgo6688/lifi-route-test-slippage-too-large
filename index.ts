import fs from 'fs';
import path from 'path';
import axios from 'axios';
import ora from 'ora';

const routes_params = {
  "fromAmount": "800000000000000000",
  "fromAddress": "0x1f561Aed6734C7eAd5379D8f1642c1A21Cf02bb7",
  "toAddress": "0x1f561Aed6734C7eAd5379D8f1642c1A21Cf02bb7",
  "fromChainId": 10,
  "fromTokenAddress": "0x4200000000000000000000000000000000000042",
  "options": {
    "bridges": {
      "deny": [
        "stargateV2",
        "mayan",
        "mayanWH",
        "mayanMCTP",
        "stargateV2Bus"
      ]
    },
    "exchanges": {},
    "maxPriceImpact": 0.4,
    "slippage": 0.005
  },
  "toChainId": 42161,
  "toTokenAddress": "0xf97f4df75117a78c1a5a0dbb814af92458539fb4"
};

const domain = 'http://localhost:8090';
const time = new Date().getTime();

async function fetchRoutes(params, spinner) {
  try {
    const response = await axios.post(`${domain}/v1/advanced/routes`, params);
    await saveData(time.toString(), 'routes', response.data, spinner);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function fetchStepData(step, spinner) {
  try {
    const response = await axios.post(`${domain}/v1/advanced/stepTransaction`, step);
    return response.data;
  } catch (error) {
    spinner.fail(`Error fetching data for step ${step.id}`);
    console.log("error", error);
    throw error;
  }
}

async function fetchAllRouteStepTransaction(routes, spinner) {
  const allPromises = routes.map(async route => {
    const stepPromises = route.steps.map(async step => {
      const data = await fetchStepData(step, spinner);
      await saveData(path.join(time.toString(), route.id), step.id, data, spinner);
    });
    return Promise.all(stepPromises);
  });

  try {
    await Promise.all(allPromises);
    spinner.succeed('All data fetched and saved.');
  } catch (error) {
    console.log(error);
    spinner.fail('Error in fetching steps');
  }
}

async function saveData(dirName, fileName, data, spinner) {
  const dirPath = path.join(__dirname, `routes_` + dirName);
  const filePath = path.join(dirPath, `${fileName}.json`);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  spinner.succeed(`routes_` + dirName + `/${fileName}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

async function main() {
  const spinner = ora('Fetching route data...').start();
  const res = await fetchRoutes(routes_params, spinner);
  await fetchAllRouteStepTransaction(res.routes, spinner);
}

main();
