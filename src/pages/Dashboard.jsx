import { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [monthlySummary, setMonthlySummary] = useState([]);

  const calculateMonthlySummary = useCallback((exps) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthly = {};
    exps.forEach(exp => {
      const expDate = exp.date.toDate();
      if (expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear) {
        if (!monthly[exp.category]) {
          monthly[exp.category] = 0;
        }
        monthly[exp.category] += exp.amount;
      }
    });

    const summary = Object.entries(monthly).map(([catId, total]) => {
      const category = categories.find(c => c.id === catId);
      return {
        name: category ? category.name : 'Desconocido',
        value: total,
      };
    });
    setMonthlySummary(summary);
  }, [categories]);

  useEffect(() => {
    // Cargar categorías
    const categoriesQuery = collection(db, 'categories');
    const unsubscribeCategories = onSnapshot(categoriesQuery, (snapshot) => {
      const cats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(cats);
      if (cats.length > 0 && !selectedCategory) {
        setSelectedCategory(cats[0].id);
      }
    });

    // Cargar gastos del usuario
    if (currentUser) {
      const expensesQuery = query(
        collection(db, 'users', currentUser.uid, 'expenses'),
        orderBy('date', 'desc')
      );
      const unsubscribeExpenses = onSnapshot(expensesQuery, (snapshot) => {
        const exps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setExpenses(exps);
        calculateMonthlySummary(exps);
      });

      return () => {
        unsubscribeCategories();
        unsubscribeExpenses();
      };
    }
  }, [currentUser, categories, calculateMonthlySummary]);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!amount || !selectedCategory) return;

    try {
      await addDoc(collection(db, 'users', currentUser.uid, 'expenses'), {
        amount: parseFloat(amount),
        category: selectedCategory,
        date: new Date(),
      });
      setAmount('');
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  // Premium color palette for charts
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  return (
    <div className="space-y-8">
      <h1 className="text-premium-title text-left mb-8">Dashboard de Gastos</h1>

      {/* Layout principal en grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna izquierda: Agregar gasto y gastos recientes */}
        <div className="space-y-6">
          {/* Formulario para agregar gasto */}
          <div className="glass-card p-6">
            <h2 className="text-premium-subtitle mb-6">Agregar Gasto</h2>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Monto"
                  className="input-premium flex-1 min-w-[300px]"
                  required
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="select-premium flex-1 sm:flex-none sm:w-auto min-w-[300px]"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="btn-premium btn-premium-primary w-full"
              >
                Agregar
              </button>
            </form>
          </div>

          {/* Lista de gastos recientes como cards */}
          <div className="glass-card p-6">
            <h2 className="text-premium-subtitle mb-6">Gastos Recientes</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto modern-scrollbar">
              {expenses.slice(0, 10).map(exp => {
                const category = categories.find(c => c.id === exp.category);
                return (
                  <div key={exp.id} className="p-4 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark rounded-card">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-textPrimary-light dark:text-textPrimary-dark">{category ? category.name : 'Desconocido'}</p>
                        <p className="text-sm text-textSecondary-light dark:text-textSecondary-dark">{exp.date.toDate().toLocaleDateString()}</p>
                      </div>
                      <p className="text-lg font-bold text-textPrimary-light dark:text-textPrimary-dark">${exp.amount.toFixed(2)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Columna central: Gráfico de torta */}
        <div className="glass-card p-6 flex flex-col">
          <h2 className="text-premium-subtitle mb-6">Distribución de Gastos</h2>
          <div className="chart-glow flex-1 min-h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={monthlySummary}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {monthlySummary.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Columna derecha: Resumen mensual */}
        <div className="glass-card p-6">
          <h2 className="text-premium-subtitle mb-6">Resumen Mensual</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-light dark:border-border-dark">
                  <th className="text-left py-3 font-bold uppercase text-xs text-textSecondary-light dark:text-textSecondary-dark">Categoría</th>
                  <th className="text-right py-3 font-bold uppercase text-xs text-textSecondary-light dark:text-textSecondary-dark">Total</th>
                </tr>
              </thead>
              <tbody>
                {monthlySummary.map((item, index) => (
                  <tr key={index} className="border-b last:border-b-0 border-border-light dark:border-border-dark">
                    <td className="py-4 text-textPrimary-light dark:text-textPrimary-dark">{item.name}</td>
                    <td className="py-4 text-right font-medium text-textPrimary-light dark:text-textPrimary-dark">${item.value.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;