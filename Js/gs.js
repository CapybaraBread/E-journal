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

  // Save form (only validation + close)
  saveBtn.addEventListener('click', e => {
    e.preventDefault();

    const name    = inpName.value.trim();
    const teacher = inpTeacher.value.trim();

    // Validation
    if (!name || !teacher) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    // TODO: здесь можешь шлёпнуть запрос в БД или другую логику

    // Сброс и закрытие
    form.reset();
    modal.classList.remove('active');
  });
});