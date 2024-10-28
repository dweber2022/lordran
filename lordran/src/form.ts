const formSubmit: HTMLElement | null = document.querySelector("form button");
formSubmit?.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Thank you for your interest!");
});

