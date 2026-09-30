/* =========================================================
   HADI & RIYA
   PREMIUM FAIRY TALE WEDDING
   SCRIPT.JS
========================================================= */

"use strict";


/* =========================================================
   01. CONFIGURATION
========================================================= */

const CONFIG = {

    /* =====================================================
       GANTI DATA ACARA DI SINI
    ====================================================== */

    weddingDate:
        "2026-12-12T11:00:00+07:00",

    /* =====================================================
       GANTI DATA REKENING DI SINI
    ====================================================== */

    accountNumber:
        "1234567890",

    accountName:
        "Hadianto Kurniawan Tan",

    /* =====================================================
       JUMLAH GALERI
    ====================================================== */

    galleryImages: [

        "assets/images/gallery1.jpg",
        "assets/images/gallery2.jpg",
        "assets/images/gallery3.jpg",
        "assets/images/gallery4.jpg",
        "assets/images/gallery5.jpg",
        "assets/images/gallery6.jpg"

    ]

};


/* =========================================================
   02. DOM
========================================================= */

const body =
    document.body;

const pageLoader =
    document.getElementById("page-loader");

const openingScreen =
    document.getElementById("opening-screen");

const openInvitation =
    document.getElementById("openInvitation");

const cinematicTransition =
    document.getElementById("cinematic-transition");

const mainContent =
    document.getElementById("main-content");

const music =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");

const starField =
    document.getElementById("star-field");

const particleField =
    document.getElementById("particle-field");

const closingParticles =
    document.getElementById("closingParticles");


/* =========================================================
   03. PAGE LOADING
========================================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                pageLoader.classList.add("loaded");

            },
            700
        );

    }
);


/* =========================================================
   04. PREVENT SCROLL BEFORE OPENING
========================================================= */

body.classList.add("locked");


/* =========================================================
   05. CREATE STARS
========================================================= */

function createStars() {

    if (!starField) return;

    const amount =
        window.innerWidth < 600
            ? 55
            : 100;

    const fragment =
        document.createDocumentFragment();

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const star =
            document.createElement("span");

        star.className =
            "star";

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        star.style.setProperty(
            "--duration",
            `${2 + Math.random() * 5}s`
        );

        star.style.animationDelay =
            `${Math.random() * 5}s`;

        fragment.appendChild(star);
    }

    starField.appendChild(fragment);
}

createStars();


/* =========================================================
   06. CREATE GOLD PARTICLES
========================================================= */

function createParticles(
    container,
    amount = 30
) {

    if (!container) return;

    const fragment =
        document.createDocumentFragment();

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement("span");

        particle.className =
            "particle";

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.top =
            `${80 + Math.random() * 30}%`;

        particle.style.setProperty(
            "--duration",
            `${7 + Math.random() * 10}s`
        );

        particle.style.setProperty(
            "--drift",
            `${-100 + Math.random() * 200}px`
        );

        particle.style.animationDelay =
            `${Math.random() * 10}s`;

        particle.style.transform =
            `scale(${.5 + Math.random()})`;

        fragment.appendChild(particle);
    }

    container.appendChild(fragment);
}

createParticles(
    particleField,
    window.innerWidth < 600 ? 25 : 50
);

createParticles(
    closingParticles,
    window.innerWidth < 600 ? 18 : 35
);


/* =========================================================
   07. OPEN INVITATION
========================================================= */

let invitationOpened = false;

openInvitation.addEventListener(
    "click",
    async () => {

        if (invitationOpened) return;

        invitationOpened =
            true;

        /* tombol ditekan */
        openInvitation.classList.add(
            "button-pressed"
        );

        /* transition muncul */
        cinematicTransition.classList.add(
            "active"
        );

        /* musik mulai setelah user interaction */
        startMusic();

        /* sedikit jeda cinematic */
        await wait(900);

        /* opening mulai menghilang */
        openingScreen.style.opacity =
            "0";

        openingScreen.style.transform =
            "scale(1.08)";

        await wait(600);

        /* curtain membuka */
        cinematicTransition.classList.add(
            "opened"
        );

        await wait(1000);

        /* hide opening */
        openingScreen.style.visibility =
            "hidden";

        openingScreen.style.pointerEvents =
            "none";

        cinematicTransition.classList.remove(
            "active"
        );

        cinematicTransition.classList.remove(
            "opened"
        );

        /* aktifkan scroll */
        body.classList.remove(
            "locked"
        );

        body.style.overflowY =
            "auto";

        /* tampilkan music button */
        musicButton.classList.add(
            "show"
        );

        /* reveal hero */
        revealHero();

        /* scroll sedikit ke hero */
        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }
);


