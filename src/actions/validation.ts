'use server';

const USERCHECK_API_KEY = 'your-api-key-here';

export async function checkEmailWithUserCheck(email: string) {
  try {
    const response = await fetch(`https://api.usercheck.com/email/${email}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${USERCHECK_API_KEY}`,
      },
    });

    // Check for a successful response
    if (!response.ok) {
      console.error('Error: Unable to fetch email check data');
      return {
        success: false,
        message: 'Failed to verify email, please try again later.',
      };
    }

    const data = await response.json();

    // Now, send back appropriate messages based on the response
    if (data.disposable) {
      return {
        success: false,
        message: `The email address ${email} is from a disposable email provider. Please use a valid email address.`,
      };
    }

    if (data.spam) {
      return {
        success: false,
        message: `The email address ${email} is flagged as spam. Please provide a valid email address.`,
      };
    }

    if (data.role_account) {
      return {
        success: false,
        message: `The email address ${email} belongs to a role account (e.g., admin@, support@). Please use a personal email address.`,
      };
    }

    if (data.alias) {
      return {
        success: false,
        message: `The email address ${email} seems to be an alias or temporary address. Please provide a valid email address.`,
      };
    }

    // If none of the above conditions are met, send a success message
    return {
      success: true,
      message: `The email address ${email} is valid and ready for registration.`,
    };
  } catch (error) {
    console.error('Error checking email with UserCheck:', error);
    return {
      success: false,
      message: 'There was an error processing your email. Please try again.',
    };
  }
}
