export const WHATSAPP_NUMBER = '918904214607';

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const PHONE_DISPLAY = '+91 8904214607';

export const PHONE_RAW = '+918904214607';

export const PHONE_TEL = `tel:${PHONE_RAW}`;

export const BUSINESS_NAME = 'LaHaven Cake Boutique';

export const TAGLINE = 'Celebration Starts Here!';

export const SITE_URL = 'https://lahavencakes.com';

export const INSTAGRAM_URL = 'https://www.instagram.com/laheavencakes_/';

export const FACEBOOK_URL = 'https://facebook.com/lahavencakes';

export const YOUTUBE_URL = 'https://youtube.com/@lahavencakes';

export const TWITTER_URL = 'https://x.com/lahavencakes';

export const EMAIL = 'hello@lahavencakes.com';

export const EMAIL_MAILTO = `mailto:${EMAIL}`;

export const DEVELOPER_NAME = 'Tejavardhan';

export const DEVELOPER_WHATSAPP_NUMBER = '918904214607';

export const DEVELOPER_WHATSAPP_DISPLAY = '+91 8904214607';

/**
 * Generates a WhatsApp URL with a pre-filled message.
 * Uses `api.whatsapp.com/send` directly (instead of `wa.me` 302 redirector which
 * corrupts 4-byte UTF-8 emojis into replacement characters on WhatsApp Web/Desktop).
 * @param message - The message to pre-fill in the WhatsApp chat.
 * @param phone - Optional phone number override (digits only).
 * @returns The encoded WhatsApp URL string.
 */
export function getWhatsAppUrl(message: string, phone: string = WHATSAPP_NUMBER): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '') || WHATSAPP_NUMBER;
  const encodedMessage = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMessage}`;
}

export const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    url: INSTAGRAM_URL,
    handle: '@laheavencakes_',
  },
  {
    name: 'Facebook',
    url: FACEBOOK_URL,
    handle: 'lahavencakes',
  },
  {
    name: 'YouTube',
    url: YOUTUBE_URL,
    handle: '@lahavencakes',
  },
  {
    name: 'X (Twitter)',
    url: TWITTER_URL,
    handle: '@lahavencakes',
  },
];
