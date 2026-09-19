export type PortalGuideKind = 'scheme' | 'scholarship';

export interface PortalGuideRequest {
  title: string;
  portalName: string;
  url: string;
  kind: PortalGuideKind;
}

export function openPortalWithGuide(request: PortalGuideRequest) {
  const detail = {
    ...request,
    openedAt: new Date().toISOString(),
  };

  try {
    sessionStorage.setItem('udaan_portal_guide', JSON.stringify(detail));
  } catch {
    // Storage can be unavailable in private/restricted browser contexts.
  }

  // Let the Udaan chat UI react to this event when guide-mode listeners are enabled.
  window.dispatchEvent(new CustomEvent('udaan:portal-guide', { detail }));

  // Government portals should open separately so Udaan remains available for guidance.
  window.open(request.url, '_blank', 'noopener,noreferrer');
}
