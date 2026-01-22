// ===== Навигация =====
$("#nav-sandwich").on("click", () => {
  $(".nav").addClass("active");
  $(".nav-overlay").addClass("active");
});

$("#close-nav, #nav-overlay").on("click", () => {
  $(".nav").removeClass("active");
  $(".nav-overlay").removeClass("active");
});

// ===== FAQ =====
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

// ===== Плавный скролл =====
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

// ===== Смена стиля хедера при скролле =====
window.addEventListener('scroll', function () {
  const scrollPosition = window.scrollY;
  if (scrollPosition > 50) {
    $(".header").addClass("scroll");
  } else {
    $(".header").removeClass("scroll");
  }
});

// ===== Сброс формы =====
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

// Функция подсветки активной карточки для мобилки
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

// Скролл для мобильной версии (остается как было)
slider.addEventListener('scroll', () => {
  if (isDesktop()) return; // десктоп не трогаем
  window.requestAnimationFrame(updateActiveCardMobile);
});

// Инициализация мобилки при загрузке
if (!isDesktop()) {
  updateActiveCardMobile();
}

// ===== ДЕСKTOP =====
cards.forEach(card => {
  card.addEventListener('click', () => {
    if (!isDesktop()) return;

    // 1️⃣ Снимаем active со всех, ставим на кликнутую
    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    // 2️⃣ Проверяем, видна ли карточка полностью
    const sliderRect = slider.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    // Если карточка выходит за левый край
    if (cardRect.left < sliderRect.left) {
      slider.scrollBy({
        left: cardRect.left - sliderRect.left - 20, // 20px отступ
        behavior: 'smooth'
      });
    }
    // Если карточка выходит за правый край
    else if (cardRect.right > sliderRect.right) {
      slider.scrollBy({
        left: cardRect.right - sliderRect.right + 20,
        behavior: 'smooth'
      });
    }
    // Иначе — уже видна, прокрутка не нужна
  });
});


