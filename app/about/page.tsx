import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the biblical women's stories blog",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">ስለ ብሎግ</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {siteConfig.name} የመጽሐፍ ቅዱስ ሴቶች ታሪክ እና ትምህርቶችን በአማርኛ የሚያቀርብ ብሎግ ነው።
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-12">
        {/* Purpose Section */}
        <section className="rounded-lg border bg-card p-8">
          <h2 className="text-2xl font-bold mb-4">የብሎግ አላማ</h2>
          <p className="text-muted-foreground leading-relaxed">
            ይህ ብሎግ የመጽሐፍ ቅዱስ ሴቶች ታሪክ በአማርኛ ቋንቋ ለማቅረብ የተዘጋጀ ነው። እነዚህ ታሪኮች የእምነት፣
            ድፍረት፣ የመታገስ ችሎታ እና የእግዚአብሔርን ቃል የማክበር ምሳሌዎች ናቸው።
          </p>
        </section>

        {/* What You'll Find Section */}
        <section className="rounded-lg border bg-card p-8">
          <h2 className="text-2xl font-bold mb-6">በብሎግ ውስጥ የምታገኙት</h2>
          <ul className="grid gap-3">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✓</span>
              <span className="text-muted-foreground">የመጽሐፍ ቅዱስ ታዋቂ ሴቶች ታሪክ</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✓</span>
              <span className="text-muted-foreground">ከእያንዳንዱ ታሪክ የምንማራቸው ትምህርቶች</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✓</span>
              <span className="text-muted-foreground">የመጽሐፍ ቅዱስ ማጣቀሻዎች እና ጥናቶች</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✓</span>
              <span className="text-muted-foreground">የሴቶች ሚና በመጽሐፍ ቅዱስ ታሪክ ውስጥ</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✓</span>
              <span className="text-muted-foreground">የእምነት እና የድፍረት ምሳሌዎች</span>
            </li>
          </ul>
        </section>

        {/* Author Section */}
        <section className="rounded-lg border bg-card p-8">
          <h2 className="text-2xl font-bold mb-4">ስለ ደራሲው</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            ደራሲው {siteConfig.author} ({siteConfig.work}) በመጽሐፍ ቅዱስ ጥናት ላይ ፍላጎት ያለው እና
            የእግዚአብሔርን ቃል በአማርኛ ለማካፈል የሚጥር ሰው ነው።
          </p>
          <div>
            <h3 className="text-lg font-semibold mb-3">ያግኙን</h3>
            <p className="text-sm text-muted-foreground mb-4">ለመጽሐፍ ቅዱስ ጥያቄዎች፣ አስተያየቶች ወይም ጥቆማዎች፡</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-background hover:bg-accent transition-colors text-sm font-medium"
              >
                GitHub
              </a>
              <a
                href={siteConfig.links.personalSite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-background hover:bg-accent transition-colors text-sm font-medium"
              >
                Personal Website
              </a>
            </div>
          </div>
        </section>

        {/* Biblical Women Section */}
        <section className="rounded-lg border bg-card p-8">
          <h2 className="text-2xl font-bold mb-4">ስለ መጽሐፍ ቅዱስ ሴቶች</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            መጽሐፍ ቅዱስ ብዙ አስደናቂ ሴቶችን ታሪክ ይዟል። እነዚህም፡
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="text-muted-foreground">• ሔዋን - የመጀመሪያዋ ሴት እና የሕያዋን ሁሉ እናት</div>
            <div className="text-muted-foreground">• ሣራ - የእምነት እናት</div>
            <div className="text-muted-foreground">• ራሔል እና ሊያ - የያዕቆብ ሚስቶች</div>
            <div className="text-muted-foreground">• ሐና - የሳሙኤል እናት</div>
            <div className="text-muted-foreground">• ማርያም - የኢየሱስ እናት</div>
            <div className="text-muted-foreground">• ማርታ እና ማርያም - የኢየሱስ ጓደኞች</div>
          </div>
          <p className="text-muted-foreground leading-relaxed mt-6">
            እያንዳንዱ ታሪክ ልዩ ትምህርቶችን እና መንፈሳዊ እውቀቶችን ይዟል። ስለእነርሱ በማንበብ፣ የራሳችንን
            የእምነት ጉዞ ማጠናከር እንችላለን።
          </p>
        </section>

        {/* Quote Section */}
        <section className="rounded-lg bg-primary/5 border border-primary/20 p-8 text-center">
          <h3 className="text-xl font-bold mb-4">የማጋራት ግብ</h3>
          <blockquote className="text-lg italic text-muted-foreground">
            &ldquo;በመጽሐፍ ቅዱስ የተጻፈው ነገር ሁሉ ትምህርትና ተስፋ እንድንቀሰም የተጻፈ ነው።&rdquo;
          </blockquote>
          <p className="text-sm text-muted-foreground mt-4">- ሮሜ 15:4</p>
        </section>
      </div>
    </div>
  );
}
