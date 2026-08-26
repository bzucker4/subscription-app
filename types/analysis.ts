export type Opportunity = {
  name: string; hook: string; audience_problem: string; product_concept: string;
  ideal_buyer: string; recommended_format: string; why_it_fits: string;
  suggested_price: string; opportunity_score: number;
};
export type Analysis = {
  creator_summary: { main_topics: string[]; audience_problems: string[]; unique_angles: string[] };
  opportunities: Opportunity[];
};
