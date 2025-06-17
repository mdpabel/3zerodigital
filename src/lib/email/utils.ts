import { EmailTemplate, Client, PersonalizedContent } from './types';

export function personalizeContent(
  template: EmailTemplate,
  client: Client,
  dynamicData: Record<string, string>,
): PersonalizedContent {
  let subject = template.subject;
  let content = template.content;
  let personalizationScore = 0;

  // First replace client data (comes from selected clients)
  const clientFields = {
    clientName: client.name,
    companyName: client.company,
    industry: client.industry,
    email: client.email,
  };

  Object.entries(clientFields).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    const subjectMatches = subject.match(regex)?.length || 0;
    const contentMatches = content.match(regex)?.length || 0;

    subject = subject.replace(regex, value);
    content = content.replace(regex, value);

    // Higher score for client personalization
    personalizationScore += (subjectMatches + contentMatches) * 3;
  });

  // Then replace dynamic data placeholders (comes from form input)
  Object.entries(dynamicData).forEach(([key, value]) => {
    if (value) {
      const regex = new RegExp(`{{${key}}}`, 'g');
      const subjectMatches = subject.match(regex)?.length || 0;
      const contentMatches = content.match(regex)?.length || 0;

      subject = subject.replace(regex, value);
      content = content.replace(regex, value);

      personalizationScore += (subjectMatches + contentMatches) * 2;
    }
  });

  // Advanced personalization based on industry
  if (client.industry && content.includes('{{industrySpecific}}')) {
    const industryMessages = {
      Technology: 'cutting-edge tech solutions',
      'E-commerce': 'conversion-optimized online stores',
      Consulting: 'professional service platforms',
      Healthcare: 'HIPAA-compliant digital solutions',
      Finance: 'security-first financial platforms',
      Manufacturing: 'industrial automation systems',
      Education: 'educational technology platforms',
      'Real Estate': 'property management solutions',
    };

    content = content.replace(
      /{{industrySpecific}}/g,
      industryMessages[client.industry as keyof typeof industryMessages] ||
        'tailored digital solutions',
    );
    personalizationScore += 5;
  }

  return { subject, content, personalizationScore };
}

// Calculate deliverability score
export function calculateDeliverabilityScore(
  content: string,
  subject: string,
): {
  score: number;
  issues: string[];
  recommendations: string[];
} {
  let score = 100;
  const issues: string[] = [];
  const recommendations: string[] = [];

  // Subject line analysis
  if (subject.length > 50) {
    score -= 10;
    issues.push('Subject line too long');
    recommendations.push('Keep subject under 50 characters');
  }

  // Spam word detection
  const spamWords = [
    'free',
    'guarantee',
    'act now',
    'limited time',
    'urgent',
    'exclusive',
  ];
  const spamWordCount = spamWords.filter(
    (word) =>
      subject.toLowerCase().includes(word) ||
      content.toLowerCase().includes(word),
  ).length;

  if (spamWordCount > 2) {
    score -= spamWordCount * 10;
    issues.push(`Contains ${spamWordCount} potential spam trigger words`);
    recommendations.push('Reduce spam trigger words');
  }

  // Personalization check
  const personalizationTokens = (content.match(/\{\{[^}]+\}\}/g) || []).length;
  if (personalizationTokens < 2) {
    score -= 15;
    issues.push('Low personalization');
    recommendations.push('Add more personalized fields');
  }

  // Unsubscribe link check
  if (!content.includes('unsubscribe') && !content.includes('opt-out')) {
    score -= 20;
    issues.push('Missing unsubscribe option');
    recommendations.push('Add unsubscribe link for compliance');
  }

  return {
    score: Math.max(0, score),
    issues,
    recommendations,
  };
}
