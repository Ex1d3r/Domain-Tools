#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs').promises;
const whois = require('whois');
const { promisify } = require('util');
const path = require('path');


const lookupWhois = promisify(whois.lookup);


const program = new Command();


function generateDomains(keyword, zones = null) {
  
  const defaultTlds = ['.com', '.net', '.org', '.io', '.co', '.app'];
  console.log(`Generating domain ideas for keyword: ${keyword}...`);
  
  
  const normalizedKeyword = keyword.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  
  const prefixes = [
    'my', 'the', 'best', 'top', 'pro', 'go', 'get', 'try', 'easy', 'smart', 'digital', 'online',
    'web', 'app', 'i', 'e', 'a', 'super', 'ultra', 'mega', 'cool', 'awesome', 'epic', 'great',
    'prime', 'elite', 'premium', 'royal', 'global', 'hyper', 'cyber', 'tech', 'net'
  ];
  
  const suffixes = [
    'hub', 'spot', 'zone', 'place', 'center', 'pro', 'now', 'app', 'site', 'web',
    'online', 'tech', 'space', 'world', 'net', 'hq', 'central', 'club', 'team',
    'network', 'systems', 'solutions', 'services', 'tools', 'expert', 'master', 'guru'
  ];
  
  const numbers = ['1', '2', '3', '4', '5', '7', '8', '9', '10', '24', '365', '247'];
  
  
  const domainIdeas = [];
  
  
  domainIdeas.push(normalizedKeyword);
  
  
  prefixes.forEach(prefix => {
    domainIdeas.push(`${prefix}${normalizedKeyword}`);
  });
  
  
  suffixes.forEach(suffix => {
    domainIdeas.push(`${normalizedKeyword}${suffix}`);
  });
  
  
  for (let i = 0; i < 20; i++) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    domainIdeas.push(`${prefix}${normalizedKeyword}${suffix}`);
  }
  
  
  numbers.forEach(number => {
    domainIdeas.push(`${normalizedKeyword}${number}`);
  });
  
  
  numbers.slice(0, 5).forEach(number => {
    domainIdeas.push(`${number}${normalizedKeyword}`);
  });
  
  
  const filteredDomains = [...new Set(domainIdeas)]
    .filter(domain => domain.length > 0 && domain.length < 63);
  
  console.log(`Generated ${filteredDomains.length} base domain ideas`);  
  
  
  let tlds = defaultTlds;
  
  
  if (zones && zones.length > 0) {
    tlds = zones.map(zone => zone.startsWith('.') ? zone : '.' + zone);
    console.log(`Using user-specified TLDs: ${tlds.join(', ')}`);
  } else {
    console.log(`Using default TLDs: ${tlds.join(', ')}`);
  }
  
  const fullDomains = [];
  
  for (const domain of filteredDomains) {
    for (const tld of tlds) {
      fullDomains.push(domain + tld);
    }
  }
  
  console.log(`Generated ${fullDomains.length} domains with TLDs`);
  
  
  const fsSync = require('fs');
  const outputFile = `${keyword}_domains.txt`;
  const content = fullDomains.join('\n');
  
  try {
    const absolutePath = path.resolve(process.cwd(), outputFile);
    console.log(`Saving to ${absolutePath}`);
    fsSync.writeFileSync(absolutePath, content);
    console.log(`Successfully saved ${fullDomains.length} domains to ${absolutePath}`);
    return outputFile;
  } catch (error) {
    console.error(`Failed to save file: ${error.message}`);
    throw error;
  }
}


async function checkDomainAvailability(domainsFile) {
  try {
    console.log(`Checking domain availability from file: ${domainsFile}...`);
    
    
    const fileContent = await fs.readFile(domainsFile, 'utf8');
    const domains = fileContent.split('\n').filter(domain => domain.trim() !== '');
    
    console.log(`Found ${domains.length} domains to check.`);
    
    const availableDomains = [];
    const registeredDomains = [];
    
    
    const batchSize = 5;
    const totalBatches = Math.ceil(domains.length / batchSize);
    
    for (let i = 0; i < totalBatches; i++) {
      const startIdx = i * batchSize;
      const endIdx = Math.min(startIdx + batchSize, domains.length);
      const batch = domains.slice(startIdx, endIdx);
      
      console.log(`Checking batch ${i + 1}/${totalBatches} (${batch.length} domains)...`);
      
      const batchPromises = batch.map(async (domain) => {
        try {
          console.log(`Checking: ${domain}`);
          const data = await lookupWhois(domain);
          

          const availabilityPhrases = [
            'no match', 
            'not found', 
            'no data found', 
            'no entries found',
            'domain not found',
            'domain available',
            'no object found',
            'not registered',
            'status: free',
            'status: available'
          ];
          
          const isAvailable = availabilityPhrases.some(phrase => 
            data.toLowerCase().includes(phrase.toLowerCase())
          );
          
          if (isAvailable) {
            availableDomains.push(domain);
            console.log(`✓ Available: ${domain}`);
          } else {
            registeredDomains.push(domain);
            console.log(`✗ Registered: ${domain}`);
          }
        } catch (error) {
          console.error(`Error checking domain ${domain}:`, error.message);

          registeredDomains.push(domain);
        }
      });
      
      await Promise.all(batchPromises);
      

      if (i < totalBatches - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    
    await fs.writeFile('available_domains.txt', availableDomains.join('\n'));
    await fs.writeFile('registered_domains.txt', registeredDomains.join('\n'));
    
    console.log('\nDomain availability check completed!');
    console.log(`Available domains: ${availableDomains.length} (saved to available_domains.txt)`);
    console.log(`Registered domains: ${registeredDomains.length} (saved to registered_domains.txt)`);
  } catch (error) {
    console.error('Error checking domain availability:', error);
    process.exit(1);
  }
}


program
  .name('domainTool')
  .description('A tool for generating and checking domain name availability')
  .version('1.0.0');

program
  .command('generate')
  .description('Generate domain ideas with various patterns')
  .argument('<keyword>', 'Keyword to generate domain ideas for')
  .argument('[zones]', 'Optional comma-separated list of TLD zones (e.g. com,net,org,cz)')
  .action((keyword, zones) => {
    try {

      const zoneArray = zones ? zones.split(',') : null;
      
      const outputFile = generateDomains(keyword, zoneArray);
      console.log(`\nGenerated domains saved to: ${outputFile}`);
      console.log(`To check availability of these domains, run:`);
      console.log(`node domainTool.js check-available ${outputFile}`);
    } catch (error) {
      console.error(`Error generating domains: ${error.message}`);
    }
  });

program
  .command('check-available')
  .description('Check availability of domains from a file')
  .argument('<file>', 'File containing domains to check')
  .action(async (file) => {
    await checkDomainAvailability(file);
  });


program.parse(process.argv);


if (!process.argv.slice(2).length) {
  program.outputHelp();
}
