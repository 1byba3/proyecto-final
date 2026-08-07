const API_URL = '/books';

// Elementos del DOM
const booksGrid = document.getElementById('books-grid');
const bookForm = document.getElementById('book-form');
const loadingIndicator = document.getElementById('loading');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');

// Campos del formulario
const idInput = document.getElementById('book-id');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const yearInput = document.getElementById('published_year');

let isEditing = false;

// Cargar libros al iniciar
document.addEventListener('DOMContentLoaded', fetchBooks);

// Event Listeners
bookForm.addEventListener('submit', handleFormSubmit);
cancelBtn.addEventListener('click', resetForm);

// Funciones API
async function fetchBooks() {
  try {
    const res = await fetch(API_URL);
    const books = await res.json();
    renderBooks(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    loadingIndicator.textContent = 'Error al cargar los libros.';
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  const bookData = {
    title: titleInput.value,
    author: authorInput.value,
    published_year: yearInput.value ? parseInt(yearInput.value) : null
  };

  try {
    submitBtn.textContent = 'Guardando...';
    submitBtn.disabled = true;

    if (isEditing) {
      const id = idInput.value;
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      });
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      });
    }

    resetForm();
    await fetchBooks();
  } catch (error) {
    console.error('Error saving book:', error);
    alert('Hubo un error al guardar el libro.');
  } finally {
    submitBtn.disabled = false;
  }
}

async function deleteBook(id) {
  if (!confirm('¿Estás seguro de que quieres eliminar este libro?')) return;
  
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    await fetchBooks();
  } catch (error) {
    console.error('Error deleting book:', error);
    alert('Hubo un error al eliminar el libro.');
  }
}

// Funciones UI
function renderBooks(books) {
  loadingIndicator.style.display = 'none';
  booksGrid.innerHTML = '';
  
  if (books.length === 0) {
    booksGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No hay libros guardados aún. ¡Agrega uno arriba!</p>';
    return;
  }

  books.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <div class="book-title">${escapeHTML(book.title)}</div>
      <div class="book-author">por ${escapeHTML(book.author)}</div>
      <div class="book-year">Publicado en: ${book.published_year || 'N/A'}</div>
      <div class="card-actions">
        <button class="btn-edit" onclick="editBook(${book.id}, '${escapeHTML(book.title)}', '${escapeHTML(book.author)}', ${book.published_year})">Editar</button>
        <button class="btn-delete" onclick="deleteBook(${book.id})">Borrar</button>
      </div>
    `;
    booksGrid.appendChild(card);
  });
}

// Hacer globales las funciones para los botones onClick
window.editBook = function(id, title, author, year) {
  isEditing = true;
  idInput.value = id;
  titleInput.value = title;
  authorInput.value = author;
  yearInput.value = year || '';
  
  formTitle.textContent = 'Editar Libro';
  submitBtn.textContent = 'Actualizar Libro';
  cancelBtn.classList.remove('hidden');
  
  // Smooth scroll al formulario
  bookForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

window.deleteBook = deleteBook;

function resetForm() {
  isEditing = false;
  bookForm.reset();
  idInput.value = '';
  
  formTitle.textContent = 'Agregar Nuevo Libro';
  submitBtn.textContent = 'Guardar Libro';
  cancelBtn.classList.add('hidden');
}

// Utilidad para prevenir XSS
function escapeHTML(str) {
  if (!str) return '';
  return String(str).replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
