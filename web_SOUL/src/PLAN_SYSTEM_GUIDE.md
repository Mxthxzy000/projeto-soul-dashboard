/**
 * GUIA DE USO - SISTEMA DE PLANOS COM CHECKOUT OBRIGATÓRIO
 * 
 * Este arquivo documenta como usar o novo sistema de gerenciamento de planos
 * implementado com PlanContext e usePlanSelection.
 */

// ============================================
// 1. USAR O CONTEXTO DIRETAMENTE (Avançado)
// ============================================

import { usePlan } from '@/context/PlanContext'

function MeuComponente() {
  const {
    selectedPlan,              // string | null - Plano atualmente selecionado
    hasCompletedFirstCheckout, // boolean - Se já fez primeira compra
    isFirstPlanSelection,      // boolean - Se é primeira seleção
    selectPlan,                // função - Selecionar um plano
    markCheckoutComplete,      // função - Marcar checkout como completo
    resetPlanState,            // função - Limpar estado (para logout)
  } = usePlan()

  return (
    <div>
      <p>Plano selecionado: {selectedPlan}</p>
      <p>Primera seleção: {isFirstPlanSelection ? 'Sim' : 'Não'}</p>
      <button onClick={() => selectPlan('profissional')}>
        Selecionar Profissional
      </button>
    </div>
  )
}

// ============================================
// 2. USAR O HOOK PARA SELEÇÃO (Recomendado)
// ============================================

import { usePlanSelection } from '@/hooks/usePlanSelection'

function MinhaSecaoDePlanos() {
  const { handlePlanSelection, isFirstSelection, selectedPlan } = usePlanSelection()

  return (
    <div>
      <button onClick={() => handlePlanSelection('essencial')}>
        Selecionar Essencial
      </button>
      
      {isFirstSelection && (
        <p>Primeira seleção - checkout será obrigatório!</p>
      )}
    </div>
  )
}

// ============================================
// 3. ARMAZENAMENTO EM LOCALSTORAGE
// ============================================

// Estado salvo em localStorage com chave 'soul_plan_state':
// {
//   "selectedPlan": "profissional",
//   "hasCompletedFirstCheckout": true,
//   "isFirstPlanSelection": false
// }

// Limpar estado (útil para logout):
const { resetPlanState } = usePlan()
resetPlanState() // Limpa localStorage e reseta estado

// ============================================
// 4. FLUXO DE CHECKOUT
// ============================================

// Passo 1: Usuário seleciona plano (em Pricing.jsx)
handlePlanSelection('profissional')

// Passo 2: Se primeira seleção
// - Modal de aviso é exibido
// - Usuário é levado a /checkout?plano=profissional

// Passo 3: Em Checkout.jsx
// - Alerta azul é mostrado (primeira seleção)
// - Formulário é exibido
// - Ao enviar: markCheckoutComplete() é chamado

// Passo 4: Estado é salvo
// - localStorage é atualizado
// - Próximas seleções não exibem modal

// ============================================
// 5. VALIDAÇÕES IMPLEMENTADAS
// ============================================

// Checkout.jsx valida:
// ✅ Todos os campos obrigatórios preenchidos
// ✅ Email válido (formato básico)
// ✅ Número de cartão (mínimo 13 dígitos)
// ✅ Validade em MM/AA
// ✅ CVV com 3-4 dígitos
// ✅ CPF/CNPJ formatado

// ============================================
// 6. INTEGRAÇÃO COM SUPABASE (Futuro)
// ============================================

// Quando integrar com Supabase:

async function salvarPlanoDoBanco(userId, planSlug) {
  const { data, error } = await supabase
    .from('usuario')
    .update({ plan_slug: planSlug, status: 'active' })
    .eq('id', userId)

  if (!error) {
    markCheckoutComplete() // Sincronizar contexto
  }
}

// ============================================
// 7. RESETAR PARA TESTES
// ============================================

// Em uma função de debug ou botão de reset:
const { resetPlanState } = usePlan()

function BotaoResetarTestes() {
  return (
    <button onClick={() => {
      resetPlanState()
      window.location.reload() // Ou redirecionar
    }}>
      Resetar Estado (Testes)
    </button>
  )
}

// ============================================
// 8. ESTRUTURA DE DADOS
// ============================================

// PlanContext fornece:
const planState = {
  selectedPlan: 'profissional',           // Último plano selecionado
  hasCompletedFirstCheckout: true,        // Já completou primeira compra?
  isFirstPlanSelection: false,            // É primeira seleção agora?
}

// Plans disponíveis (em Pricing.jsx e Checkout.jsx):
const plans = [
  { id: 'essencial', name: 'Essencial', price: 250, slug: 'essencial' },
  { id: 'profissional', name: 'Profissional', price: 600, slug: 'profissional' },
  { id: 'enterprise', name: 'Enterprise', price: 1250, slug: 'enterprise' },
]

// ============================================
// 9. TROUBLESHOOTING
// ============================================

// Problema: "usePlan deve ser usado dentro de PlanProvider"
// Solução: Verifique se App.jsx envolve componentes com <PlanProvider>

// Problema: Estado não persiste após reload
// Solução: localStorage pode estar desabilitado. Verificar:
console.log(localStorage.getItem('soul_plan_state'))

// Problema: Modal não aparece ao selecionar plano
// Solução: Certifique-se de ter Swal (SweetAlert2) instalado:
// npm install sweetalert2

// ============================================
// 10. PRÓXIMOS PASSOS
// ============================================

// 1. Conectar com banco de dados (Supabase)
// 2. Adicionar lógica de pagamento real
// 3. Enviar confirmação por email
// 4. Implementar rastreamento de eventos
// 5. Adicionar analytics
