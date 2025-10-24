'use server';
import { getPersonalizedLungRecoveryStats, type PersonalizedLungRecoveryStatsInput } from '@/ai/flows/personalized-lung-recovery-stats';

export async function fetchRecoveryStats(input: PersonalizedLungRecoveryStatsInput) {
  try {
    const result = await getPersonalizedLungRecoveryStats(input);
    return { success: true, data: result.lungRecoveryStats };
  } catch (error) {
    console.error('AI Flow Error:', error);
    return { success: false, error: 'An error occurred while fetching your recovery stats. Please try again later.' };
  }
}
