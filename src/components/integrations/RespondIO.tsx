import { useEffect } from 'react';

export default function RespondIO({
  cId = 'c4efdb49fca2257b1a2cfcff1f9741f',
  enabled = true,
  loadStrategy = 'idle' // 'idle' | 'delay' | 'immediate'
}: { cId?: string; enabled?: boolean; loadStrategy?: 'idle' | 'delay' | 'immediate' }) {
  useEffect(() => {
    if (!enabled) return;
    if (document.getElementById('respondio__widget')) return; // prevent duplicates

    // Cleanup function for hot reloads
    const cleanup = () => {
      const existingScript = document.getElementById('respondio__widget');
      if (existingScript) {
        existingScript.remove();
      }
      // Also remove any widget containers that might be left behind
      const widgets = document.querySelectorAll('[id*="respond-io"], [class*="respond-io"], [data-respond-io]');
      widgets.forEach(widget => widget.remove());
    };

    const load = () => {
      if (document.getElementById('respondio__widget')) return;
      
      console.log('🔧 RespondIO: Loading widget with cId:', cId);
      
      const s = document.createElement('script');
      s.id = 'respondio__widget';
      s.src = `https://cdn.respond.io/webchat/widget/widget.js?cId=${encodeURIComponent(cId)}`;
      s.async = true; // non-blocking
      
      // Add error handling
      s.onload = () => {
        console.log('✅ RespondIO: Script loaded successfully');
        // Check if widget initialized after a short delay
        setTimeout(() => {
          const widget = document.querySelector('[id*="respond-io"], [class*="respond-io"], [data-respond-io]');
          if (widget) {
            console.log('✅ RespondIO: Widget found in DOM');
          } else {
            console.warn('⚠️ RespondIO: Widget script loaded but no widget found in DOM. Check cId validity.');
          }
        }, 2000);
      };
      
      s.onerror = (error) => {
        console.error('❌ RespondIO: Script failed to load', error);
      };
      
      document.body.appendChild(s);
    };

    // Respect reduced motion for users who prefer less "busy" UIs
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    if (loadStrategy === 'immediate' || prefersReduced) {
      load();
    } else if ('requestIdleCallback' in window && loadStrategy === 'idle') {
      (window as any).requestIdleCallback(load, { timeout: 2000 });
    } else if (loadStrategy === 'delay') {
      setTimeout(load, 1200);
    } else {
      // fallback: idle via rAF chain
      const id = requestAnimationFrame(() => requestAnimationFrame(load));
      return () => {
        cancelAnimationFrame(id);
        cleanup();
      };
    }

    // Return cleanup function for component unmount and hot reloads
    return cleanup;
  }, [cId, enabled, loadStrategy]);

  return null; // no DOM needed
}
