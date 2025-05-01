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
    openBtn.addEventListener('click', () => modal.classList.add('active'));

    // закрыть по ×
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));

    // закрыть по фону
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.remove('active');
    });
  } else {
    console.warn('Modal или кнопка не найдены. Проверь ID/class.');
  }
});
