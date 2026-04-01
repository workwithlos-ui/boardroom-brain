import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { systemPrompt } from "@/lib/store";

function getClient() {
  const config: { apiKey: string; baseURL?: string } = {
    apiKey: process.env.OPENAI_API_KEY || "dummy-key-for-build",
  };
  if (process.env.OPENAI_BASE_URL) {
    config.baseURL = process.env.OPENAI_BASE_URL;
  }
  return new OpenAI(config);
}

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { messages, context } = await req.json();

    // Build the system message with optional additional context
    let fullSystemPrompt = systemPrompt;
    if (context) {
      fullSystemPrompt += `\n\nAdditional Context Provided by User:\n${context}`;
    }

    const client = getClient();
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: fullSystemPrompt },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 2000,
      stream: true,
    });

    // Create a readable stream from the OpenAI response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to process chat request";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
