import { siteConfig } from "@/config/site";

// Welcome email template (bilingual: Amharic/English)
export function getWelcomeEmailHtml(subscriberEmail: string): string {
  return `
<!DOCTYPE html>
<html lang="am" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>እንኳን ደህና መጡ - Welcome to ${siteConfig.name}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                ${siteConfig.name}
              </h1>
              <p style="margin: 10px 0 0; color: #e0e7ff; font-size: 16px;">
                ሰማያዊ መንገድ
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #1f2937; font-size: 24px; font-weight: 600;">
                እንኳን ደህና መጡ! 🙏
              </h2>
              <p style="margin: 0 0 16px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                ወደ <strong>${siteConfig.name}</strong> የደብዳቤ ዝርዝር እንኳን ደህና መጡ። ስለመጽሐፍ ቅዱስ ሴቶች፣ ወንዶች፣ የቤተክርስቲያን ታሪክ እና መንፈሳዊ ትምህርት የሚያስተምሩ አዲስ የብሎግ ጽሑፎችን በመደበኛነት እናመጣለን።
              </p>
              <p style="margin: 0 0 16px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                <strong>Welcome!</strong> Thank you for subscribing to <strong>${siteConfig.name}</strong>. We'll send you regular updates about new blog posts covering Women of the Bible, Men of the Bible, Church History, and spiritual teachings.
              </p>

              <div style="margin: 30px 0; padding: 20px; background-color: #f3f4f6; border-left: 4px solid #667eea; border-radius: 4px;">
                <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.5;">
                  <strong>የሚጠበቁ ነገሮች (What to Expect):</strong><br>
                  📖 አዲስ የብሎግ ጽሑፎች (New blog posts)<br>
                  ✨ ልዩ ይዘቶች (Exclusive content)<br>
                  🎯 መንፈሳዊ ግንዛቤዎች (Spiritual insights)<br>
                  📅 ለርስዎ የተበጀ ይዘት (Content tailored for you)
                </p>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${siteConfig.url}/blog" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                  ብሎጉን ያንብቡ (Read the Blog)
                </a>
              </div>

              <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                ከሰላምታ ጋር (With blessings),<br>
                <strong>${siteConfig.author}</strong><br>
                ${siteConfig.name}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
              <p style="margin: 0 0 10px; color: #6b7280; font-size: 12px; line-height: 1.5; text-align: center;">
                ይህንን ኢሜይል በተቀበሉት ምክንያት ${subscriberEmail} ን በ ${siteConfig.name} ላይ ለደብዳቤ ዝርዝር ደንበኛ ሆነዋል።
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px; text-align: center;">
                You received this email because ${subscriberEmail} was subscribed to the ${siteConfig.name} newsletter.
              </p>
              <div style="margin: 15px 0 0; text-align: center;">
                <a href="${siteConfig.url}" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 10px;">መነሻ (Home)</a>
                <a href="${siteConfig.url}/blog" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 10px;">ብሎግ (Blog)</a>
                <a href="${siteConfig.url}/about" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 10px;">ስለ እኛ (About)</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

// Plain text version of the welcome email
export function getWelcomeEmailText(subscriberEmail: string): string {
  return `
እንኳን ደህና መጡ! (Welcome!)
====================================

ወደ ${siteConfig.name} የደብዳቤ ዝርዝር እንኳን ደህና መጡ።

Welcome to ${siteConfig.name}!

Thank you for subscribing. We'll send you regular updates about new blog posts covering:
- Women of the Bible
- Men of the Bible
- Church History
- Spiritual teachings

የሚጠበቁ ነገሮች (What to Expect):
- አዲስ የብሎግ ጽሑፎች (New blog posts)
- ልዩ ይዘቶች (Exclusive content)
- መንፈሳዊ ግንዛቤዎች (Spiritual insights)

Visit our blog: ${siteConfig.url}/blog

ከሰላምታ ጋር (With blessings),
${siteConfig.author}
${siteConfig.name}

---
You received this email because ${subscriberEmail} was subscribed to the ${siteConfig.name} newsletter.
`;
}
