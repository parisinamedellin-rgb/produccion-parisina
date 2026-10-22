// Parisina · Producción — service worker mínimo (22 oct 2026): solo para mostrar notificaciones del sistema
// cuando llega un mensaje a cocina. No guarda nada en caché: la página siempre se carga de internet.
self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type: "window", includeUncontrolled: true}).then(cs => {
    const c = cs.find(x => "focus" in x); if(c) return c.focus();
    return self.clients.openWindow("./");
  }));
});
