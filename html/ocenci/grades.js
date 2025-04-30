document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const sidebar = document.querySelector('.sidebar');
  const gradesTable = document.querySelector('.grades table');
  const gradesBody = gradesTable.querySelector('tbody');
  const modal = document.getElementById('modal');
  const editBtn = document.getElementById('edit-grades-btn');
  const closeBtn = document.querySelector('.close-modal');
  const editContainer = document.getElementById('editable-grades');
  const saveBtn = document.getElementById('save-grades-btn');
  let gradesData = [];

  // Toggle sidebar
  menuBtn.addEventListener('click', () => sidebar.classList.toggle('active'));

  // Build HTML table from data
  function buildRows(data, editable) {
    return data
      .map(row => {
        const cells = row
          .map((cell, i) => {
            if (i === 0) return `<td>${cell}</td>`;
            const content = `<td ${editable ? 'contenteditable' : ''}>${cell}</td>`;
            return content;
          })
          .join('');
        return `<tr>${cells}</tr>`;
      })
      .join('');
  }

  // Load and render main table
  async function loadGrades() {
    const text = await fetch('grades.csv').then(r => r.text());
    const lines = text.trim().split('\n').slice(1);
    gradesData = lines.map(line => line.split(','));
    gradesBody.innerHTML = buildRows(gradesData, false);
  }

  // Open modal with editable table
  editBtn.addEventListener('click', () => {
    editContainer.innerHTML = `
      <h3>Введите оценки от 1 до 5:</h3>
      <table>
        <tbody>${buildRows(gradesData, true)}</tbody>
      </table>
    `;
    // Attach validation
    editContainer.querySelectorAll('td[contenteditable]').forEach(td => {
      td.addEventListener('blur', () => {
        if (!/^[1-5]$/.test(td.textContent.trim())) {
          td.textContent = '';
          td.style.border = '2px solid red';
          setTimeout(() => td.style.border = '', 1500);
          alert('Введите число от 1 до 5');
        }
      });
    });
    modal.style.display = 'block';
  });

  // Close modal
  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // Save changes and download CSV
  saveBtn.addEventListener('click', () => {
    const rows = Array.from(editContainer.querySelectorAll('tbody tr')).map(tr =>
      Array.from(tr.children).map(td => td.textContent.trim())
    );
    const csvContent = ['Ученик,Математика,Русский,Физика,Химия', ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'grades.csv';
    link.click();
    modal.style.display = 'none';
    loadGrades();
  });

  // Initial load
  loadGrades();
});