document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-btn');
    const sidebar = document.querySelector('.sidebar');
    menuBtn.addEventListener('click', () => sidebar.classList.toggle('active'));
  
    const gradesTableBody = document.querySelector('.grades table tbody');
    const modal = document.getElementById('modal');
    const editGradesBtn = document.getElementById('edit-grades-btn');
    const closeModal = document.querySelector('.close-modal');
    const editableGrades = document.getElementById('editable-grades');
    const saveGradesBtn = document.getElementById('save-grades-btn');
  
    let gradesData = [];
  
    function renderTable(container, data, editable = false) {
      container.innerHTML = '';
      const table = document.createElement('table');
      const header = `<tr><th>Ученик</th><th>Математика</th><th>Русский</th><th>Физика</th><th>Химия</th></tr>`;
      table.innerHTML = header;
  
      data.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach((cell, i) => {
          const td = document.createElement('td');
          td.textContent = cell;
          if (editable && i > 0) td.contentEditable = true;
          tr.appendChild(td);
        });
        table.appendChild(tr);
      });
  
      container.appendChild(table);
    }
  
    function loadGrades() {
      fetch('grades.csv')
        .then(res => res.text())
        .then(text => {
          gradesData = text.trim().split('\n').slice(1).map(line => line.split(','));
          renderTable(gradesTableBody, gradesData);
        });
    }
  
    editGradesBtn.onclick = () => {
      renderTable(editableGrades, gradesData, true);
      modal.style.display = 'block';
    };
  
    closeModal.onclick = () => modal.style.display = 'none';
    window.onclick = e => e.target == modal ? modal.style.display = 'none' : null;
  
    saveGradesBtn.onclick = () => {
      const updatedRows = editableGrades.querySelectorAll('tr');
      gradesData = Array.from(updatedRows).slice(1).map(row => 
        Array.from(row.children).map(td => td.textContent.trim())
      );
  
      const csv = ['Ученик,Математика,Русский,Физика,Химия', 
        ...gradesData.map(r => r.join(','))].join('\n');
  
      const blob = new Blob([csv], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'grades.csv';
      link.click();
      
      modal.style.display = 'none';
      loadGrades();
    };
  
    loadGrades();
  });