/* =========================================================
   08. WAIT HELPER
========================================================= */

function wait(ms) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                ms
            )
    );

}


/* =========================================================
   09. REVEAL HERO
========================================================= */

function revealHero() {

    const heroElements =
        document.querySelectorAll(
            "#hero .reveal"
        );

    heroElements.forEach(
        (element, index) => {

            setTimeout(
                () => {

                    element.classList.add(
                        "visible"
                    );

                },
                250 + index * 180
            );

        }
    );

}


/* =========================================================
   10. MUSIC
========================================================= */

let musicPlaying = false;

async function startMusic() {

    try {

        music.volume =
            0;

        await music.play();

        musicPlaying =
            true;

        musicButton.classList.add(
            "playing"
        );

        fadeMusicIn();

    } catch (error) {

        console.log(
            "Music requires user interaction."
        );

    }

}


function fadeMusicIn() {

    let volume =
        0;

    const fade =
        setInterval(
            () => {

                volume += .03;

                music.volume =
                    Math.min(
                        volume,
                        .55
                    );

                if (volume >= .55) {

                    clearInterval(
                        fade
                    );

                }

            },
            100
        );

}


function stopMusic() {

    music.pause();

    musicPlaying =
        false;

    musicButton.classList.remove(
        "playing"
    );

}


musicButton.addEventListener(
    "click",
    async () => {

        if (musicPlaying) {

            stopMusic();

            return;
        }

        await startMusic();

    }
);


/* =========================================================
   11. SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: .12,
            rootMargin:
                "0px 0px -60px 0px"
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   12. COUNTDOWN
========================================================= */

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");


function updateCountdown() {

    const target =
        new Date(
            CONFIG.weddingDate
        ).getTime();

    const now =
        Date.now();

    const distance =
        target - now;

    if (distance <= 0) {

        daysElement.textContent =
            "00";

        hoursElement.textContent =
            "00";

        minutesElement.textContent =
            "00";

        secondsElement.textContent =
            "00";

        return;
    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );

    const seconds =
        Math.floor(
            (
                distance %
                (1000 * 60)
            ) /
            1000
        );


    daysElement.textContent =
        formatNumber(days);

    hoursElement.textContent =
        formatNumber(hours);

    minutesElement.textContent =
        formatNumber(minutes);

    secondsElement.textContent =
        formatNumber(seconds);

}


function formatNumber(number) {

    return String(number)
        .padStart(2, "0");

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   13. PARALLAX
========================================================= */

let ticking =
    false;

function updateParallax() {

    const scrollY =
        window.scrollY;

    const parallaxItems =
        document.querySelectorAll(
            ".hero-background, .opening-bg, .closing-bg"
        );

    parallaxItems.forEach(
        element => {

            const rect =
                element
                    .parentElement
                    .getBoundingClientRect();

            const center =
                rect.top +
                rect.height / 2;

            const viewportCenter =
                window.innerHeight / 2;

            const distance =
                center -
                viewportCenter;

            const movement =
                distance * -0.025;

            element.style.transform =
                `scale(1.08) translateY(${movement}px)`;

        }
    );

    ticking =
        false;
}


window.addEventListener(
    "scroll",
    () => {

        if (!ticking) {

            window.requestAnimationFrame(
                updateParallax
            );

            ticking =
                true;
        }

    },
    {
        passive: true
    }
);


/* =========================================================
   14. GALLERY
========================================================= */

const galleryItems =
    Array.from(
        document.querySelectorAll(
            ".gallery-item"
        )
    );

const lightbox =
    document.getElementById(
        "lightbox"
    );

const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );

const lightboxCounter =
    document.getElementById(
        "lightboxCounter"
    );

const lightboxClose =
    document.getElementById(
        "lightboxClose"
    );

const lightboxPrev =
    document.getElementById(
        "lightboxPrev"
    );

const lightboxNext =
    document.getElementById(
        "lightboxNext"
    );

let currentGalleryIndex =
    0;


galleryItems.forEach(
    (item, index) => {

        item.addEventListener(
            "click",
            () => {

                openLightbox(
                    index
                );

            }
        );

    }
);


