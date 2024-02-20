importScripts(
  "https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js"
);


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
  // console.log(
  //   "[firebase-messaging-sw.js] Received background message ",
  //   payload
  // );
  // // Customize notification here
  // const notificationTitle = payload.notification.title;
  // const notificationOptions = {
  //   body: payload.notification.body,
  // };

  // if (payload.notification.image) {
  //   notificationOptions.image = payload.notification.image;
  // }

  // self.registration.showNotification(notificationTitle, notificationOptions);
  setTimeout(() => {
    const noti = new Notification(payload.notification.title, {
      body: payload.notification.body,
      icon: require('@/assets/logo-fe.png')
    })

    noti.addEventListener('click', (event) => {
      console.log('click', event);
      
      router.push(sessionStorage.getItem('url_redirect'))
      sessionStorage.removeItem('url_redirect')
    })
  }, 1000);
});

