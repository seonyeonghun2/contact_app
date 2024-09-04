window.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector("#contact_form");
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3001/api/contact", {
      method: "POST",
      body: new FormData(contactForm),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          location.reload();
        }
      })
      .catch((error) => {
        console.log("에러메세지 : " + error);
      });
  });
});
