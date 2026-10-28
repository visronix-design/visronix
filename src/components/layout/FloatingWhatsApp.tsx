import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { whatsappUrl } from '@/lib/whatsapp'

/**
 * Floating WhatsApp shortcut. Appears after the visitor scrolls past the
 * hero so it never obstructs primary CTAs; hidden while the mobile menu
 * is conceptually open (body scroll locked) to avoid overlap.
 */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={whatsappUrl('Hello VISRONIX Technologies, I would like to know more about your services.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with VISRONIX on WhatsApp (opens in a new tab)"
      className={`fixed bottom-5 right-5 z-30 flex size-13 items-center justify-center border border-accent bg-accent text-on-accent shadow-raise transition-all duration-300 hover:bg-accent-strong ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  )
}
