const admin = require('firebase-admin');
const cheerio = require('cheerio');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

const { GoogleGenerativeAI } = require("@google/generative-ai");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

async function aiRefineDescription(event, apiKey) {
  if (!apiKey) {
    return `Discover this exciting ${event.municipality} event: ${event.title}. Join the local community at ${event.location} for a memorable experience that captures the pulse of our town.`;
  }
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `As a local editorial specialist for "The ${event.municipality} Pulse" news, rewrite a professional, engaging, and location-keyword driven description for the following event. 
    Focus on creating a "pulse" of the community feel. Keep it concise (2-3 sentences).
    
    TOWN: ${event.municipality}, NC
    EVENT: ${event.title}
    DATE: ${event.date}
    LOCATION: ${event.location}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return `Join us for ${event.title} in ${event.municipality}!`;
  }
}

const db = admin.firestore();
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

async function scrapeHollySprings() {
  const url = 'https://www.hollyspringsnc.gov/calendar.aspx?view=list';
  const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  const html = await response.text();
  const $ = cheerio.load(html);
  const events = [];
  $('.calendarItem, .list-item, li').each((_, el) => {
    const title = $(el).find('a[id^="eventTitle_"]').text().trim();
    const dateStr = $(el).find('.subHeader .date, .date').first().text().trim();
    const location = $(el).find('.subHeader .eventLocation, .eventLocation').first().text().trim() || 'Holly Springs, NC';
    if (title && dateStr && title !== 'Events') {
      events.push({ title, date: dateStr, location, municipality: 'Holly Springs' });
    }
  });
  return events;
}

async function run() {
  console.log('--- SEEDING FIRESTORE ---');
  const events = await scrapeHollySprings();
  console.log(`Scraped ${events.length} events from Holly Springs.`);

  let count = 0;
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  for (const event of events) {
    const eventId = `holly-springs-${event.title}-${event.date}`.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase().slice(0, 100);
    
    console.log(`Refining & Seeding: ${event.title}...`);
    const refinedDesc = await aiRefineDescription(event, apiKey);

    await db.collection('events').doc(eventId).set({
      ...event,
      description: refinedDesc,
      createdAt: new Date().toISOString(),
      id: eventId,
      imageURL: 'https://www.hollyspringsnc.gov/ImageRepository/Document?documentID=1',
    });
    count++;
    if (count >= 5) break; 
  }
  console.log(`Seeded ${count} events.`);
  process.exit(0);
}

run();
