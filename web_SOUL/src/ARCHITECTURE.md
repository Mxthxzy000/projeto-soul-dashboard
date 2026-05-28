/**
 * ARQUITETURA - SISTEMA DE PLANOS COM CHECKOUT OBRIGATÓRIO
 * 
 * Diagrama de fluxo e dependências do sistema implementado.
 */

// ============================================
// 📊 DIAGRAMA DE ARQUITETURA
// ============================================

/*
                        ┌─────────────────────────────────┐
                        │   App.jsx                       │
                        │   <PlanProvider> ✨             │
                        └──────────────┬──────────────────┘
                                       │
                    ┌──────────────────┼──────────────────┐
                    │                  │                  │
          ┌─────────▼─────────┐  ┌────▼────────────┐  ┌──▼──────────────┐
          │  HomePage/        │  │  Checkout.jsx   │  │  Account.jsx    │
          │  Pricing.jsx      │  │                 │  │                 │
          │                   │  │  (usa contexto) │  │  (usa contexto) │
          │  usePlanSelection │  │                 │  │                 │
          │  hook ✨          │  │  - Validações   │  │  - Mostrar plano│
          │                   │  │  - Modal aviso  │  │  - Upgrade      │
          └───────────────────┘  │  - Processar    │  └─────────────────┘
                                 │    pagamento    │
                                 └────────────────┘
                                          ▲
                                          │
                                    ┌─────┴─────────────┐
                                    │                   │
                             ┌──────▼───────────────────▼────┐
                             │  PlanContext.jsx ✨            │
                             │                                │
                             │  ├─ selectedPlan              │
                             │  ├─ hasCompletedFirstCheckout│
                             │  ├─ isFirstPlanSelection     │
                             │  │                            │
                             │  ├─ selectPlan()             │
                             │  ├─ markCheckoutComplete()   │
                             │  ├─ resetPlanState()         │
                             │  │                            │
                             │  └─ localStorage: 'soul_plan_state'
                             └────────────────────────────────┘


// ============================================
// 📁 ESTRUTURA DE PASTAS
// ============================================

web_SOUL/
├── src/
│   ├── context/
│   │   └── PlanContext.jsx ✨ NOVO
│   │       └── Gerencia estado global de planos
│   │
│   ├── hooks/
│   │   └── usePlanSelection.js ✨ NOVO
│   │       └── Hook para seleção de plano com validações
│   │
│   ├── sessions/
│   │   ├── Pricing.jsx (MODIFICADO)
│   │   │   └── Usa usePlanSelection() hook
│   │   │
│   │   ├── Checkout.jsx (MODIFICADO)
│   │   │   ├── Validações de formulário
│   │   │   ├── Alerta de primeira seleção
│   │   │   └── Chama markCheckoutComplete()
│   │   │
│   │   ├── Checkout.css (MODIFICADO)
│   │   │   ├── .form-alert
│   │   │   └── Estados de botão
│   │   │
│   │   └── Account.jsx (a integrar futuramente)
│   │
│   ├── App.jsx (MODIFICADO)
│   │   └── <PlanProvider> envolvendo rotas
│   │
│   └── PLAN_SYSTEM_GUIDE.md ✨ NOVO
│       └── Documentação de uso
│
└── ...resto do projeto


// ============================================
// 🔄 FLUXO DE DADOS
// ============================================

1️⃣ PRIMEIRA SELEÇÃO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Usuário clica em "Começar Agora"
    ↓
Pricing.jsx: onClick={handlePlanSelection('profissional')}
    ↓
usePlanSelection() verifica: isFirstSelection = true
    ↓
Swal.fire() exibe modal: "Primeira seleção de plano..."
    ↓
navigate('/checkout?plano=profissional')
    ↓
Checkout.jsx carrega:
  - planParam = 'profissional'
  - isFirstPlanSelection = true ← mostra alerta azul
    ↓
Usuário preenche formulário
    ↓
handleSubmit() → Validações → markCheckoutComplete()
    ↓
localStorage: {
  selectedPlan: 'profissional',
  hasCompletedFirstCheckout: true,
  isFirstPlanSelection: false
}
    ↓
Modal de sucesso com download


2️⃣ SEGUNDA SELEÇÃO (UPGRADE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Usuário clica em "Escolher Profissional"
    ↓
usePlanSelection() verifica: isFirstSelection = false
    ↓
Sem modal ✨ → navigate('/checkout?plano=profissional')
    ↓
Checkout.jsx carrega:
  - planParam = 'profissional'
  - isFirstPlanSelection = false ← sem alerta azul
    ↓
Fluxo normal de checkout


// ============================================
// 🔐 ARMAZENAMENTO
// ============================================

localStorage Key: 'soul_plan_state'

Valor salvo:
{
  "selectedPlan": "profissional",
  "hasCompletedFirstCheckout": true,
  "isFirstPlanSelection": false
}

Recuperado em:
- useEffect ao montar PlanProvider
- Persistido em cada mudança de estado
- Removido ao chamar resetPlanState()


// ============================================
// ✅ VALIDAÇÕES IMPLEMENTADAS
// ============================================

Checkout.jsx valida:

✓ Campos obrigatórios:
  - nomeCompleto
  - nomeEmpresa
  - email
  - telefone
  - cpfCnpj
  - numeroCartao
  - validade
  - cvv

✓ Formatações automáticas:
  - Telefone: (XX) XXXXX-XXXX
  - CPF: XXX.XXX.XXX-XX
  - CNPJ: XX.XXX.XXX/XXXX-XX
  - Cartão: XXXX XXXX XXXX XXXX
  - Validade: MM/AA

✓ Validações de negócio:
  - Email válido (regex básico)
  - Cartão mínimo 13 dígitos
  - CVV 3-4 dígitos
  - isProcessing previne duplos cliques


// ============================================
// 🎨 COMPONENTES VISUAIS
// ============================================

Novo: Alerta de Primeira Seleção
┌─────────────────────────────────────┐
│ ℹ️  Primeira seleção de plano       │
│ Para começar a usar o Profissional, │
│ você precisará completar o checkout.│
│ Prosseguir para a página de         │
│ pagamento agora?                    │
└─────────────────────────────────────┘

Modal de Aviso
┌─────────────────────────────────────┐
│ Primeira Seleção de Plano           │
│                                     │
│ Para começar a usar o Profissional, │
│ você precisará completar o checkout.│
│ Prosseguir para a página de         │
│ pagamento agora?                    │
│                                     │
│ [Ir para Checkout] [Cancelar]      │
└─────────────────────────────────────┘

Checkout com Alerta
┌─────────────────────────────────────┐
│ ℹ️  PRIMEIRA SELEÇÃO DE PLANO       │ ✨ NOVO
│ Checkout é obrigatório para ativar  │
└─────────────────────────────────────┘
│ Selecione seu plano                 │
│ [Essencial] [Profissional] [Enterprise] │
│ ... resto do formulário             │


// ============================================
// 🚀 PRÓXIMAS IMPLEMENTAÇÕES
// ============================================

Sugerido para integração com banco de dados:

1. Em Checkout.jsx handleSubmit():
   ├─ Chamar API de pagamento real
   ├─ Salvar em Supabase usuário_plano
   └─ markCheckoutComplete() só após sucesso

2. Em Account.jsx:
   ├─ Verificar plano ativo do banco
   ├─ Mostrar data de próximo pagamento
   ├─ Permitir cancelamento
   └─ Gerar invoices

3. Melhorias:
   ├─ Integrar Stripe/Mercado Pago
   ├─ Enviar email de confirmação
   ├─ Dashboard com métricas
   └─ Webhook de renovação automática


// ============================================
// 📞 SUPORTE E DEBUG
// ============================================

Verificar estado no console:
> const { __PLAN_STATE__ } = window
> console.log(JSON.parse(localStorage.getItem('soul_plan_state')))

Resetar para testes:
> localStorage.removeItem('soul_plan_state')
> location.reload()

Logs disponíveis:
- Erro ao carregar estado: console.error()
- Erro ao processar pagamento: Swal.fire()
- isProcessing state para debug de duplos cliques


// ============================================
// 📝 NOTAS IMPORTANTES
// ============================================

✓ SweetAlert2 (Swal) deve estar instalado
✓ localStorage disponível no navegador
✓ Validação é básica - adicione backend
✓ Estado persiste por usuário (sem autenticação por agora)
✓ Reset automático ao chamar resetPlanState()
✓ Compatível com React Router v6+
*/
