import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1º EFFECT: Monitora APENAS o estado de autenticação do Supabase
  useEffect(() => {
    console.log('Contexto: Inicializando ouvinte de autenticação do Supabase...');
    
    // O onAuthStateChange do Supabase v2 já dispara o estado inicial automaticamente ao assinar
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`Contexto: Mudança de estado de Autenticação (${event})`);
      
      const currentUser = session?.user ?? null;
      setUserAuth(currentUser);

      // Se não houver nenhum usuário logado, desliga o loading imediatamente por aqui
      if (!currentUser) {
        console.log('Contexto: Nenhum usuário ativo detectado.');
        setUsuario(null);
        setLoading(false);
      }
    });

    return () => {
      if (listener?.subscription) {
        listener.subscription.unsubscribe();
      }
    };
  }, []);

  // 2º EFFECT: Executa de forma isolada APENAS quando o "userAuth" mudar
  useEffect(() => {
    // Se o userAuth for nulo, o primeiro useEffect já tratou de desligar o loading
    if (!userAuth) return;

    const fetchUsuarioData = async () => {
      try {
        setLoading(true);
        console.log('Contexto: Buscando dados da tabela "usuario" para o ID:', userAuth.id);
        
        const { data, error } = await supabase
          .from('usuario')
          .select('*')
          .eq('id', userAuth.id)
          .single();

        if (error) throw error;

        console.log('Contexto: Dados do usuário carregados com sucesso:', data);
        setUsuario(data);
      } catch (error) {
        console.error('Contexto: Erro ao buscar dados do utilizador no banco:', error.message);
        setUsuario(null);
      } finally {
        console.log('Contexto: Finalizando estado de carregamento.');
        setLoading(false);
      }
    };

    fetchUsuarioData();
  }, [userAuth]);

  const updateUsuarioLocal = (novosDados) => {
    setUsuario(prev => ({ ...prev, ...novosDados }));
  };

  const logout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUsuario(null);
      setUserAuth(null);
    } catch (error) {
      console.error('Contexto: Erro ao tentar deslogar:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ userAuth, usuario, loading, logout, updateUsuarioLocal }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);