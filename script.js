<<main>
  <section>
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      
      <!-- نموذج الإرسال المحدث -->
      <form id="contactForm">
        <input type="hidden" name="access_key" value="4f31ae99-1d38-44b8-85e6-d3059043dc64">
        <input type="hidden" name="subject" value="طلب جديد من موقع شركة سهم">
        <input type="checkbox" name="botcheck" class="hidden" style="display: none;">

        <div style="margin-bottom: 15px;">
          <input type="text" name="الاسم الكامل" placeholder="الاسم الكامل" required style="width: 100%; padding: 10px;">
        </div>

        <div style="margin-bottom: 15px;">
          <input type="email" name="البريد الإلكتروني" placeholder="البريد الإلكتروني" required style="width: 100%; padding: 10px;">
        </div>
        
        <div style="margin-bottom: 15px;">
          <select name="نوع الطلب" required style="width: 100%; padding: 10px;">
            <option value="">نوع الطلب</option>
            <option value="تشغيل منشأة رياضية">تشغيل منشأة رياضية</option>
            <option value="استشارات رياضية">استشارات رياضية</option>
            <option value="تشغيل أكاديمية رياضية">تشغيل أكاديمية رياضية</option>
            <option value="تنظيم فعالية رياضية">تنظيم فعالية رياضية</option>
            <option value="شراكة أو تعاون">شراكة أو تعاون</option>
            <option value="استفسار آخر">استفسار آخر</option>
          </select>
        </div>

        <div style="margin-bottom: 15px;">
          <textarea name="تفاصيل الطلب" rows="4" placeholder="اكتب تفاصيل طلبك" required style="width: 100%; padding: 10px;"></textarea>
        </div>

        <button class="button" type="submit" id="submitBtn" style="width: 100%; padding: 12px; cursor: pointer;">إرسال الطلب</button>
        
        <!-- مكان ظهور رسالة النجاح أو الخطأ -->
        <div id="formResult" style="margin-top: 15px; font-weight: bold; text-align: center;"></div>
      </form>

    </div>
  </section>
</main>

<!-- كود البرمجة المتكامل (JavaScript) -->
<script>
  // 1. التحكم في القائمة الجانبية للموبايل
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.querySelector(".desktop-nav");
  menuToggle?.addEventListener("click", () => {
    const opened = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(opened));
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

  // 2. تأثيرات الظهور عند التمرير (Reveal on Scroll)
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  // 3. شريط تقدم التمرير في الأعلى
  const progress = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) {
      progress.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + "%";
    }
  }, { passive: true });

  // 4. تحديث السنة تلقائياً في حقوق النشر
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 5. إرسال النموذج عبر Web3Forms بدون تحديث الصفحة
  const form = document.getElementById('contactForm');
  const result = document.getElementById('formResult');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    result.style.color = '#fff';
    result.innerHTML = "جاري الإرسال...";

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let jsonResponse = await response.json();
        if (response.status == 200) {
            result.style.color = '#4BB543'; // لون أخضر للنجاح
            result.innerHTML = "تم إرسال طلبك بنجاح! شكرًا لتواصلك معنا.";
            form.reset(); // إعادة ضبط حقول النموذج
        } else {
            console.log(jsonResponse);
            result.style.color = '#ff3333';
            result.innerHTML = jsonResponse.message || "حدث خطأ ما.";
        }
    })
    .catch(error => {
        console.log(error);
        result.style.color = '#ff3333';
        result.innerHTML = "حدث خطأ في الاتصال، يرجى المحاولة لاحقاً.";
    });
  });
</script>
