
const CONTACT_EMAIL = "";

const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".desktop-nav");
menuToggle?.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(opened));
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const progress = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + "%";
}, { passive: true });

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent("طلب جديد عبر موقع SHAM Athletics — " + data.get("type"));
  const body = encodeURIComponent(
    "الاسم: " + data.get("name") + "\n" +
    "البريد: " + data.get("email") + "\n" +
    "نوع الطلب: " + data.get("type") + "\n\n" +
    "التفاصيل:\n" + (data.get("message") || "لا توجد تفاصيل إضافية")
  );
  if (!CONTACT_EMAIL) {
    toast.textContent = "النموذج جاهز، لكن يلزم إضافة بريد SHAM الرسمي في ملف script.js لتفعيل إرسال الطلبات.";
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 5000);
    return;
