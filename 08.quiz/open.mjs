import chalk from 'chalk';
import open from 'open';

const urls = [{
    name: '📦 Quiz Admin Panel',
    url: 'http://localhost:3000',
}]

urls.forEach(url => {    
    setTimeout(async () => {
        console.log(`✨ Opening ${chalk.black.bgCyan(url.name)} at ${chalk.magenta(url.url)}`);
        await open(url.url);
    }, url.wait || 0);
});