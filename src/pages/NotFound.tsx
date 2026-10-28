import { Link } from 'react-router-dom'
import { useSeo } from '@/lib/seo'
import { Button } from '@/components/ui/Button'
import { SegmentDisplay } from '@/components/instrument/Segment'

export default function NotFound() {
  useSeo({
    title: 'Page not found',
    description: 'The page you are looking for does not exist. Head back to the VISRONIX homepage.',
    path: '/404',
  })

  return (
    <section className="flex min-h-[80svh] items-center">
      <div className="container-x py-32 text-center">
        <SegmentDisplay
          value="404"
          cells={3}
          height={72}
          label="Error 404 — page not found"
          className="mx-auto"
        />
        <h1 className="display mt-8 max-w-xl mx-auto">This circuit doesn't connect.</h1>
        <p className="lead mt-4 max-w-md mx-auto">
          The page you are looking for doesn't exist or has moved.
        </p>
        <div className="mt-9 flex justify-center gap-3">
          <Button to="/">Back to home</Button>
          <Button to="/contact" variant="outline">
            Contact us
          </Button>
        </div>
        <p className="data-xs mt-8 text-dim">
          OR EXPLORE{' '}
          <Link to="/agrinex" className="text-cyan hover:underline">
            AGRINEX
          </Link>
          ,{' '}
          <Link to="/stem-education" className="text-cyan hover:underline">
            STEM PROGRAMMES
          </Link>{' '}
          OR{' '}
          <Link to="/electronic-components" className="text-cyan hover:underline">
            THE COMPONENTS STORE
          </Link>
        </p>
      </div>
    </section>
  )
}
