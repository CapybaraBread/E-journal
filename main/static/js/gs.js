document.addEventListener('DOMContentLoaded', () => {
  // Sidebar toggle
  const menuBtn = document.querySelector('.menu-btn');
  const sidebar = document.querySelector('.sidebar');
  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

  // Modal elements
  const openBtn    = document.getElementById('add-class-btn');
  const modal      = document.getElementById('modal');
  const closeBtn   = modal.querySelector('.close-modal');
  const saveBtn    = document.getElementById('save-class-btn');
  const form       = document.getElementById('add-class-form');
  const inpName    = document.getElementById('class-name');
  const inpTeacher = document.getElementById('teacher-name');

  // Open modal
  openBtn.addEventListener('click', () => {
    modal.classList.add('active');
  });

  // Close modal by × button
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  // Close by clicking outside content
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });


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