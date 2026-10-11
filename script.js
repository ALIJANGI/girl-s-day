
const heartSeal = document.getElementById("heartSeal");
const letter = document.getElementById("letter");
const notePaper = document.getElementById("notePaper");
const pageOverlay = document.getElementById("pageOverlay");

let started = false;

heartSeal.addEventListener("click", () => {
    if (started) return;
    started = true;

    // مرحله ۱: در پاکت باز می‌شود.
    letter.classList.add("open");

    // مرحله ۲: پس از باز شدن در، کاغذ در جای فعلی ثابت می‌ماند.
    setTimeout(() => {
        const rect = notePaper.getBoundingClientRect();

        // موقعیت کاغذ را بدون پرش به مختصات صفحه منتقل می‌کنیم.
        notePaper.style.transition = "none";
        notePaper.style.position = "fixed";
        notePaper.style.left = `${rect.left}px`;
        notePaper.style.top = `${rect.top}px`;
        notePaper.style.width = `${rect.width}px`;
        notePaper.style.height = `${rect.height}px`;
        notePaper.style.margin = "0";
        notePaper.style.transform = "none";
        notePaper.style.zIndex = "100";

        document.body.appendChild(notePaper);
        notePaper.classList.add("detached");

        // تثبیت موقعیت اولیه کاغذ
        notePaper.getBoundingClientRect();

        // مرحله ۳: پاکت محو می‌شود.
        letter.classList.add("finished");

        setTimeout(() => {
            // محو شدن پاکت تمام شده؛ پس‌زمینه تار می‌شود.
            pageOverlay.classList.add("active");

            // تنظیم انتقال کاغذ به مرکز
            notePaper.style.transition = [
                "left 1s cubic-bezier(.22, .75, .2, 1)",
                "top 1s cubic-bezier(.22, .75, .2, 1)",
                "width 1s cubic-bezier(.22, .75, .2, 1)",
                "height 1s cubic-bezier(.22, .75, .2, 1)",
                "transform 1s cubic-bezier(.22, .75, .2, 1)",
                "box-shadow 1s ease"
            ].join(", ");

            // مرحله ۴: کاغذ به مرکز صفحه می‌آید و بزرگ می‌شود.
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    notePaper.classList.add("show");

                    notePaper.style.left = "50%";
                    notePaper.style.top = "50%";
                    notePaper.style.width = "min(620px, 88vw)";
                    notePaper.style.height = "min(78dvh, 680px)";
                    notePaper.style.transform = "translate(-50%, -50%)";

                    // مرحله ۵: پس از اتمام حرکت، متن نمایش داده می‌شود.
                    setTimeout(() => {
                        notePaper.classList.add("text-visible");
                    }, 1050);
                });
            });

        }, 700);

    }, 1000);
});
