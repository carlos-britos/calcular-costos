import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    // Cargar usuarios
    const usersQuery = collection(db, 'users');
    const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
      const usrs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usrs);
    });

    // Cargar categorías
    const categoriesQuery = collection(db, 'categories');
    const unsubscribeCategories = onSnapshot(categoriesQuery, (snapshot) => {
      const cats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(cats);
    });

    return () => {
      unsubscribeUsers();
      unsubscribeCategories();
    };
  }, []);

  const handleApproveUser = async (userId) => {
    await updateDoc(doc(db, 'users', userId), { approved: true });
  };

  const handleRejectUser = async (userId) => {
    await deleteDoc(doc(db, 'users', userId));
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    await addDoc(collection(db, 'categories'), { name: newCategory });
    setNewCategory('');
  };

  const handleEditCategory = async () => {
    if (!editingCategory.name.trim()) return;
    await updateDoc(doc(db, 'categories', editingCategory.id), { name: editingCategory.name });
    setEditingCategory(null);
  };

  const handleDeleteCategory = async (categoryId) => {
    await deleteDoc(doc(db, 'categories', categoryId));
  };

  return (
    <div className="space-y-xl">
      <h1 className="text-3xl font-bold text-center text-textPrimary-light dark:text-textPrimary-dark">Panel de Administración</h1>

      {/* Gestión de Usuarios */}
      <div className="bg-surface-light dark:bg-surface-dark p-md rounded-lg shadow-md border border-border-light dark:border-border-dark">
        <h2 className="text-xl font-semibold mb-md text-textPrimary-light dark:text-textPrimary-dark">Gestión de Usuarios</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-bg-light dark:bg-bg-dark border-b border-border-light dark:border-border-dark">
                <th className="text-left py-sm font-bold uppercase text-xs text-textPrimary-light dark:text-textPrimary-dark">Email</th>
                <th className="text-right py-sm font-bold uppercase text-xs text-textPrimary-light dark:text-textPrimary-dark">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.filter(user => !user.approved).map(user => (
                <tr key={user.id} className="min-h-16 border-b last:border-b-0 border-border-light dark:border-border-dark">
                  <td className="py-lg text-textPrimary-light dark:text-textPrimary-dark">{user.email}</td>
                  <td className="py-lg text-right space-x-sm">
                    <button
                      onClick={() => handleApproveUser(user.id)}
                      className="bg-accent-light dark:bg-accent-dark text-textPrimary-dark px-lg py-sm rounded hover:transform hover:-translate-y-1 hover:shadow-md"
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() => handleRejectUser(user.id)}
                      className="bg-danger-light dark:bg-danger-dark text-textPrimary-dark px-lg py-sm rounded hover:transform hover:-translate-y-1 hover:shadow-md"
                    >
                      Rechazar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gestión de Categorías */}
      <div className="bg-surface-light dark:bg-surface-dark p-md rounded-lg shadow-md border border-border-light dark:border-border-dark">
        <h2 className="text-xl font-semibold mb-md text-textPrimary-light dark:text-textPrimary-dark">Gestión de Categorías</h2>

        {/* Agregar nueva categoría */}
        <div className="flex gap-md mb-md">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Nueva categoría"
            className="flex-1 p-md border border-border-light dark:border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:shadow-[0_0_0_3px_rgba(48,110,232,0.2)] bg-surface-light dark:bg-surface-dark text-textPrimary-light dark:text-textPrimary-dark"
          />
          <button
            onClick={handleAddCategory}
            className="bg-accent-light dark:bg-accent-dark text-textPrimary-dark px-lg py-md rounded-lg hover:transform hover:-translate-y-1 hover:shadow-md"
          >
            Agregar
          </button>
        </div>

        {/* Lista de categorías */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-bg-light dark:bg-bg-dark border-b border-border-light dark:border-border-dark">
                <th className="text-left py-sm font-bold uppercase text-xs text-textPrimary-light dark:text-textPrimary-dark">Nombre</th>
                <th className="text-right py-sm font-bold uppercase text-xs text-textPrimary-light dark:text-textPrimary-dark">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.id} className="min-h-16 border-b last:border-b-0 border-border-light dark:border-border-dark">
                  {editingCategory && editingCategory.id === cat.id ? (
                    <td colSpan="2" className="py-lg">
                      <div className="flex gap-sm">
                        <input
                          type="text"
                          value={editingCategory.name}
                          onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                          className="flex-1 p-sm border border-border-light dark:border-border-dark rounded bg-surface-light dark:bg-surface-dark text-textPrimary-light dark:text-textPrimary-dark"
                        />
                        <button
                          onClick={handleEditCategory}
                          className="bg-accent-light dark:bg-accent-dark text-textPrimary-dark px-lg py-sm rounded hover:transform hover:-translate-y-1 hover:shadow-md"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => setEditingCategory(null)}
                          className="bg-border-light dark:bg-border-dark text-textPrimary-light dark:text-textPrimary-dark px-lg py-sm rounded hover:transform hover:-translate-y-1 hover:shadow-md"
                        >
                          Cancelar
                        </button>
                      </div>
                    </td>
                  ) : (
                    <>
                      <td className="py-lg text-textPrimary-light dark:text-textPrimary-dark">{cat.name}</td>
                      <td className="py-lg text-right space-x-sm">
                        <button
                          onClick={() => setEditingCategory({ id: cat.id, name: cat.name })}
                          className="bg-accent-light dark:bg-accent-dark text-textPrimary-dark px-lg py-sm rounded hover:transform hover:-translate-y-1 hover:shadow-md"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat.id)}
                          className="bg-danger-light dark:bg-danger-dark text-textPrimary-dark px-lg py-sm rounded hover:transform hover:-translate-y-1 hover:shadow-md"
                        >
                          Eliminar
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;