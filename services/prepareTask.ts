const readline = require("readline");
const fs = require("fs");
const path = require("path");
const npmAddScript = require("npm-add-script");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getNamePatternError = (str: string): null | never => {
  const isCamelCase = /^((^[a-z]|[A-Z0-9])[a-z]*)+$/g.test(str);

  if (!isCamelCase) {
    throw `Name: ${str} is not camel case`;
  }

  return null;
};

const getUpperSnakeCase = (str: string): string => {
  const dashedStr = str.replace(/([a-z])([A-Z])/g, "$1_$2");

  return dashedStr.toUpperCase();
};

const prepare = (name: string) => {
  const pathToSrc: string = path.join(__dirname, "..", "src");

  const pathToNewDir: string = path.join(pathToSrc, name);

  if (fs.existsSync(pathToNewDir)) throw `Directory with name: ${name} exist`;

  const pathToNewFile: string = path.join(pathToNewDir, `${name}.ts`);

  const pathToIndexFile: string = path.join(pathToNewDir, `index.ts`);

  const pathToTestDir: string = path.join(pathToNewDir, `__test__`);

  const pathToFirstTestFile: string = path.join(
    pathToTestDir,
    `${name}.test.ts`
  );

  const testName: string = `@${getUpperSnakeCase(name)}`;

  fs.mkdirSync(pathToNewDir);

  fs.mkdirSync(pathToTestDir);

  fs.writeFile(
    pathToIndexFile,
    `export { ${name} } from "./${name}"`,
    (err: any) => {
      console.log(err ? err : "The index file was saved!");
    }
  );

  fs.writeFile(
    pathToNewFile,
    `export const ${name} = (value?: any): any => {
  return void 0;
};`,
    (err: any) => {
      console.log(err ? err : `The ${name}.ts file was saved!`);
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
      console.log(err ? err : `The ${name}.test.ts file was saved!`);
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
