const GA_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

export function initGoogleAnalytics() {
  if (!GA_ID || typeof window === 'undefined' || window.__gaInitialized) return;

  window.__gaInitialized = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    anonymize_ip: true,
    send_page_view: true,
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

export function trackSectionView(sectionId) {
  if (!GA_ID || !window.gtag || !sectionId) return;
  window.gtag('event', 'section_view', {
    page_section: sectionId,
  });
}

export function trackEvent(name, params = {}) {
  if (!GA_ID || !window.gtag) return;
  window.gtag('event', name, params);
}
