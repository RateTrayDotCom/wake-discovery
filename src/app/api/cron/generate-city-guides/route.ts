import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

export async function GET() {
  console.log('--- STARTING WEEKLY CITY GUIDE GENERATION ---');
  
  try {
    const eventsRef = adminDb.collection('events');
    const snapshot = await eventsRef.get();
    const events = snapshot.docs.map(doc => doc.data());

    // Group by municipality
    const townGroups: Record<string, any[]> = {};
    events.forEach(event => {
      const town = event.municipality || 'Wake County';
      if (!townGroups[town]) townGroups[town] = [];
      townGroups[town].push(event);
    });

    const results = [];

    for (const [town, townEvents] of Object.entries(townGroups)) {
      console.log(`Generating guide for ${town}...`);
      
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `
          You are an elite local travel editor for "Wake Discovery". 
          Write a vibrant "Weekend Discovery Guide" for ${town}, NC for the upcoming Friday, Saturday, and Sunday.
          
          Use these events to inform the post:
          ${JSON.stringify(townEvents.map(e => ({ title: e.title, date: e.date, location: e.location })))}
          
          The post should:
          1. Have a catchy, premium headline.
          2. Group the events by day (Fri, Sat, Sun).
          3. Include a "Editor's Pick" for the top activity.
          4. Be written in a sophisticated, discovery-driven tone.
          5. Use Markdown formatting.
          
          Format the output as a JSON object:
          {
            "title": "...",
            "content": "...",
            "municipality": "${town}",
            "publishDate": "${new Date().toISOString()}"
          }
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const cleanJson = text.replace(/```json|```/g, '').trim();
        const guide = JSON.parse(cleanJson);

        const guideId = `guide-${town}-${new Date().toISOString().split('T')[0]}`.toLowerCase();
        await adminDb.collection('guides').doc(guideId).set(guide);
        results.push({ town, guideId });
      } catch (err) {
        console.error(`Error generating guide for ${town}:`, err);
      }
    }

    return NextResponse.json({
      message: 'Weekly Guides Generated',
      generatedCount: results.length,
      guides: results
    });

  } catch (error) {
    console.error('Overall Guide Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate guides' }, { status: 500 });
  }
}
