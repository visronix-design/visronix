import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'

// Route-level code splitting keeps the initial bundle lean.
const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const StemEducation = lazy(() => import('@/pages/StemEducation'))
const ComponentsStore = lazy(() => import('@/pages/ComponentsStore'))
const IotSolutions = lazy(() => import('@/pages/IotSolutions'))
const EngineeringProjects = lazy(() => import('@/pages/EngineeringProjects'))
const Agrinex = lazy(() => import('@/pages/Agrinex'))
const Research = lazy(() => import('@/pages/Research'))
const Portfolio = lazy(() => import('@/pages/Portfolio'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading page">
      <span className="size-6 animate-spin rounded-full border-2 border-line-strong border-t-cyan" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/stem-education" element={<StemEducation />} />
            <Route path="/electronic-components" element={<ComponentsStore />} />
            <Route path="/iot-solutions" element={<IotSolutions />} />
            <Route path="/engineering-projects" element={<EngineeringProjects />} />
            <Route path="/agrinex" element={<Agrinex />} />
            <Route path="/research" element={<Research />} />
            <Route path="/projects" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
