document.addEventListener('DOMContentLoaded', () => {
  // Modal elements
  const openBtn    = document.getElementById('add-stydent-btn');
  const modal      = document.getElementById('modal-stydent');
  const closeBtn   = modal.querySelector('.close-modal');
  const saveBtn    = document.getElementById('save-stydent-btn');
  const form       = document.getElementById('add-stydent-form');
  const inpName    = document.getElementById('class-name-stydent');
  const inpTeacher = document.getElementById('stydent-name');

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