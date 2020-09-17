window.addEventListener("beforeinstallprompt", (e) => {
  if (window.$nuxt.$route.path !== "/") {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
  }
});
