import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { WakeEvent } from '@/constants/mockData';

export async function POST(req: Request) {
  const { followedTowns } = await req.json();
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!followedTowns || followedTowns.length === 0) {
    return NextResponse.json({ summary: "Follow some towns to see your personalized Daily Pulse!" });
  }

  try {
    // Fetch recent events for followed towns
    const eventsSnapshot = await adminDb.collection('events')
      .where('municipality', 'in', followedTowns)
      .limit(10)
      .get();

    const events = eventsSnapshot.docs.map((doc: any) => doc.data() as WakeEvent);
    const contextString = events.map((e: WakeEvent) => `${e.municipality}: ${e.title} (${e.date})`).join(', ');

    if (!apiKey) {
       return NextResponse.json({ 
         summary: `Today in ${followedTowns.join(' & ')}, there are several events including ${events[0]?.title || 'local community gatherings'}. Stay tuned for your full AI digest!` 
       });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `As the lead discovery specialist for "The Wake County Activities Guide", provide a concise, 2-3 sentence personalized "Daily Discovery" digest for a user following these towns: ${followedTowns.join(', ')}.
    Use the following recent activity/event context to make it specific: ${contextString}.
    Make it sound encouraging, professional, and exciting. Focus on the "Local Discovery" vibe.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return NextResponse.json({ summary: response.text() });
  } catch (error) {
    console.error("Daily Pulse Error:", error);
    return NextResponse.json({ summary: "Your personalized summary is being prepared. Check back shortly!" }, { status: 500 });
  }
}
