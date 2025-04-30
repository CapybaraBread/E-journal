document.addEventListener('DOMContentLoaded', () => {
  // Sidebar toggle
  const menuBtn = document.querySelector('.menu-btn');
  const sidebar = document.querySelector('.sidebar');
  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

  // Данные классов для главной страницы
  const classesData = [
    { name: '7А', count: 25, teacher: 'Иванова Е.В.' },
    { name: '7Б', count: 28, teacher: 'Петрова О.С.' },
    { name: '8А', count: 27, teacher: 'Сидорова А.М.' },
    { name: '8Б', count: 26, teacher: 'Кузнецова Н.В.' }
  ];

  // Заполняем секцию классов
  const classesContainer = document.getElementById('classes-container');
  classesData.forEach(({ name, count, teacher }) => {
    const card = document.createElement('div');
    card.className = 'class-card';
    card.innerHTML = `
      <h3>${name} класс</h3>
      <div class="teacher-name">Кл. рук.: ${teacher}</div>
      <span class="count-badge">${count} учени${count % 10 === 1 && count !== 11 ? 'к' : 'ков'}</span>
    `;
    classesContainer.appendChild(card);
  });

  // ... any existing grades fetching or modal logic goes here ...
});