'use server';

/**
 * @fileOverview A personalized lung recovery statistics AI agent.
 * 
 * - getPersonalizedLungRecoveryStats - A function that handles the lung recovery statistics process.
 * - PersonalizedLungRecoveryStatsInput - The input type for the getPersonalizedLungRecoveryStats function.
 * - PersonalizedLungRecoveryStatsOutput - The return type for the getPersonalizedLungRecoveryStats function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedLungRecoveryStatsInputSchema = z.object({
  daysSinceQuitting: z
    .number()
    .describe('The number of days since the user quit smoking.'),
  cigarettesPerDayBeforeQuitting: z
    .number()
    .describe('The number of cigarettes the user smoked per day before quitting.'),
  yearsSmoking: z
    .number()
    .describe('The number of years the user smoked.'),
});
export type PersonalizedLungRecoveryStatsInput = z.infer<typeof PersonalizedLungRecoveryStatsInputSchema>;

const PersonalizedLungRecoveryStatsOutputSchema = z.object({
  lungRecoveryStats: z.string().describe('Personalized statistics about lung recovery, breathing improvements, and sleep improvements since quitting smoking.'),
});
export type PersonalizedLungRecoveryStatsOutput = z.infer<typeof PersonalizedLungRecoveryStatsOutputSchema>;

const personalizedLungRecoveryStatsFlow = ai.defineFlow(
  {
    name: 'personalizedLungRecoveryStatsFlow',
    inputSchema: PersonalizedLungRecoveryStatsInputSchema,
    outputSchema: PersonalizedLungRecoveryStatsOutputSchema,
  },
  async input => {
    const prompt = ai.definePrompt({
      name: 'personalizedLungRecoveryStatsPrompt',
      input: {schema: PersonalizedLungRecoveryStatsInputSchema},
      output: {schema: PersonalizedLungRecoveryStatsOutputSchema},
      prompt: `You are a health expert providing personalized statistics about lung recovery, breathing improvements, and sleep improvements since quitting smoking.
    
      Based on the number of days since the user quit smoking, the number of cigarettes smoked per day before quitting, and the number of years the user smoked, provide encouraging and helpful personalized statistics about the user's lung recovery.
    
      Days since quitting: {{{daysSinceQuitting}}}
      Cigarettes per day before quitting: {{{cigarettesPerDayBeforeQuitting}}}
      Years smoking: {{{yearsSmoking}}}
    
      Focus on positive improvements and milestones in lung health, breathing, and sleep quality. Make the user feel proud of their achievements and motivate them to continue their smoke-free journey.
      `,
    });
    
    const {output} = await prompt(input);
    return output!;
  }
);

export async function getPersonalizedLungRecoveryStats(input: PersonalizedLungRecoveryStatsInput): Promise<PersonalizedLungRecoveryStatsOutput> {
  return personalizedLungRecoveryStatsFlow(input);
}