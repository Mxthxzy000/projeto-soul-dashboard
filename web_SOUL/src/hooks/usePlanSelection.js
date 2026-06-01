import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlan } from '../context/PlanContext'
import { useAuth } from '../context/AuthContext'
import Swal from 'sweetalert2'

/**
 * Hook customizado para gerenciar seleção de plano
 * Garante que o checkout é obrigatório na primeira seleção
 * 
 * @returns {object} - { handlePlanSelection, isFirstSelection, selectedPlan }
 */
export function usePlanSelection() {
  const navigate = useNavigate()
  const { selectPlan, hasCompletedFirstCheckout, selectedPlan } = usePlan()
  const { userAuth } = useAuth()

  const handlePlanSelection = useCallback(
    async (planSlug) => {
      try {
        // Selecionar plano (persistir escolha)
        const isFirst = selectPlan(planSlug)

        // Se usuário não autenticado, redirecionar para login antes do checkout
        if (!userAuth) {
          await Swal.fire({
            title: 'Login necessário',
            text: 'Você precisa entrar na sua conta para prosseguir com o checkout.',
            iconColor: '#F38512',
            icon: 'warning',
            confirmButtonText: 'Ir para Login',
            confirmButtonColor: '#F38512',
            allowOutsideClick: false,
            allowEscapeKey: false,
          })

          const next = encodeURIComponent(`/checkout?plano=${planSlug}`)
          navigate(`/login?next=${next}`)
          return
        }

        if (isFirst && !hasCompletedFirstCheckout) {
          // Primeira seleção - é obrigatório fazer checkout
          await Swal.fire({
            title: 'Primeira Seleção de Plano',
            html: `
              <p>Para começar a usar o <strong>${planSlug.charAt(0).toUpperCase() + planSlug.slice(1)}</strong>, você precisará completar o checkout.</p>
              <p style="margin-top: 12px; font-size: 0.9em; color: #666;">Prosseguir para a página de pagamento agora?</p>
            `,
            iconColor: '#F38512',
            icon: 'warning',
            confirmButtonText: 'Ir para Checkout',
            confirmButtonColor: '#F38512',
            allowOutsideClick: false,
            allowEscapeKey: false,
          })

          // Navegar para checkout
          navigate(`/checkout?plano=${planSlug}`)
        } else {
          // Já tem plano ativo - permite mudança
          navigate(`/checkout?plano=${planSlug}`)
        }
      } catch (error) {
        console.error('Erro ao selecionar plano:', error)
        Swal.fire({
          title: 'Erro',
          text: 'Ocorreu um erro ao selecionar o plano. Tente novamente.',
          iconColor: '#F38512',
          icon: 'error',
          confirmButtonColor: '#F38512',
        })
      }
    },
    [navigate, selectPlan, hasCompletedFirstCheckout]
  )

  return {
    handlePlanSelection,
    isFirstSelection: !hasCompletedFirstCheckout,
    selectedPlan,
  }
}
