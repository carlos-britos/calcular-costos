import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeSnapshot = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      // Limpiar suscripción anterior si existe
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
        unsubscribeSnapshot = null;
      }

      if (user) {
        // Escuchar cambios en el documento del usuario en tiempo real
        unsubscribeSnapshot = onSnapshot(doc(db, 'users', user.uid), (userDoc) => {
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.approved || userData.role === 'admin') {
              setCurrentUser(user);
              setUserRole(userData.role);
            } else {
              // Usuario no aprobado: forzar logout
              setCurrentUser(null);
              setUserRole(null);
              signOut(auth);
            }
          } else {
            // Documento no existe aún
            setCurrentUser(null);
            setUserRole(null);
          }
          setLoading(false);
        }, (error) => {
          console.error("Error in user document listener:", error);
          setLoading(false);
        });
      } else {
        setCurrentUser(null);
        setUserRole(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  const value = {
    currentUser,
    userRole,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};