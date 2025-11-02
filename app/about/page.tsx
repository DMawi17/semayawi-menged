import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the biblical women's stories blog",
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <h1>ስለ ብሎግ</h1>

        <p className="lead">
          {siteConfig.name} የመጽሐፍ ቅዱስ ሴቶች ታሪክ እና ትምህርቶችን በአማርኛ የሚያቀርብ ብሎግ ነው።
        </p>

        <h2>የብሎግ አላማ</h2>
        <p>
          ይህ ብሎግ የመጽሐፍ ቅዱስ ሴቶች ታሪክ በአማርኛ ቋንቋ ለማቅረብ የተዘጋጀ ነው። እነዚህ ታሪኮች የእምነት፣
          ድፍረት፣ የመታገስ ችሎታ እና የእግዚአብሔርን ቃል የማክበር ምሳሌዎች ናቸው።
        </p>

        <h2>በብሎግ ውስጥ የምታገኙት</h2>
        <ul>
          <li>የመጽሐፍ ቅዱስ ታዋቂ ሴቶች ታሪክ</li>
          <li>ከእያንዳንዱ ታሪክ የምንማራቸው ትምህርቶች</li>
          <li>የመጽሐፍ ቅዱስ ማጣቀሻዎች እና ጥናቶች</li>
          <li>የሴቶች ሚና በመጽሐፍ ቅዱስ ታሪክ ውስጥ</li>
          <li>የእምነት እና የድፍረት ምሳሌዎች</li>
        </ul>

        <h2>ስለ ደራሲው</h2>
        <p>
          ደራሲው {siteConfig.author} ({siteConfig.work}) በመጽሐፍ ቅዱስ ጥናት ላይ ፍላጎት ያለው እና
          የእግዚአብሔርን ቃል በአማርኛ ለማካፈል የሚጥር ሰው ነው።
        </p>

        <h2>ያግኙን</h2>
        <p>ለመጽሐፍ ቅዱስ ጥያቄዎች፣ አስተያየቶች ወይም ጥቆማዎች፡</p>
        <ul>
          <li>
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a
              href={siteConfig.links.personalSite}
              target="_blank"
              rel="noopener noreferrer"
            >
              Personal Website
            </a>
          </li>
        </ul>

        <h2>ስለ መጽሐፍ ቅዱስ ሴቶች</h2>
        <p>
          መጽሐፍ ቅዱስ ብዙ አስደናቂ ሴቶችን ታሪክ ይዟል። እነዚህም፡
        </p>
        <ul>
          <li>ሔዋን - የመጀመሪያዋ ሴት እና የሕያዋን ሁሉ እናት</li>
          <li>ሣራ - የእምነት እናት</li>
          <li>ራሔል እና ሊያ - የያዕቆብ ሚስቶች</li>
          <li>ሐና - የሳሙኤል እናት</li>
          <li>ማርያም - የኢየሱስ እናት</li>
          <li>ማርታ እና ማርያም - የኢየሱስ ጓደኞች</li>
          <li>እና ሌሎችም ብዙ...</li>
        </ul>

        <p>
          እያንዳንዱ ታሪክ ልዩ ትምህርቶችን እና መንፈሳዊ እውቀቶችን ይዟል። ስለእነርሱ በማንበብ፣ የራሳችንን
          የእምነት ጉዞ ማጠናከር እንችላለን።
        </p>

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h3 className="mt-0">የማጋራት ግብ</h3>
          <p className="mb-0">
            &ldquo;በመጽሐፍ ቅዱስ የተጻፈው ነገር ሁሉ ትምህርትና ተስፋ እንድንቀሰም የተጻፈ ነው።&rdquo; - ሮሜ 15:4
          </p>
        </div>
      </article>
    </main>
  );
}
