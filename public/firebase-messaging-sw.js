importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyD3vDmckB2TAuEYZALyGnExKjOhtivSrD4",
  authDomain: "hello-notification-28963.firebaseapp.com",
  projectId: "hello-notification-28963",
  storageBucket: "hello-notification-28963.appspot.com",
  messagingSenderId: "458516870789",
  appId: "1:458516870789:web:47534baf728615c159dbec",
  measurementId: "G-LP7EX0CKF0",
});
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload.data
  );

  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/logo-fe.png',
    data: {
      redirect_to: payload.data.redirect_to,
      unread_count: payload.data.unread_count
    }
  }
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle on click notification
self.addEventListener('notificationclick', (event) => {
  var promise = new Promise(function(resolve) {
    setTimeout(resolve, 100);
  }).then(function() {
    return clients.openWindow(event.notification.data.redirect_to);
  });
  event.waitUntil(promise)
}, false)

// Handle show unread count in webapp
self.addEventListener('push', (event) => {
  let promises = [];
  if ('setAppBadge' in self.navigator) {
    const badgeCount = event.data.json().data.unread_count
    const promise = self.navigator.setAppBadge(badgeCount)
    promises.push(promise)
  }
  event.waitUntil(Promise.all(promises))
})
