// Load footer HTML into the placeholder
fetch("footer.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("footer-placeholder").innerHTML = html;

    // ✅ After footer is loaded, attach submit handler
    const form = document.getElementById("newsletterForm");
    const successMsg = document.getElementById("signupSuccess");

    if (form && successMsg) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        successMsg.classList.add("show");
        successMsg.classList.remove("d-none");

        // Auto-hide after 4 seconds
        setTimeout(() => {
          successMsg.classList.remove("show");
          setTimeout(() => {
            successMsg.classList.add("d-none");
          }, 500); // matches CSS transition
        }, 4000);
      });
    }
  });
