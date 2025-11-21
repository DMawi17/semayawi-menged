import { siteConfig } from "@/config/site";

// HTML escape function to prevent XSS in email templates
function escapeHtml(text: string): string {
	const map: { [key: string]: string } = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#039;",
	};
	return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Welcome email template (Amharic only)
export function getWelcomeEmailHtml(
	subscriberEmail: string,
	subscriberName?: string
): string {
	const safeEmail = escapeHtml(subscriberEmail);
	const safeName = subscriberName ? escapeHtml(subscriberName) : "";
	return `
  <!DOCTYPE html>
  <html lang="am" dir="ltr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🙏 እንኳን ወደ ሰማያዊ መንገድ በደህና መጡ!</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb;">
      <tr>
        <td style="padding: 40px 20px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0
   4px 6px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <tr>
              <td style="padding: 50px 40px 30px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: 0.5px;">
                  ${siteConfig.name}
                </h1>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding: 50px 40px;">
                <h2 style="margin: 0 0 30px; color: #1f2937; font-size: 20px; font-weight: 600; line-height: 1.5;">
                  ውድ ${safeName || "ወንድም/እህት"}፣
                </h2>

                <p style="margin: 0 0 25px; color: #4b5563; font-size: 16px; line-height: 1.8;">
                  በሰማያዊ መንገድ አብረውን ለመጓዝ ስለመረጡ ከልብ እናመሰግናለን! ይህ ገጽ የኢሜል ዝርዝር ብቻ ሳይሆን፣ እምነታችንን በዕለት ተዕለት ሕይወታችን ውስጥ በጥልቀት ለመኖር የምንተጋበት መንፈሳዊ ማኅበረሰብ ነው።
                </p>

                <p style="margin: 0 0 35px; color: #4b5563; font-size: 16px; line-height: 1.8;">
                  ዓላማችን የመጽሐፍ ቅዱስን ጥልቅ እውነቶች በአስተውሎት መርምረን፣ በዘመናዊው ሕይወትዎ ውስጥ ተግባራዊ እንዲሆን ማገዝ ነው።
                </p>

                <div style="margin: 40px 0; padding: 30px; background-color: #f3f4f6; border-left: 4px solid #667eea; border-radius: 4px;">
                  <p style="margin: 0 0 20px; color: #1f2937; font-size: 17px; font-weight: 600;">
                    በዚህ መድረክ ላይ ትኩረት የምናደርግባቸው ዋና ዋና ጉዳዮች፦
                  </p>
                  <p style="margin: 0 0 15px; color: #374151; font-size: 15px; line-height: 1.8;">
                    📖 <strong>ጥልቅና ተግባራዊ ጽሑፎች፦</strong> ታሪክን ከማስተማር ባለፈ ሕይወትን የሚለውጡ ትምህርቶች።
                  </p>
                  <p style="margin: 0 0 15px; color: #374151; font-size: 15px; line-height: 1.8;">
                    ✨ <strong>ልዩ ማስተዋሎች፦</strong> ለተመዝጋቢዎቻችን ብቻ የሚደርሱ ተጨማሪ ሀሳቦችና የውይይት መነሻዎች።
                  </p>
                  <p style="margin: 0 0 15px; color: #374151; font-size: 15px; line-height: 1.8;">
                    🤔 <strong>ልብን የሚመረምሩ ጥያቄዎች፦</strong> እምነትዎንና አካሄድዎን እንዲፈትሹ የሚገዳደሩ ሀሳቦች።
                  </p>
                  <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.8;">
                    🔗 <strong>ከሕይወትዎ ጋር የሚገናኝ ይዘት፦</strong> በሥራ ቦታ፣ በቤተሰብና በግል ሕይወትዎ ውስጥ የሚተገበሩ መርሆች።
                  </p>
                </div>

                <p style="margin: 0 0 30px; color: #4b5563; font-size: 16px; line-height: 1.8;">
                  ቀጣዩን ኢሜል ከመጠበቅዎ በፊት፣ በጣም ተወዳጅ ከሆኑት ጽሑፎቻችን መካከል ጥቂቶቹን እንዲጎበኙ እንጋብዝዎታለን።
                </p>

                <div style="text-align: center; margin: 40px 0;">
                  <a href="${
						siteConfig.url
					}/blog" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; 
  text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                    ጉዞዎን እዚህ ይጀምሩ
                  </a>
                </div>

                <p style="margin: 40px 0 0; color: #6b7280; font-size: 15px; line-height: 1.8;">

                  <strong>${siteConfig.author}</strong><br>
                  ${siteConfig.name}
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 30px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
                <p style="margin: 0 0 10px; color: #6b7280; font-size: 12px; line-height: 1.5; text-align: center;">
                  ይህንን ኢሜል የተቀበሉት ${safeEmail} በ${
		siteConfig.name
	} ላይ ለደብዳቤ ዝርዝር ስለተመዘገቡ ነው።
                </p>
                <div style="margin: 15px 0 0; text-align: center;">
                  <a href="${
						siteConfig.url
					}" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 10px;">ዋና ገጽ</a>
                  <a href="${
						siteConfig.url
					}/blog" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 10px;">ጽሁፎች</a>
                  <a href="${
						siteConfig.url
					}/about" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 10px;">ስለ እኛ</a>
                </div>
                <p style="margin: 15px 0 0; color: #9ca3af; font-size: 11px; text-align: center;">
                  <a href="${
						siteConfig.url
					}/unsubscribe?email=${encodeURIComponent(
		safeEmail
	)}" style="color: #9ca3af; text-decoration: underline;">አባልነትን ይሰርዙ</a>
                </p>
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
export function getWelcomeEmailText(
	subscriberEmail: string,
	subscriberName?: string
): string {
	const safeName = subscriberName || "ወንድም/እህት";
	return `
  🙏 እንኳን ወደ ሰማያዊ መንገድ በደህና መጡ!
  ====================================

  ውድ ${safeName}፣

  በሰማያዊ መንገድ አብረውን ለመጓዝ ስለመረጡ ከልብ እናመሰግናለን! ይህ ገጽ የኢሜል ዝርዝር ብቻ ሳይሆን፣ እምነታችንን በዕለት ተዕለት ሕይወታችን ውስጥ በጥልቀት ለመኖር የምንተጋበት መንፈሳዊ ማኅበረሰብ ነው።

  ዓላማችን የመጽሐፍ ቅዱስን ጥልቅ እውነቶች በአስተውሎት መርምረን፣ በዘመናዊው ሕይወትዎ ውስጥ ተግባራዊ እንዲሆን ማገዝ ነው።

  በዚህ መድረክ ላይ ትኩረት የምናደርግባቸው ዋና ዋና ጉዳዮች፦

  📖 ጥልቅና ተግባራዊ ጽሑፎች፦ ታሪክን ከማስተማር ባለፈ ሕይወትን የሚለውጡ ትምህርቶች።

  ✨ ልዩ ማስተዋሎች፦ ለተመዝጋቢዎቻችን ብቻ የሚደርሱ ተጨማሪ ሀሳቦችና የውይይት መነሻዎች።

  🤔 ልብን የሚመረምሩ ጥያቄዎች፦ እምነትዎንና አካሄድዎን እንዲፈትሹ የሚገዳደሩ ሀሳቦች።

  🔗 ከሕይወትዎ ጋር የሚገናኝ ይዘት፦ በሥራ ቦታ፣ በቤተሰብና በግል ሕይወትዎ ውስጥ የሚተገበሩ መርሆች።

  ቀጣዩን ኢሜል ከመጠበቅዎ በፊት፣ በጣም ተወዳጅ ከሆኑት ጽሑፎቻችን መካከል ጥቂቶቹን እንዲጎበኙ እንጋብዝዎታለን።

  ጉዞዎን እዚህ ይጀምሩ: ${siteConfig.url}/blog

  ${siteConfig.author}
  ${siteConfig.name}

  ---
  ይህንን ኢሜል የተቀበሉት ${subscriberEmail} በ${siteConfig.name} ላይ ለደብዳቤ ዝርዝር ስለተመዘገቡ ነው።
  `;
}
