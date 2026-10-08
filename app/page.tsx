import { cookies } from "next/headers";
import { CampusMarketSection } from "@/components/home/campus-market-section";
import { CommunitySection } from "@/components/home/community-section";
import { CourseSection } from "@/components/home/course-section";
import { FinalCTA } from "@/components/home/final-cta";
import { FoodSection } from "@/components/home/food-section";
import { HomeExperience } from "@/components/home/home-experience";
import { HomeI18nProvider } from "@/components/home/home-i18n";
import { HomeNav } from "@/components/home/home-nav";
import { ScrollStory } from "@/components/home/scroll-story";
import Hero from "@/components/home/hero-portal";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_COOKIE_KEY,
  matchLanguage,
} from "@/lib/i18n/config";

export default async function HomePage() {
  const cookieStore = await cookies();
  const initialLocale =
    matchLanguage(cookieStore.get(LANGUAGE_COOKIE_KEY)?.value) ?? DEFAULT_LANGUAGE;

  return (
    <HomeI18nProvider initialLocale={initialLocale}>
      <main className="home-experience">
        <HomeExperience>
          <HomeNav />
          <Hero />
          <ScrollStory />
          <CourseSection />
          <FoodSection />
          <CampusMarketSection />
          <CommunitySection />
          <FinalCTA />
        </HomeExperience>
      </main>
    </HomeI18nProvider>
  );
}