function openLightbox(index) {

    currentGalleryIndex =
        index;

    const image =
        galleryItems[
            currentGalleryIndex
        ].dataset.image;

    lightboxImage.src =
        image;

    lightboxCounter.textContent =
        `${formatNumber(currentGalleryIndex + 1)} / ${formatNumber(galleryItems.length)}`;

    lightbox.classList.add(
        "active"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";

}


function closeLightbox() {

    lightbox.classList.remove(
        "active"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    if (
        !body.classList.contains(
            "locked"
        )
    ) {

        document.body.style.overflow =
            "";

    }

}


function showNext() {

    currentGalleryIndex =
        (
            currentGalleryIndex + 1
        ) %
        galleryItems.length;

    changeLightboxImage();

}


function showPrevious() {

    currentGalleryIndex =
        (
            currentGalleryIndex -
            1 +
            galleryItems.length
        ) %
        galleryItems.length;

    changeLightboxImage();

}


function changeLightboxImage() {

    lightboxImage.style.opacity =
        "0";

    lightboxImage.style.transform =
        "scale(.96)";

    setTimeout(
        () => {

            lightboxImage.src =
                galleryItems[
                    currentGalleryIndex
                ].dataset.image;

            lightboxCounter.textContent =
                `${formatNumber(currentGalleryIndex + 1)} / ${formatNumber(galleryItems.length)}`;

            lightboxImage.onload =
                () => {

                    lightboxImage.style.opacity =
                        "1";

                    lightboxImage.style.transform =
                        "scale(1)";

                };

        },
        180
    );

}


lightboxClose.addEventListener(
    "click",
    closeLightbox
);

lightboxNext.addEventListener(
    "click",
    showNext
);

lightboxPrev.addEventListener(
    "click",
    showPrevious
);

lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);


/* =========================================================
   15. KEYBOARD LIGHTBOX
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox.classList.contains(
                "active"
            )
        ) {
            return;
        }

        if (
            event.key ===
            "Escape"
        ) {

            closeLightbox();

        }

        if (
            event.key ===
            "ArrowRight"
        ) {

            showNext();

        }

        if (
            event.key ===
            "ArrowLeft"
        ) {

            showPrevious();

        }

    }
);


/* =========================================================
   16. MOBILE SWIPE LIGHTBOX
========================================================= */

let touchStartX =
    0;

let touchEndX =
    0;


lightbox.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0]
                .screenX;

    },
    {
        passive: true
    }
);


lightbox.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0]
                .screenX;

        handleSwipe();

    },
    {
        passive: true
    }
);


function handleSwipe() {

    const distance =
        touchEndX -
        touchStartX;

    if (
        Math.abs(distance) < 50
    ) {
        return;
    }

    if (distance < 0) {

        showNext();

    } else {

        showPrevious();

    }

}


/* =========================================================
   17. COPY ACCOUNT
========================================================= */

const copyAccountButton =
    document.getElementById(
        "copyAccount"
    );

const accountNumber =
    document.getElementById(
        "accountNumber"
    );

const toast =
    document.getElementById(
        "toast"
    );


/* tampilkan nomor dari CONFIG */

if (accountNumber) {

    accountNumber.textContent =
        CONFIG.accountNumber;

}


copyAccountButton.addEventListener(
    "click",
    async () => {

        const number =
            CONFIG.accountNumber;

        try {

            await navigator.clipboard.writeText(
                number
            );

            showToast(
                "Nomor rekening berhasil disalin"
            );

        } catch (error) {

            fallbackCopy(
                number
            );

        }

    }
);


function fallbackCopy(text) {

    const textarea =
        document.createElement(
            "textarea"
        );

    textarea.value =
        text;

    textarea.style.position =
        "fixed";

    textarea.style.opacity =
        "0";

    document.body.appendChild(
        textarea
    );

    textarea.select();

    try {

        document.execCommand(
            "copy"
        );

        showToast(
            "Nomor rekening berhasil disalin"
        );

    } catch (error) {

        showToast(
            "Silakan salin nomor rekening secara manual"
        );

    }

    textarea.remove();

}


/* =========================================================
   18. TOAST
========================================================= */

let toastTimer;

function showToast(message) {

    const text =
        toast.querySelector("p");

    text.textContent =
        message;

    toast.classList.add(
        "show"
    );

    clearTimeout(
        toastTimer
    );

    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );

}


/* =========================================================
   19. WEDDING WISHES
========================================================= */

const wishForm =
    document.getElementById(
        "wishForm"
    );

const wishList =
    document.getElementById(
        "wishList"
    );


let wishes =
    loadWishes();


renderWishes();


wishForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const name =
            document
                .getElementById(
                    "wishName"
                )
                .value
                .trim();

        const message =
            document
                .getElementById(
                    "wishMessage"
                )
                .value
                .trim();

        const attendance =
            document
                .getElementById(
                    "wishAttendance"
                )
                .value;


        if (
            !name ||
            !message ||
            !attendance
        ) {

            showToast(
                "Lengkapi data ucapan terlebih dahulu"
            );

            return;

        }


        const newWish = {

            name:
                name,

            message:
                message,

            attendance:
                attendance,

            date:
                new Date()
                    .toLocaleDateString(
                        "id-ID",
                        {
                            day:
                                "2-digit",

                            month:
                                "short",

                            year:
                                "numeric"
                        }
                    )

        };


        wishes.unshift(
            newWish
        );


        /* simpan di browser */

        saveWishes();


        renderWishes();


        wishForm.reset();


        showToast(
            "Ucapan berhasil ditambahkan"
        );

    }
);


/* =========================================================
   20. SAVE WISHES
========================================================= */

function saveWishes() {

    try {

        localStorage.setItem(
            "hadiRiyaWishes",
            JSON.stringify(
                wishes
            )
        );

    } catch (error) {

        console.log(
            "Local storage unavailable."
        );

    }

}


function loadWishes() {

    try {

        const saved =
            localStorage.getItem(
                "hadiRiyaWishes"
            );

        if (!saved) {

            return [];

        }

        return JSON.parse(
            saved
        );

    } catch (error) {

        return [];

    }

}


/* =========================================================
   21. RENDER WISHES
========================================================= */

function renderWishes() {

    if (!wishList) {
        return;
    }

    wishList.innerHTML =
        "";

    if (
        wishes.length === 0
    ) {

        return;

    }


    wishes
        .slice(0, 10)
        .forEach(
            wish => {

                const card =
                    document.createElement(
                        "article"
                    );

                card.className =
                    "wish-card";


                const name =
                    document.createElement(
                        "strong"
                    );

                name.textContent =
                    wish.name;


                const message =
                    document.createElement(
                        "p"
                    );

                message.textContent =
                    wish.message;


                const info =
                    document.createElement(
                        "span"
                    );

                info.textContent =
                    `${wish.attendance} • ${wish.date}`;


                card.appendChild(
                    name
                );

                card.appendChild(
                    message
                );

                card.appendChild(
                    info
                );


                wishList.appendChild(
                    card
                );

            }
        );

}


/* =========================================================
   22. GALLERY IMAGE ERROR HANDLING
========================================================= */

document
    .querySelectorAll(
        "img"
    )
    .forEach(
        image => {

            image.addEventListener(
                "error",
                () => {

                    image.style.background =
                        "linear-gradient(135deg,#3a2a1b,#17100b)";

                    image.style.objectFit =
                        "cover";

                }
            );

        }
    );


/* =========================================================
   23. PREVENT IMAGE DRAG
========================================================= */

document
    .querySelectorAll(
        "img"
    )
    .forEach(
        image => {

            image.setAttribute(
                "draggable",
                "false"
            );

        }
    );


/* =========================================================
   24. SMOOTH ANCHOR BEHAVIOR
========================================================= */

document.addEventListener(
    "click",
    event => {

        const link =
            event.target.closest(
                'a[href^="#"]'
            );

        if (!link) {
            return;
        }

        const targetId =
            link.getAttribute(
                "href"
            );

        const target =
            document.querySelector(
                targetId
            );

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior:
                "smooth",
            block:
                "start"
        });

    }
);


/* =========================================================
   25. VISIBILITY CHANGE
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            if (
                musicPlaying
            ) {

                music.volume =
                    Math.min(
                        music.volume,
                        .25
                    );

            }

        } else {

            if (
                musicPlaying
            ) {

                music.volume =
                    .55;

            }

        }

    }
);


/* =========================================================
   26. INITIAL STATE
========================================================= */

window.addEventListener(
    "DOMContentLoaded",
    () => {

        /* pastikan main tidak mengganggu opening */

        mainContent.style.visibility =
            "visible";

        /* opening tetap aktif */

        openingScreen.style.opacity =
            "1";

        openingScreen.style.visibility =
            "visible";

        /* music button disembunyikan */

        musicButton.classList.remove(
            "show"
        );

    }
);


/* =========================================================
   27. RESIZE PERFORMANCE
========================================================= */

let resizeTimer;

window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            resizeTimer
        );

        resizeTimer =
            setTimeout(
                () => {

                    /* tidak perlu rebuild
                       particle agar ringan */

                },
                250
            );

    },
    {
        passive: true
    }
);


/* =========================================================
   28. CONSOLE INFO
========================================================= */

console.log(
    "%c HADI & RIYA ",
    "color:#d4af67;font-size:20px;font-family:serif;"
);

console.log(
    "Premium Fairy Tale Wedding Invitation — 12.12.2026"
);
