(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });

    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 45,
        dots: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 4
            },
            768: {
                items: 6
            },
            992: {
                items: 8
            }
        }
    });

})(jQuery);

// =======================
// Google Sheets Integration
// =======================
const scriptURL = 'https://script.google.com/macros/s/AKfycbzqtarPK_FJ8dgDcQAy6FAh8T8nLY_d4oeyEPLmXtZXMWS5J6B6Xbml-NUhFp1a41-gew/exec';

// ----------- Form 1: Contact Form (List Puasa) -----------
const contactForm = document.forms['contact-form1'];

if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.innerText = "Mengirim...";
        submitBtn.disabled = true;

        fetch(scriptURL, { method: 'POST', body: new FormData(contactForm) })
            .then(() => {
                alert("Terimakasih telah mengelist puasa, jangan mokel ya :D");
                contactForm.reset();
            })
            .catch(error => {
                alert('Terjadi kesalahan, coba lagi nanti.');
                console.error('Error!', error.message);
            })
            .finally(() => {
                submitBtn.innerText = "Kirim";
                submitBtn.disabled = false;
            });
    });
}

// ----------- Form 2: Ruang Aspirasi Form -----------
const ruangAspirasiForm = document.getElementById('aspirasi-form');

if (ruangAspirasiForm) {
    ruangAspirasiForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const submitBtn = ruangAspirasiForm.querySelector('button[type="submit"]');
        submitBtn.innerText = 'Mengirim...';
        submitBtn.disabled = true;

        fetch(scriptURL, {
            method: 'POST',
            body: new FormData(ruangAspirasiForm)
        })
            .then(response => {
                alert('Terima kasih, aspirasi Anda telah terkirim!');
                ruangAspirasiForm.reset();
            })
            .catch(error => {
                alert('Terjadi kesalahan, coba lagi nanti.');
                console.error('Error!', error.message);
            })
            .finally(() => {
                submitBtn.innerText = 'Kirim';
                submitBtn.disabled = false;
            });
    });
}
