// Utilidades para manejar datos en localStorage

const EXPENSES_KEY = 'expenses';
const CATEGORIES_KEY = 'categories';

export const getExpenses = () => {
  const data = localStorage.getItem(EXPENSES_KEY);
  return data ? JSON.parse(data).map(exp => ({ ...exp, date: new Date(exp.date) })) : [];
};

export const saveExpenses = (expenses) => {
  const data = expenses.map(exp => ({ ...exp, date: exp.date.toISOString() }));
  localStorage.setItem(EXPENSES_KEY, JSON.stringify(data));
};

export const getCategories = () => {
  const data = localStorage.getItem(CATEGORIES_KEY);
  return data ? JSON.parse(data) : [
    { id: '1', name: 'Alimentación' },
    { id: '2', name: 'Transporte' },
    { id: '3', name: 'Entretenimiento' },
    { id: '4', name: 'Salud' },
    { id: '5', name: 'Otros' }
  ];
};

export const saveCategories = (categories) => {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};

export const exportData = () => {
  const expenses = getExpenses();
  const categories = getCategories();
  return JSON.stringify({ expenses, categories }, null, 2);
};

export const importData = (jsonString) => {
  try {
    const data = JSON.parse(jsonString);
    if (data.expenses && Array.isArray(data.expenses)) {
      saveExpenses(data.expenses.map(exp => ({ ...exp, date: new Date(exp.date) })));
    }
    if (data.categories && Array.isArray(data.categories)) {
      saveCategories(data.categories);
    }
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};