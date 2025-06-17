import { EmailTemplate } from './types';

export const serviceTemplates: EmailTemplate[] = [
  // WEB DEVELOPMENT TEMPLATES
  {
    id: 'web-dev-intro',
    name: 'Web Development - Introduction',
    service: 'web-dev',
    subject:
      "Transform {{companyName}}'s Digital Presence - 0 Downtime Guaranteed",
    content: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f0f9ff 0%, #f3e8ff 100%); padding: 40px 20px;">
        <div style="background: white; border-radius: 16px; padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
          <h1 style="color: #1e40af; font-size: 28px; margin-bottom: 24px;">Hi {{clientName}} 👋</h1>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            I noticed {{companyName}} has incredible potential, but {{specificIssue}} might be holding you back from reaching your growth goals.
          </p>
          
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); border-radius: 12px; padding: 24px; margin: 24px 0;">
            <h2 style="color: white; font-size: 20px; margin-bottom: 16px;">🚀 3ZeroDigital Guarantee:</h2>
            <ul style="color: white; font-size: 16px; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li><strong>🔒 0 Vulnerability</strong> - Enterprise-grade security</li>
              <li><strong>⚡ 0 Downtime</strong> - 99.99% uptime guarantee</li>
              <li><strong>✅ 0 Error</strong> - Flawless user experience</li>
            </ul>
          </div>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            We've helped {{industry}} companies increase their {{kpiMetric}} by {{improvementPercent}}% in just {{timeframe}}.
          </p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="{{calendarLink}}" style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
              Schedule Free Strategy Call 📅
            </a>
          </div>
          
          <p style="color: #64748b; font-size: 14px; text-align: center;">
            Best regards,<br>
            {{senderName}}<br>
            <strong>3ZeroDigital</strong> | Where Excellence Meets Innovation
          </p>
        </div>
      </div>
    `,
    dynamicFields: [
      {
        key: 'specificIssue',
        label: 'Specific Issue/Pain Point',
        type: 'text',
        required: true,
      },
      {
        key: 'kpiMetric',
        label: 'KPI Metric (conversion, traffic, etc.)',
        type: 'text',
        required: true,
      },
      {
        key: 'improvementPercent',
        label: 'Improvement Percentage',
        type: 'number',
        required: true,
      },
      { key: 'timeframe', label: 'Timeframe', type: 'text', required: true },
      {
        key: 'calendarLink',
        label: 'Calendar Booking Link',
        type: 'text',
        required: true,
      },
      { key: 'senderName', label: 'Sender Name', type: 'text', required: true },
    ],
  },

  {
    id: 'web-dev-followup',
    name: 'Web Development - Follow Up',
    service: 'web-dev',
    subject:
      "Quick follow-up: {{companyName}}'s website optimization opportunity",
    content: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f0f9ff 0%, #f3e8ff 100%); padding: 40px 20px;">
        <div style="background: white; border-radius: 16px; padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
          <h1 style="color: #1e40af; font-size: 24px; margin-bottom: 24px;">Hi {{clientName}},</h1>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            I hope this email finds you well. I reached out {{daysAgo}} days ago about {{companyName}}'s website optimization opportunity.
          </p>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            I understand you're busy, so I'll keep this brief. Here's what caught my attention about your current setup:
          </p>
          
          <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 20px; margin: 24px 0;">
            <ul style="color: #7f1d1d; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
              <li>{{issue1}}</li>
              <li>{{issue2}}</li>
              <li>{{issue3}}</li>
            </ul>
          </div>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            <strong>Quick question:</strong> {{questionForClient}}
          </p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="{{calendarLink}}" style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; margin-right: 16px;">
              Book 15-Min Call
            </a>
            <a href="{{unsubscribeLink}}" style="color: #64748b; text-decoration: none; font-size: 14px;">
              Not interested? Click here
            </a>
          </div>
          
          <p style="color: #64748b; font-size: 14px; text-align: center;">
            {{senderName}}<br>
            <strong>3ZeroDigital</strong>
          </p>
        </div>
      </div>
    `,
    dynamicFields: [
      {
        key: 'daysAgo',
        label: 'Days Since Last Contact',
        type: 'number',
        required: true,
      },
      {
        key: 'issue1',
        label: 'Technical Issue #1',
        type: 'text',
        required: true,
      },
      {
        key: 'issue2',
        label: 'Technical Issue #2',
        type: 'text',
        required: true,
      },
      {
        key: 'issue3',
        label: 'Technical Issue #3',
        type: 'text',
        required: false,
      },
      {
        key: 'questionForClient',
        label: 'Specific Question for Client',
        type: 'text',
        required: true,
      },
      {
        key: 'calendarLink',
        label: 'Calendar Link',
        type: 'text',
        required: true,
      },
      {
        key: 'unsubscribeLink',
        label: 'Unsubscribe Link',
        type: 'text',
        required: true,
      },
      { key: 'senderName', label: 'Sender Name', type: 'text', required: true },
    ],
  },

  {
    id: 'web-dev-redesign',
    name: 'Web Development - Redesign Proposal',
    service: 'web-dev',
    subject:
      '{{companyName}} Website Redesign: +{{conversionIncrease}}% Conversion Guaranteed',
    content: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f0f9ff 0%, #f3e8ff 100%); padding: 40px 20px;">
        <div style="background: white; border-radius: 16px; padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
          <h1 style="color: #1e40af; font-size: 28px; margin-bottom: 24px;">Website Redesign Proposal for {{companyName}}</h1>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Hi {{clientName}},
          </p>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            After analyzing {{companyName}}'s current website, I've identified {{numberOfIssues}} critical areas that are costing you {{estimatedLoss}} in potential revenue monthly.
          </p>
          
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; padding: 24px; margin: 24px 0;">
            <h2 style="color: white; font-size: 20px; margin-bottom: 16px;">🎯 Redesign Benefits:</h2>
            <ul style="color: white; font-size: 16px; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li><strong>+{{conversionIncrease}}% Conversion Rate</strong></li>
              <li><strong>{{pagespeedIncrease}}% Faster Loading</strong></li>
              <li><strong>Mobile-First Design</strong></li>
              <li><strong>SEO Optimized</strong></li>
            </ul>
          </div>
          
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <h3 style="color: #059669; font-size: 18px; margin-bottom: 12px;">📋 What's Included:</h3>
            <ul style="color: #065f46; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
              <li>{{deliverable1}}</li>
              <li>{{deliverable2}}</li>
              <li>{{deliverable3}}</li>
              <li>{{deliverable4}}</li>
            </ul>
          </div>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            <strong>Timeline:</strong> {{projectTimeline}}<br>
            <strong>Investment:</strong> Starting at {{startingPrice}}
          </p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="{{proposalLink}}" style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; margin-right: 16px;">
              View Full Proposal
            </a>
            <a href="{{calendarLink}}" style="background: transparent; color: #3b82f6; padding: 16px 32px; border: 2px solid #3b82f6; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
              Schedule Discussion
            </a>
          </div>
          
          <p style="color: #64748b; font-size: 14px; text-align: center;">
            {{senderName}}<br>
            <strong>3ZeroDigital</strong> | Transforming Digital Experiences
          </p>
        </div>
      </div>
    `,
    dynamicFields: [
      {
        key: 'numberOfIssues',
        label: 'Number of Issues Found',
        type: 'number',
        required: true,
      },
      {
        key: 'estimatedLoss',
        label: 'Estimated Monthly Loss ($)',
        type: 'text',
        required: true,
      },
      {
        key: 'conversionIncrease',
        label: 'Conversion Increase (%)',
        type: 'number',
        required: true,
      },
      {
        key: 'pagespeedIncrease',
        label: 'Page Speed Increase (%)',
        type: 'number',
        required: true,
      },
      {
        key: 'deliverable1',
        label: 'Key Deliverable #1',
        type: 'text',
        required: true,
      },
      {
        key: 'deliverable2',
        label: 'Key Deliverable #2',
        type: 'text',
        required: true,
      },
      {
        key: 'deliverable3',
        label: 'Key Deliverable #3',
        type: 'text',
        required: true,
      },
      {
        key: 'deliverable4',
        label: 'Key Deliverable #4',
        type: 'text',
        required: false,
      },
      {
        key: 'projectTimeline',
        label: 'Project Timeline',
        type: 'text',
        required: true,
      },
      {
        key: 'startingPrice',
        label: 'Starting Price',
        type: 'text',
        required: true,
      },
      {
        key: 'proposalLink',
        label: 'Full Proposal Link',
        type: 'text',
        required: true,
      },
      {
        key: 'calendarLink',
        label: 'Calendar Link',
        type: 'text',
        required: true,
      },
      { key: 'senderName', label: 'Sender Name', type: 'text', required: true },
    ],
  },

  // MAINTENANCE TEMPLATES
  {
    id: 'maintenance-urgent',
    name: 'Maintenance - Urgent Alert',
    service: 'maintenance',
    subject: '🚨 {{companyName}}: Critical Website Issues Detected',
    content: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #fef2f2 0%, #fff7ed 100%); padding: 40px 20px;">
        <div style="background: white; border-radius: 16px; padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); border-left: 4px solid #ef4444;">
          <h1 style="color: #dc2626; font-size: 28px; margin-bottom: 24px;">⚠️ Urgent: {{companyName}} Website Alert</h1>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Hi {{clientName}},
          </p>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Our monitoring detected {{issueType}} on your website that could be costing you {{potentialLoss}} in lost revenue daily.
          </p>
          
          <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <h3 style="color: #dc2626; font-size: 18px; margin-bottom: 12px;">🔴 Critical Issues:</h3>
            <ul style="color: #7f1d1d; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
              <li>{{issue1}}</li>
              <li>{{issue2}}</li>
              <li>{{issue3}}</li>
            </ul>
          </div>
          
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; padding: 24px; margin: 24px 0;">
            <h2 style="color: white; font-size: 20px; margin-bottom: 16px;">🛡️ Emergency Response:</h2>
            <ul style="color: white; font-size: 16px; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li><strong>Immediate Fix:</strong> {{immediateAction}}</li>
              <li><strong>Prevention:</strong> {{preventionMeasure}}</li>
              <li><strong>Monitoring:</strong> 24/7 automated alerts</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="{{emergencyLink}}" style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; margin-right: 16px;">
              🚨 Emergency Fix Now
            </a>
            <a href="{{calendarLink}}" style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
              📞 Schedule Call
            </a>
          </div>
          
          <p style="color: #64748b; font-size: 14px; text-align: center;">
            Available 24/7,<br>
            {{senderName}}<br>
            <strong>3ZeroDigital Emergency Team</strong>
          </p>
        </div>
      </div>
    `,
    dynamicFields: [
      {
        key: 'issueType',
        label: 'Type of Issue Detected',
        type: 'text',
        required: true,
      },
      {
        key: 'potentialLoss',
        label: 'Potential Daily Loss ($)',
        type: 'text',
        required: true,
      },
      {
        key: 'issue1',
        label: 'Critical Issue #1',
        type: 'text',
        required: true,
      },
      {
        key: 'issue2',
        label: 'Critical Issue #2',
        type: 'text',
        required: true,
      },
      {
        key: 'issue3',
        label: 'Critical Issue #3',
        type: 'text',
        required: false,
      },
      {
        key: 'immediateAction',
        label: 'Immediate Action Plan',
        type: 'text',
        required: true,
      },
      {
        key: 'preventionMeasure',
        label: 'Prevention Measure',
        type: 'text',
        required: true,
      },
      {
        key: 'emergencyLink',
        label: 'Emergency Response Link',
        type: 'text',
        required: true,
      },
      {
        key: 'calendarLink',
        label: 'Calendar Link',
        type: 'text',
        required: true,
      },
      { key: 'senderName', label: 'Sender Name', type: 'text', required: true },
    ],
  },

  {
    id: 'maintenance-preventive',
    name: 'Maintenance - Preventive Care',
    service: 'maintenance',
    subject: '{{companyName}}: Prevent Website Downtime Before It Happens',
    content: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f0f9ff 0%, #f0fdf4 100%); padding: 40px 20px;">
        <div style="background: white; border-radius: 16px; padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
          <h1 style="color: #059669; font-size: 28px; margin-bottom: 24px;">🛡️ Proactive Website Protection</h1>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Hi {{clientName}},
          </p>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Did you know that {{industry}} websites experience an average of {{downtimeHours}} hours of downtime per year? That's {{costOfDowntime}} in lost revenue for {{companyName}}.
          </p>
          
          <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); border-radius: 12px; padding: 24px; margin: 24px 0;">
            <h2 style="color: white; font-size: 20px; margin-bottom: 16px;">🎯 Our Maintenance Package:</h2>
            <ul style="color: white; font-size: 16px; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li><strong>{{feature1}}</strong></li>
              <li><strong>{{feature2}}</strong></li>
              <li><strong>{{feature3}}</strong></li>
              <li><strong>{{feature4}}</strong></li>
            </ul>
          </div>
          
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <h3 style="color: #059669; font-size: 18px; margin-bottom: 12px;">📊 What You Get:</h3>
            <ul style="color: #065f46; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
              <li>{{monthlyReports}} detailed monthly reports</li>
              <li>{{responseTime}} emergency response time</li>
              <li>{{backupFrequency}} automated backups</li>
              <li>{{uptimeGuarantee}} uptime guarantee</li>
            </ul>
          </div>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            <strong>Investment:</strong> Only {{monthlyPrice}}/month<br>
            <strong>ROI:</strong> Save {{potentialSavings}} annually in prevented downtime
          </p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="{{packageLink}}" style="background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; margin-right: 16px;">
              View Package Details
            </a>
            <a href="{{calendarLink}}" style="background: transparent; color: #059669; padding: 16px 32px; border: 2px solid #059669; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
              Schedule Consultation
            </a>
          </div>
          
          <p style="color: #64748b; font-size: 14px; text-align: center;">
            {{senderName}}<br>
            <strong>3ZeroDigital</strong> | Preventive Care Specialists
          </p>
        </div>
      </div>
    `,
    dynamicFields: [
      {
        key: 'downtimeHours',
        label: 'Average Downtime Hours/Year',
        type: 'number',
        required: true,
      },
      {
        key: 'costOfDowntime',
        label: 'Cost of Downtime ($)',
        type: 'text',
        required: true,
      },
      {
        key: 'feature1',
        label: 'Package Feature #1',
        type: 'text',
        required: true,
      },
      {
        key: 'feature2',
        label: 'Package Feature #2',
        type: 'text',
        required: true,
      },
      {
        key: 'feature3',
        label: 'Package Feature #3',
        type: 'text',
        required: true,
      },
      {
        key: 'feature4',
        label: 'Package Feature #4',
        type: 'text',
        required: false,
      },
      {
        key: 'monthlyReports',
        label: 'Monthly Reports Description',
        type: 'text',
        required: true,
      },
      {
        key: 'responseTime',
        label: 'Emergency Response Time',
        type: 'text',
        required: true,
      },
      {
        key: 'backupFrequency',
        label: 'Backup Frequency',
        type: 'text',
        required: true,
      },
      {
        key: 'uptimeGuarantee',
        label: 'Uptime Guarantee (%)',
        type: 'text',
        required: true,
      },
      {
        key: 'monthlyPrice',
        label: 'Monthly Price',
        type: 'text',
        required: true,
      },
      {
        key: 'potentialSavings',
        label: 'Potential Annual Savings ($)',
        type: 'text',
        required: true,
      },
      {
        key: 'packageLink',
        label: 'Package Details Link',
        type: 'text',
        required: true,
      },
      {
        key: 'calendarLink',
        label: 'Calendar Link',
        type: 'text',
        required: true,
      },
      { key: 'senderName', label: 'Sender Name', type: 'text', required: true },
    ],
  },

  // DIGITAL MARKETING TEMPLATES
  {
    id: 'digital-marketing-audit',
    name: 'Digital Marketing - Free Audit',
    service: 'digital-marketing',
    subject:
      'Free Marketing Audit: {{companyName}} Missing {{missedOpportunities}} Opportunities',
    content: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); padding: 40px 20px;">
        <div style="background: white; border-radius: 16px; padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
          <h1 style="color: #059669; font-size: 28px; margin-bottom: 24px;">📈 Free Marketing Audit for {{companyName}}</h1>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Hi {{clientName}},
          </p>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            I analyzed {{companyName}}'s digital presence and found {{missedOpportunities}} missed opportunities that could generate an additional {{revenueIncrease}} monthly.
          </p>
          
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; padding: 24px; margin: 24px 0;">
            <h2 style="color: white; font-size: 20px; margin-bottom: 16px;">🎯 What I Found:</h2>
            <ul style="color: white; font-size: 16px; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li><strong>SEO Gap:</strong> {{seoOpportunity}}</li>
              <li><strong>Content Gap:</strong> {{contentOpportunity}}</li>
              <li><strong>Social Media:</strong> {{socialOpportunity}}</li>
              <li><strong>Paid Ads:</strong> {{paidAdsOpportunity}}</li>
            </ul>
          </div>
          
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <h3 style="color: #059669; font-size: 18px; margin-bottom: 12px;">📋 Free Audit Includes:</h3>
            <ul style="color: #065f46; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
              <li>{{auditItem1}}</li>
              <li>{{auditItem2}}</li>
              <li>{{auditItem3}}</li>
              <li>{{auditItem4}}</li>
            </ul>
          </div>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            <strong>Audit Duration:</strong> {{auditDuration}}<br>
            <strong>Delivery:</strong> {{deliveryTimeframe}}<br>
            <strong>Cost:</strong> Completely FREE ({{originalValue}} value)
          </p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="{{auditLink}}" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; margin-right: 16px;">
              Claim Free Audit
            </a>
            <a href="{{calendarLink}}" style="background: transparent; color: #10b981; padding: 16px 32px; border: 2px solid #10b981; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
              Schedule Call
            </a>
          </div>
          
          <p style="color: #64748b; font-size: 14px; text-align: center;">
            {{senderName}}<br>
            <strong>3ZeroDigital</strong> | Growth Marketing Specialists
          </p>
        </div>
      </div>
    `,
    dynamicFields: [
      {
        key: 'missedOpportunities',
        label: 'Number of Missed Opportunities',
        type: 'number',
        required: true,
      },
      {
        key: 'revenueIncrease',
        label: 'Potential Monthly Revenue Increase ($)',
        type: 'text',
        required: true,
      },
      {
        key: 'seoOpportunity',
        label: 'SEO Opportunity Description',
        type: 'text',
        required: true,
      },
      {
        key: 'contentOpportunity',
        label: 'Content Opportunity Description',
        type: 'text',
        required: true,
      },
      {
        key: 'socialOpportunity',
        label: 'Social Media Opportunity',
        type: 'text',
        required: true,
      },
      {
        key: 'paidAdsOpportunity',
        label: 'Paid Ads Opportunity',
        type: 'text',
        required: true,
      },
      {
        key: 'auditItem1',
        label: 'Audit Item #1',
        type: 'text',
        required: true,
      },
      {
        key: 'auditItem2',
        label: 'Audit Item #2',
        type: 'text',
        required: true,
      },
      {
        key: 'auditItem3',
        label: 'Audit Item #3',
        type: 'text',
        required: true,
      },
      {
        key: 'auditItem4',
        label: 'Audit Item #4',
        type: 'text',
        required: false,
      },
      {
        key: 'auditDuration',
        label: 'Audit Duration',
        type: 'text',
        required: true,
      },
      {
        key: 'deliveryTimeframe',
        label: 'Delivery Timeframe',
        type: 'text',
        required: true,
      },
      {
        key: 'originalValue',
        label: 'Original Value ($)',
        type: 'text',
        required: true,
      },
      {
        key: 'auditLink',
        label: 'Audit Request Link',
        type: 'text',
        required: true,
      },
      {
        key: 'calendarLink',
        label: 'Calendar Link',
        type: 'text',
        required: true,
      },
      { key: 'senderName', label: 'Sender Name', type: 'text', required: true },
    ],
  },

  {
    id: 'digital-marketing-case-study',
    name: 'Digital Marketing - Success Story',
    service: 'digital-marketing',
    subject:
      'How {{caseStudyCompany}} Increased Revenue by {{caseStudyGrowth}}% - Could {{companyName}} Do The Same?',
    content: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); padding: 40px 20px;">
        <div style="background: white; border-radius: 16px; padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
          <h1 style="color: #059669; font-size: 28px; margin-bottom: 24px;">🚀 Success Story: {{caseStudyCompany}}</h1>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Hi {{clientName}},
          </p>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            I wanted to share how we helped {{caseStudyCompany}}, a {{caseStudyIndustry}} company similar to {{companyName}}, achieve remarkable results.
          </p>
          
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; padding: 24px; margin: 24px 0;">
            <h2 style="color: white; font-size: 20px; margin-bottom: 16px;">📊 Results in {{timeframe}}:</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; color: white;">
              <div style="text-align: center;">
                <div style="font-size: 32px; font-weight: bold; margin-bottom: 8px;">+{{caseStudyGrowth}}%</div>
                <div style="font-size: 14px;">Revenue Growth</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 32px; font-weight: bold; margin-bottom: 8px;">+{{trafficIncrease}}%</div>
                <div style="font-size: 14px;">Website Traffic</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 32px; font-weight: bold; margin-bottom: 8px;">+{{leadsIncrease}}%</div>
                <div style="font-size: 14px;">Quality Leads</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 32px; font-weight: bold; margin-bottom: 8px;">{{roiImprovement}}:1</div>
                <div style="font-size: 14px;">ROI Improvement</div>
              </div>
            </div>
          </div>
          
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <h3 style="color: #059669; font-size: 18px; margin-bottom: 12px;">🎯 How We Did It:</h3>
            <ul style="color: #065f46; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
              <li>{{strategy1}}</li>
              <li>{{strategy2}}</li>
              <li>{{strategy3}}</li>
              <li>{{strategy4}}</li>
            </ul>
          </div>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            The best part? {{caseStudyCompany}} started seeing results within {{resultsTimeframe}}, and their investment paid for itself in {{paybackPeriod}}.
          </p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="{{caseStudyLink}}" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; margin-right: 16px;">
              Read Full Case Study
            </a>
            <a href="{{calendarLink}}" style="background: transparent; color: #10b981; padding: 16px 32px; border: 2px solid #10b981; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
              Discuss Your Goals
            </a>
          </div>
          
          <p style="color: #64748b; font-size: 14px; text-align: center;">
            {{senderName}}<br>
            <strong>3ZeroDigital</strong> | Proven Growth Results
          </p>
        </div>
      </div>
    `,
    dynamicFields: [
      {
        key: 'caseStudyCompany',
        label: 'Case Study Company Name',
        type: 'text',
        required: true,
      },
      {
        key: 'caseStudyIndustry',
        label: 'Case Study Industry',
        type: 'text',
        required: true,
      },
      {
        key: 'caseStudyGrowth',
        label: 'Revenue Growth (%)',
        type: 'number',
        required: true,
      },
      {
        key: 'timeframe',
        label: 'Results Timeframe',
        type: 'text',
        required: true,
      },
      {
        key: 'trafficIncrease',
        label: 'Traffic Increase (%)',
        type: 'number',
        required: true,
      },
      {
        key: 'leadsIncrease',
        label: 'Leads Increase (%)',
        type: 'number',
        required: true,
      },
      {
        key: 'roiImprovement',
        label: 'ROI Ratio (e.g., 5 for 5:1)',
        type: 'number',
        required: true,
      },
      { key: 'strategy1', label: 'Strategy #1', type: 'text', required: true },
      { key: 'strategy2', label: 'Strategy #2', type: 'text', required: true },
      { key: 'strategy3', label: 'Strategy #3', type: 'text', required: true },
      { key: 'strategy4', label: 'Strategy #4', type: 'text', required: false },
      {
        key: 'resultsTimeframe',
        label: 'Initial Results Timeframe',
        type: 'text',
        required: true,
      },
      {
        key: 'paybackPeriod',
        label: 'Investment Payback Period',
        type: 'text',
        required: true,
      },
      {
        key: 'caseStudyLink',
        label: 'Case Study Link',
        type: 'text',
        required: true,
      },
      {
        key: 'calendarLink',
        label: 'Calendar Link',
        type: 'text',
        required: true,
      },
      { key: 'senderName', label: 'Sender Name', type: 'text', required: true },
    ],
  },

  // TROUBLESHOOTING TEMPLATES
  {
    id: 'troubleshooting-emergency',
    name: 'Troubleshooting - Emergency Support',
    service: 'troubleshooting',
    subject: '🆘 {{companyName}} Emergency Support: {{issueType}} Resolution',
    content: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #fef2f2 0%, #fff7ed 100%); padding: 40px 20px;">
        <div style="background: white; border-radius: 16px; padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); border-left: 4px solid #f59e0b;">
          <h1 style="color: #d97706; font-size: 28px; margin-bottom: 24px;">🆘 Emergency Technical Support</h1>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Hi {{clientName}},
          </p>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            We understand {{companyName}} is experiencing {{issueType}} issues. Technical emergencies can't wait, and neither should you.
          </p>
          
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 12px; padding: 24px; margin: 24px 0;">
            <h2 style="color: white; font-size: 20px; margin-bottom: 16px;">⚡ Emergency Response Protocol:</h2>
            <ul style="color: white; font-size: 16px; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li><strong>{{responseTime}} Response Time</strong></li>
              <li><strong>{{expertLevel}} Expert Assignment</strong></li>
              <li><strong>{{communicationMethod}} Direct Communication</strong></li>
              <li><strong>{{resolutionGuarantee}} Resolution Guarantee</strong></li>
            </ul>
          </div>
          
          <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <h3 style="color: #d97706; font-size: 18px; margin-bottom: 12px;">🔧 What We Can Fix:</h3>
            <ul style="color: #92400e; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
              <li>{{fixableIssue1}}</li>
              <li>{{fixableIssue2}}</li>
              <li>{{fixableIssue3}}</li>
              <li>{{fixableIssue4}}</li>
            </ul>
          </div>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            <strong>Emergency Rate:</strong> {{emergencyRate}}<br>
            <strong>Availability:</strong> {{availability}}<br>
            <strong>Payment:</strong> {{paymentTerms}}
          </p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="{{emergencyHotline}}" style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; margin-right: 16px;">
              🚨 Call Emergency Hotline
            </a>
            <a href="{{ticketLink}}" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
              Submit Emergency Ticket
            </a>
          </div>
          
          <p style="color: #64748b; font-size: 14px; text-align: center;">
            24/7 Emergency Support,<br>
            {{senderName}}<br>
            <strong>3ZeroDigital</strong> | Rapid Response Team
          </p>
        </div>
      </div>
    `,
    dynamicFields: [
      {
        key: 'issueType',
        label: 'Type of Technical Issue',
        type: 'text',
        required: true,
      },
      {
        key: 'responseTime',
        label: 'Response Time Guarantee',
        type: 'text',
        required: true,
      },
      {
        key: 'expertLevel',
        label: 'Expert Level (Senior/Lead/etc.)',
        type: 'text',
        required: true,
      },
      {
        key: 'communicationMethod',
        label: 'Communication Method',
        type: 'text',
        required: true,
      },
      {
        key: 'resolutionGuarantee',
        label: 'Resolution Guarantee',
        type: 'text',
        required: true,
      },
      {
        key: 'fixableIssue1',
        label: 'Fixable Issue Type #1',
        type: 'text',
        required: true,
      },
      {
        key: 'fixableIssue2',
        label: 'Fixable Issue Type #2',
        type: 'text',
        required: true,
      },
      {
        key: 'fixableIssue3',
        label: 'Fixable Issue Type #3',
        type: 'text',
        required: true,
      },
      {
        key: 'fixableIssue4',
        label: 'Fixable Issue Type #4',
        type: 'text',
        required: false,
      },
      {
        key: 'emergencyRate',
        label: 'Emergency Hourly Rate',
        type: 'text',
        required: true,
      },
      {
        key: 'availability',
        label: 'Availability Hours',
        type: 'text',
        required: true,
      },
      {
        key: 'paymentTerms',
        label: 'Payment Terms',
        type: 'text',
        required: true,
      },
      {
        key: 'emergencyHotline',
        label: 'Emergency Hotline Link/Number',
        type: 'text',
        required: true,
      },
      {
        key: 'ticketLink',
        label: 'Emergency Ticket Link',
        type: 'text',
        required: true,
      },
      { key: 'senderName', label: 'Sender Name', type: 'text', required: true },
    ],
  },

  {
    id: 'troubleshooting-consultation',
    name: 'Troubleshooting - Technical Consultation',
    service: 'troubleshooting',
    subject:
      '{{companyName}}: Free Technical Consultation - Prevent Issues Before They Happen',
    content: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f0f9ff 0%, #f3e8ff 100%); padding: 40px 20px;">
        <div style="background: white; border-radius: 16px; padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
          <h1 style="color: #7c3aed; font-size: 28px; margin-bottom: 24px;">🔍 Technical Health Check for {{companyName}}</h1>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Hi {{clientName}},
          </p>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Prevention is better than cure, especially when it comes to technology. I'd like to offer {{companyName}} a complimentary technical consultation to identify potential issues before they become costly problems.
          </p>
          
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #6366f1 100%); border-radius: 12px; padding: 24px; margin: 24px 0;">
            <h2 style="color: white; font-size: 20px; margin-bottom: 16px;">🎯 Consultation Coverage:</h2>
            <ul style="color: white; font-size: 16px; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li><strong>{{analysisArea1}}</strong></li>
              <li><strong>{{analysisArea2}}</strong></li>
              <li><strong>{{analysisArea3}}</strong></li>
              <li><strong>{{analysisArea4}}</strong></li>
            </ul>
          </div>
          
          <div style="background: #f3e8ff; border: 1px solid #c4b5fd; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <h3 style="color: #7c3aed; font-size: 18px; margin-bottom: 12px;">📋 You'll Receive:</h3>
            <ul style="color: #553c9a; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
              <li>{{deliverable1}}</li>
              <li>{{deliverable2}}</li>
              <li>{{deliverable3}}</li>
              <li>{{deliverable4}}</li>
            </ul>
          </div>
          
          <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <h3 style="color: #d97706; font-size: 18px; margin-bottom: 12px;">💡 Common Issues We Prevent:</h3>
            <ul style="color: #92400e; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
              <li>{{commonIssue1}} (Avg cost to fix: {{issue1Cost}})</li>
              <li>{{commonIssue2}} (Avg cost to fix: {{issue2Cost}})</li>
              <li>{{commonIssue3}} (Avg cost to fix: {{issue3Cost}})</li>
            </ul>
          </div>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            <strong>Duration:</strong> {{consultationDuration}}<br>
            <strong>Format:</strong> {{consultationFormat}}<br>
            <strong>Cost:</strong> FREE ({{consultationValue}} value)
          </p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="{{bookingLink}}" style="background: linear-gradient(135deg, #7c3aed 0%, #6366f1 100%); color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; margin-right: 16px;">
              Book Free Consultation
            </a>
            <a href="{{portfolioLink}}" style="background: transparent; color: #7c3aed; padding: 16px 32px; border: 2px solid #7c3aed; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
              View Our Work
            </a>
          </div>
          
          <p style="color: #64748b; font-size: 14px; text-align: center;">
            {{senderName}}<br>
            <strong>3ZeroDigital</strong> | Technical Consultants
          </p>
        </div>
      </div>
    `,
    dynamicFields: [
      {
        key: 'analysisArea1',
        label: 'Analysis Area #1',
        type: 'text',
        required: true,
      },
      {
        key: 'analysisArea2',
        label: 'Analysis Area #2',
        type: 'text',
        required: true,
      },
      {
        key: 'analysisArea3',
        label: 'Analysis Area #3',
        type: 'text',
        required: true,
      },
      {
        key: 'analysisArea4',
        label: 'Analysis Area #4',
        type: 'text',
        required: false,
      },
      {
        key: 'deliverable1',
        label: 'Consultation Deliverable #1',
        type: 'text',
        required: true,
      },
      {
        key: 'deliverable2',
        label: 'Consultation Deliverable #2',
        type: 'text',
        required: true,
      },
      {
        key: 'deliverable3',
        label: 'Consultation Deliverable #3',
        type: 'text',
        required: true,
      },
      {
        key: 'deliverable4',
        label: 'Consultation Deliverable #4',
        type: 'text',
        required: false,
      },
      {
        key: 'commonIssue1',
        label: 'Common Preventable Issue #1',
        type: 'text',
        required: true,
      },
      {
        key: 'issue1Cost',
        label: 'Issue #1 Fix Cost',
        type: 'text',
        required: true,
      },
      {
        key: 'commonIssue2',
        label: 'Common Preventable Issue #2',
        type: 'text',
        required: true,
      },
      {
        key: 'issue2Cost',
        label: 'Issue #2 Fix Cost',
        type: 'text',
        required: true,
      },
      {
        key: 'commonIssue3',
        label: 'Common Preventable Issue #3',
        type: 'text',
        required: true,
      },
      {
        key: 'issue3Cost',
        label: 'Issue #3 Fix Cost',
        type: 'text',
        required: true,
      },
      {
        key: 'consultationDuration',
        label: 'Consultation Duration',
        type: 'text',
        required: true,
      },
      {
        key: 'consultationFormat',
        label: 'Consultation Format',
        type: 'text',
        required: true,
      },
      {
        key: 'consultationValue',
        label: 'Consultation Value ($)',
        type: 'text',
        required: true,
      },
      {
        key: 'bookingLink',
        label: 'Booking Link',
        type: 'text',
        required: true,
      },
      {
        key: 'portfolioLink',
        label: 'Portfolio/Work Link',
        type: 'text',
        required: false,
      },
      { key: 'senderName', label: 'Sender Name', type: 'text', required: true },
    ],
  },
];
