#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import ini from 'ini';
import { program } from 'commander';
import { get, set, unset } from 'lodash-es';

const resolveFilePath = (value: string) => path.resolve(value);
const resolveFilePathOrThrow = (value: string) => {
  const filePath = resolveFilePath(value);
  if (!fs.existsSync(filePath)) {
    program.error(`File "${filePath}" does not exist!`, {
      code: 'ERR001',
      exitCode: 2,
    });
  }
  return filePath;
};

program.name('kvp-cli').description('CLI to edit key-value pair files').version('1.0.0').allowExcessArguments(false);

program
  .command('get')
  .description('returns a value for a key')
  .argument('<config-file>', 'path to configuration file to read', resolveFilePathOrThrow)
  .argument('<key>', 'key to read')
  .action((configFilePath, key) => {
    const config = ini.parse(fs.readFileSync(configFilePath, 'utf-8'));
    console.log(get(config, key) ?? '');
  });

program
  .command('set')
  .description('sets key-value pair')
  .argument('<config-file>', 'path to configuration file to edit', resolveFilePath)
  .argument('<key>', 'key to set')
  .argument('<value>', 'new value for a key')
  .option('-s, --no-sections', `won't add [section] headers for nested keys`)
  .action((configFilePath, key, value, options) => {
    console.log(options);
    const configExists = fs.existsSync(configFilePath);
    const config = configExists ? ini.parse(fs.readFileSync(configFilePath, 'utf-8')) : {};
    if (options.sections) {
      set(config, key, value);
    } else {
      config[key] = value;
    }
    const newConfigContent = ini.stringify(config);
    if (!configExists) {
      fs.mkdirSync(path.dirname(configFilePath));
    }
    fs.writeFileSync(configFilePath, newConfigContent);
  });

program
  .command('unset')
  .description('removes key from file')
  .argument('<config-file>', 'path to configuration file to edit', resolveFilePathOrThrow)
  .argument('<key>', 'key to unset')
  .action((configFilePath, key) => {
    const config = ini.parse(fs.readFileSync(configFilePath, 'utf-8'));
    unset(config, key);
    const newConfigContent = ini.stringify(config);
    fs.writeFileSync(configFilePath, newConfigContent);
  });

program.parse();
