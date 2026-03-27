const cheerio = require('cheerio');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

async function testScrape() {
  const url = 'https://www.hollyspringsnc.gov/calendar.aspx?view=list';
  console.log('Fetching', url);
  
  try {
    const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    const html = await response.text();
    const $ = cheerio.load(html);
    const events = [];

    $('.calendarItem, .list-item, li').each((_, el) => {
      const title = $(el).find('a[id^="eventTitle_"]').text().trim();
      const dateStr = $(el).find('.subHeader .date, .date').first().text().trim();
      const location = $(el).find('.subHeader .eventLocation, .eventLocation').first().text().trim() || 'Holly Springs, NC';

      if (title && dateStr && title !== 'Events') {
        events.push({ title, date: dateStr, location });
      }
    });

    console.log('Successfully parsed', events.length, 'events.');
    console.log('FIRST 5 EVENTS:');
    console.log(JSON.stringify(events.slice(0, 5), null, 2));
  } catch (error) {
    console.error('Test Scrape Error:', error);
  }
}

testScrape();
