import { MotionConfig } from 'framer-motion'
import { VideoModalProvider } from './components/VideoModal'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import CategorySection from './sections/CategorySection'
import CourseGrid from './sections/CourseGrid'
import MarqueeBand from './sections/MarqueeBand'
import Testimonials from './sections/Testimonials'
import FeatureSplit from './sections/FeatureSplit'
import MediaSection from './sections/MediaSection'
import BootcampSection from './sections/BootcampSection'
import MentorSection from './sections/MentorSection'
import FAQSection from './sections/FAQSection'
import BlogSection from './sections/BlogSection'
import FinalCTA from './sections/FinalCTA'
import Footer from './sections/Footer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <VideoModalProvider>
        <div className="min-h-screen bg-cream">
          <Navbar />
          <main>
            <Hero />
            <CategorySection />
            <CourseGrid />
            <Testimonials />
            <FeatureSplit />
            <MediaSection />
            <BootcampSection />
            <MentorSection />
            <FAQSection />
            <BlogSection />
            <MarqueeBand />
            <FinalCTA />
          </main>
          <Footer />
        </div>
      </VideoModalProvider>
    </MotionConfig>
  )
}
