import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const opportunitySchema = z.object({
  name: z.string().min(8).max(120), hook: z.string().min(15).max(240),
  audience_problem: z.string().min(20).max(500), product_concept: z.string().min(30).max(700),
  ideal_buyer: z.string().min(15).max(400), recommended_format: z.string().min(5).max(200),
  why_it_fits: z.string().min(20).max(600), suggested_price: z.string().min(2).max(50),
  opportunity_score: z.number().int().min(1).max(100)
});
const analysisSchema = z.object({
  creator_summary: z.object({ main_topics: z.array(z.string()).min(1).max(8), audience_problems: z.array(z.string()).min(1).max(8), unique_angles: z.array(z.string()).min(1).max(8) }),
  opportunities: z.array(opportunitySchema).length(3)
});

const systemPrompt = `You are an incisive digital product strategist for spiritual, wellness, mindfulness, self-development, and consciousness creators. Your work is grounded, commercially aware, and specific—not a generic brainstorming assistant.

Study the creator's source material closely. Identify recurring themes, audience struggles, emotional pain points, desired transformations, implicit or explicit frameworks, distinctive terminology, tensions, stories, practices, and patterns in the creator's worldview. Infer only what the content supports.

Return exactly three genuinely distinct, commercially plausible digital product opportunities. Prioritize, in order: (1) specificity, (2) a clear and urgent buyer problem, (3) a concrete transformation, (4) close fit with the creator's existing content and voice, (5) realistic digital delivery, (6) a credible $9–$99 price, (7) originality, and (8) ease of creation.

Each idea must name a sharply defined buyer and use case. Give it a memorable, benefit-led name and a bounded delivery mechanism or time frame when appropriate. The concept should explain what is inside and how it creates the transformation. The three ideas must address meaningfully different needs or delivery approaches. Opportunity scores must reflect source-material fit, buyer clarity, usefulness, differentiation, and feasibility; do not automatically score everything above 90.

Never suggest broad ideas like "an ebook about spirituality," "a meditation guide," or "a shadow work workbook." Avoid unsupported medical claims, guaranteed outcomes, manipulative urgency, and vague mystical language. Do not imitate the source verbatim. Output only JSON matching the required schema.`;

const jsonSchema = {
  name: "creator_product_analysis", strict: true,
  schema: { type: "object", additionalProperties: false, required: ["creator_summary", "opportunities"], properties: {
    creator_summary: { type: "object", additionalProperties: false, required: ["main_topics", "audience_problems", "unique_angles"], properties: {
      main_topics: { type: "array", minItems: 1, maxItems: 8, items: { type: "string" } }, audience_problems: { type: "array", minItems: 1, maxItems: 8, items: { type: "string" } }, unique_angles: { type: "array", minItems: 1, maxItems: 8, items: { type: "string" } }
    } },
    opportunities: { type: "array", minItems: 3, maxItems: 3, items: { type: "object", additionalProperties: false, required: ["name", "hook", "audience_problem", "product_concept", "ideal_buyer", "recommended_format", "why_it_fits", "suggested_price", "opportunity_score"], properties: {
      name: { type: "string" }, hook: { type: "string" }, audience_problem: { type: "string" }, product_concept: { type: "string" }, ideal_buyer: { type: "string" }, recommended_format: { type: "string" }, why_it_fits: { type: "string" }, suggested_price: { type: "string" }, opportunity_score: { type: "integer", minimum: 1, maximum: 100 }
    } } }
  } }
};

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const input = z.object({ content: z.string().trim().min(500).max(40000) }).safeParse(body);
    if (!input.success) return NextResponse.json({ error: "Please provide between 500 and 40,000 characters of content." }, { status: 400 });
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: "The analysis service is not configured yet." }, { status: 503 });

    const response = await fetch("https://api.openai.com/v1/chat/completions", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }, body: JSON.stringify({
      model: "gpt-4o-mini", temperature: 0.65,
      messages: [{ role: "system", content: systemPrompt }, { role: "user", content: `Analyze the creator content below. Ground every idea in this material.\n\n--- SOURCE MATERIAL ---\n${input.data.content}\n--- END SOURCE MATERIAL ---` }],
      response_format: { type: "json_schema", json_schema: jsonSchema }
    }) });
    if (!response.ok) { console.error("OpenAI request failed", response.status, await response.text()); return NextResponse.json({ error: "We couldn’t analyze your content right now. Please try again shortly." }, { status: 502 }); }
    const completion = await response.json() as { choices?: Array<{ message?: { content?: string; refusal?: string } }> };
    const raw = completion.choices?.[0]?.message?.content;
    if (!raw) return NextResponse.json({ error: "The analysis could not be completed. Please try again." }, { status: 502 });
    let parsed: unknown;
    try { parsed = JSON.parse(raw); } catch { return NextResponse.json({ error: "The analysis returned an unexpected format. Please try again." }, { status: 502 }); }
    const validated = analysisSchema.safeParse(parsed);
    if (!validated.success) { console.error("Invalid analysis shape", validated.error.flatten()); return NextResponse.json({ error: "The analysis was incomplete. Please try again." }, { status: 502 }); }
    return NextResponse.json(validated.data);
  } catch (error) {
    console.error("Analyze route error", error);
    return NextResponse.json({ error: "We couldn’t complete the analysis. Please check your connection and try again." }, { status: 500 });
  }
}
