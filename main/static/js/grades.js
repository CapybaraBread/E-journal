document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Sidebar ---------- */
  const menuBtn = document.querySelector('.menu-btn');
  const sidebar = document.querySelector('.sidebar');
  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  }

  /* ---------- Modal «Добавить оценки» ---------- */
  const openBtn  = document.getElementById('add-grade-btn'); // кнопка
  const modal    = document.getElementById('modal');           // фон
  const closeBtn = modal ? modal.querySelector('.close-modal') : null;

  if (openBtn && modal && closeBtn) {
    // открыть
    openBtn.addEventListener('click', () => modal.classList.add('open'));

    // закрыть по ×
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));

    // закрыть по фону
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.remove('open');
    });
  } else {
    console.warn('Modal или кнопка не найдены. Проверь ID/class.');
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const btn     = document.getElementById('add-news-btn');
  const form    = document.getElementById('news-form');
  const overlay = document.getElementById('overlay');

  btn.addEventListener('click', () => {
    form.classList.add('active');
    overlay.classList.add('active');
  });

  // кликом по фону — закрыть
  overlay.addEventListener('click', closeModal);

  // по сабмиту (или кнопке «Сохранить») — тоже закрыть
  form.addEventListener('submit', e => {
    closeModal();
  });

  function closeModal() {
    form.classList.remove('active');
    overlay.classList.remove('active');
  }
});
// User profile dropdown toggle
document.addEventListener('DOMContentLoaded', () => {
  const userBtn   = document.getElementById('user-btn');
  const userPanel = document.getElementById('user-panel');

  // Toggle panel on button click
  userBtn.addEventListener('click', e => {
    e.stopPropagation();
    userPanel.classList.toggle('hidden');
  });

  // Close panel when clicking outside
  document.addEventListener('click', e => {
    if (!userPanel.contains(e.target) && !userBtn.contains(e.target)) {
      userPanel.classList.add('hidden');
    }
  });
});
