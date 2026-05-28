import { createContext, useContext, useEffect, useState } from 'react'

const PlanContext = createContext()

const STORAGE_KEY = 'soul_plan_state'

export function PlanProvider({ children }) {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [hasCompletedFirstCheckout, setHasCompletedFirstCheckout] = useState(false)
  const [isFirstPlanSelection, setIsFirstPlanSelection] = useState(true)

  // Carregar estado do localStorage ao montar
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY)
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState)
        setSelectedPlan(parsed.selectedPlan)
        setHasCompletedFirstCheckout(parsed.hasCompletedFirstCheckout)
        setIsFirstPlanSelection(parsed.isFirstPlanSelection)
      } catch (error) {
        console.error('Erro ao carregar estado de plano:', error)
      }
    }
  }, [])

  // Salvar estado no localStorage quando mudar
  useEffect(() => {
    const state = {
      selectedPlan,
      hasCompletedFirstCheckout,
      isFirstPlanSelection,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [selectedPlan, hasCompletedFirstCheckout, isFirstPlanSelection])

  /**
   * Selecionar um plano
   * @param {string} planSlug - ID do plano (essencial, profissional, enterprise)
   * @returns {boolean} - true se é primeira seleção, false caso contrário
   */
  const selectPlan = (planSlug) => {
    const isFirst = !hasCompletedFirstCheckout
    setSelectedPlan(planSlug)
    setIsFirstPlanSelection(isFirst)
    return isFirst
  }

  /**
   * Marcar checkout como completo (deve ser chamado após compra bem-sucedida)
   */
  const markCheckoutComplete = () => {
    setHasCompletedFirstCheckout(true)
    setIsFirstPlanSelection(false)
  }

  /**
   * Resetar estado de plano (para testes ou logout)
   */
  const resetPlanState = () => {
    setSelectedPlan(null)
    setHasCompletedFirstCheckout(false)
    setIsFirstPlanSelection(true)
    localStorage.removeItem(STORAGE_KEY)
  }

  const value = {
    selectedPlan,
    hasCompletedFirstCheckout,
    isFirstPlanSelection,
    selectPlan,
    markCheckoutComplete,
    resetPlanState,
  }

  return (
    <PlanContext.Provider value={value}>
      {children}
    </PlanContext.Provider>
  )
}

export function usePlan() {
  const context = useContext(PlanContext)
  if (!context) {
    throw new Error('usePlan deve ser usado dentro de um PlanProvider')
  }
  return context
}
