$("#nav-sandwich").on("click", () => {
  $(".nav").addClass("active");
  $(".nav-overlay").addClass("active");
});

$("#close-nav, #nav-overlay").on("click", () => {
  $(".nav").removeClass("active");
  $(".nav-overlay").removeClass("active");
});

$(".nav-list a").on("click", function () {
  $(".nav").removeClass("active");
  $(".nav-overlay").removeClass("active");
});


$(".faq-el-head").on("click", function () {
  const currentItem = $(this).parent();

  if (currentItem.hasClass("active")) {
    currentItem.removeClass("active");
    currentItem.find(".faq-el-body").slideUp();
    return;
  }

  $(".faq-el").removeClass("active");
  $(".faq-el-body").slideUp();

  currentItem.addClass("active");
  currentItem.find(".faq-el-body").slideDown();
});


$('a[href^="#"]').on('click', function() {
  let href = $(this).attr('href');

  if ($(href).length) {
    $('html, body').animate({
      scrollTop: $(href).offset().top - $(".header").height() - 50
    }, 400);
  }

  return false;
});

if (location.hash) {
  $('html,body').animate({scrollTop: $(location.hash).offset().top - $(".header").height() - 50}, 400);
}


window.addEventListener('scroll', function () {
  const scrollPosition = window.scrollY;
  if (scrollPosition > 50) {
    $(".header").addClass("scroll");
  } else {
    $(".header").removeClass("scroll");
  }
});


$(".form").on("submit", function () {
  const form = this;
  setTimeout(() => {
    form.reset();
  }, 100);
});

const slider = document.querySelector('.reviews-slider');
const cards = document.querySelectorAll('.review-card');

function isDesktop() {
  return window.innerWidth >= 600;
}


function updateActiveCardMobile() {
  const sliderCenter = slider.scrollLeft + slider.offsetWidth / 2;

  cards.forEach(card => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    if (Math.abs(sliderCenter - cardCenter) < card.offsetWidth / 2) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}


slider.addEventListener('scroll', () => {
  if (isDesktop()) return; 
  window.requestAnimationFrame(updateActiveCardMobile);
});


if (!isDesktop()) {
  updateActiveCardMobile();
}


cards.forEach(card => {
  card.addEventListener('click', () => {
    if (!isDesktop()) return;

    
    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    
    const sliderRect = slider.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    
    if (cardRect.left < sliderRect.left) {
      slider.scrollBy({
        left: cardRect.left - sliderRect.left - 20, 
        behavior: 'smooth'
      });
    }
    
    else if (cardRect.right > sliderRect.right) {
      slider.scrollBy({
        left: cardRect.right - sliderRect.right + 20,
        behavior: 'smooth'
      });
    }
    
  });
});


