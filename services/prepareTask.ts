const readline = require("readline");
const fs = require("fs");
const path = require("path");
const npmAddScript = require("npm-add-script");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getNamePatternError = (str: string) => {
  const isCamelCase = /^((^[a-z]|[A-Z0-9])[a-z]*)+$/g.test(str);

  if (!isCamelCase) {
    throw `Name: ${str} is not camel case`;
  }

  return null;
};

const getUpperSnakeCase = (str: string) => {
  const dashedStr = str.replace(/([a-z])([A-Z])/g, "$1_$2");

  return dashedStr.toUpperCase();
};

const prepare = (name: string) => {
  const pathToSrc = path.join(__dirname, "..", "src");

  const pathToNewDir = path.join(pathToSrc, name);

  if (fs.existsSync(pathToNewDir)) throw `Directory with name: ${name} exist`;

  const pathToNewFile = path.join(pathToNewDir, `${name}.ts`);

  const pathToIndexFile = path.join(pathToNewDir, `index.ts`);

  const pathToTestDir = path.join(pathToNewDir, `__test__`);

  const pathToFirstTestFile = path.join(pathToTestDir, `${name}.test.ts`);

  const testName = `@${getUpperSnakeCase(name)}`;

  fs.mkdirSync(pathToNewDir);

  fs.mkdirSync(pathToTestDir);

  fs.writeFile(
    pathToIndexFile,
    `export { ${name} } from "./${name}"`,
    (err: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log("The index file was saved!");
      }
    }
  );

  fs.writeFile(
    pathToNewFile,
    `export const ${name} = (value?: any): any => {
  return void 0;
};`,
    (err: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`The ${name}.ts file was saved!`);
      }
    }
  );

  fs.writeFile(
    pathToFirstTestFile,
    `import { ${name} } from "../${name}";

describe("${testName} test ${name}", () => {
  test("should return undefined", () => {
    const result = ${name}();

    expect(result).toEqual(undefined);
  });
});`,
    (err: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`The ${name}.ts file was saved!`);
      }
    }
  );

  npmAddScript({ key: `test:${name}`, value: `jest  -t '${testName}'` });
  npmAddScript({
    key: `test-watch:${name}`,
    value: `jest --watchAll  -t '${testName}'`
  });
};

rl.question("Enter name of the task: ", (name: string) => {
  rl.close();

  getNamePatternError(name);

  prepare(name);
});
