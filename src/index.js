#!/usr/bin/env node

const chalk = require('chalk');
const { execSync } = require('child_process');

async function searchRepos(query) {
  const q = encodeURIComponent(query);
  const results = JSON.parse(execSync(`gh search repos "${q}" --owner yksanjo --limit 20 --json name,description,url,stargazerCount`, { encoding: 'utf8' }));
  return results;
}

async function main() {
  console.log(chalk.cyan('\n🔍 Repo Search Tool v1.0.0\n'));
  
  const repos = await searchRepos('topic:ai OR topic:agent OR topic:cli');
  
  repos.forEach(r => {
    console.log(`${chalk.cyan(r.name)} - ⭐ ${r.stargazerCount}`);
    console.log(`  ${r.description || 'No description'}\n`);
  });
  
  console.log(chalk.blue(`Found ${repos.length} repos`));
}

if (require.main === module) main().catch(console.error);
module.exports = { main };
