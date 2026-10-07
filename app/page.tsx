import { CampusMarketSection } from "@/components/home/campus-market-section";
import { CommunitySection } from "@/components/home/community-section";
import { CourseSection } from "@/components/home/course-section";
import { FinalCTA } from "@/components/home/final-cta";
import { FoodSection } from "@/components/home/food-section";
import { HomeExperience } from "@/components/home/home-experience";
import { HomeNav } from "@/components/home/home-nav";
import { ScrollStory } from "@/components/home/scroll-story";
import Hero from "@/components/hero";

export default function HomePage() {
  return (
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
  );
}
