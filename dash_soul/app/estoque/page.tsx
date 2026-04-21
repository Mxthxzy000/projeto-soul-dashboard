
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Modal } from "@/components/ui/modal"
import { Package, Plus, Search, AlertTriangle, CheckCircle, XCircle, Edit, Trash2, Eye } from "lucide-react"
import { useState, useMemo } from "react"

interface Product {
  id: number
  name: string
  sku: string
  category: string
  stock: number
  minStock: number
  price: number
  status: "ok" | "low" | "out"
  description?: string
}

const initialProducts: Product[] = [
  { id: 1, name: "Notebook Dell Inspiron 15", sku: "NB-001", category: "Eletrônicos", stock: 45, minStock: 10, price: 3599.00, status: "ok", description: "Notebook com processador Intel Core i5, 8GB RAM, 256GB SSD" },
  { id: 2, name: "Mouse Logitech MX Master", sku: "MS-002", category: "Periféricos", stock: 120, minStock: 30, price: 499.00, status: "ok", description: "Mouse sem fio ergonômico com sensor avançado" },
  { id: 3, name: "Teclado Mecânico Redragon", sku: "TC-003", category: "Periféricos", stock: 8, minStock: 20, price: 289.00, status: "low", description: "Teclado mecânico RGB com switches blue" },
  { id: 4, name: "Monitor LG 27\" 4K", sku: "MN-004", category: "Monitores", stock: 0, minStock: 5, price: 2199.00, status: "out", description: "Monitor 4K IPS com HDR10" },
  { id: 5, name: "Headset HyperX Cloud", sku: "HS-005", category: "Áudio", stock: 32, minStock: 15, price: 399.00, status: "ok", description: "Headset gamer com microfone destacável" },
  { id: 6, name: "Webcam Logitech C920", sku: "WC-006", category: "Periféricos", stock: 5, minStock: 10, price: 449.00, status: "low", description: "Webcam Full HD 1080p com foco automático" },
  { id: 7, name: "SSD Samsung 1TB", sku: "SD-007", category: "Armazenamento", stock: 78, minStock: 25, price: 599.00, status: "ok", description: "SSD NVMe M.2 com velocidade de 3500MB/s" },
  { id: 8, name: "Memória RAM 16GB DDR4", sku: "MM-008", category: "Componentes", stock: 0, minStock: 20, price: 299.00, status: "out", description: "Módulo de memória DDR4 3200MHz" },
]

const categories = ["Eletrônicos", "Periféricos", "Monitores", "Áudio", "Armazenamento", "Componentes"]

export default function EstoquePage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "Eletrônicos",
    stock: 0,
    minStock: 10,
    price: 0,
    description: "",
  })

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === "all" || p.status === filterStatus
      return matchesSearch && matchesStatus
    })
  }, [products, searchTerm, filterStatus])

  const stats = useMemo(() => {
    const total = products.length
    const inStock = products.filter(p => p.status === "ok").length
    const lowStock = products.filter(p => p.status === "low").length
    const outOfStock = products.filter(p => p.status === "out").length
    return [
      { label: "Total de Produtos", value: total.toString(), icon: Package, color: "text-[#3b82f6]", bg: "bg-[#3b82f6]/10" },
      { label: "Em Estoque", value: inStock.toString(), icon: CheckCircle, color: "text-[#10b981]", bg: "bg-[#10b981]/10" },
      { label: "Estoque Baixo", value: lowStock.toString(), icon: AlertTriangle, color: "text-[#e67e22]", bg: "bg-[#e67e22]/10" },
      { label: "Esgotados", value: outOfStock.toString(), icon: XCircle, color: "text-[#ef4444]", bg: "bg-[#ef4444]/10" },
    ]
  }, [products])

  const calculateStatus = (stock: number, minStock: number): "ok" | "low" | "out" => {
    if (stock === 0) return "out"
    if (stock <= minStock) return "low"
    return "ok"
  }

  const handleAddProduct = () => {
    if (!formData.name || !formData.sku) return

    const status = calculateStatus(formData.stock, formData.minStock)

    if (isEditing && selectedProduct) {
      setProducts(products.map(p => p.id === selectedProduct.id ? {
        ...p,
        ...formData,
        status,
      } : p))
    } else {
      const newProduct: Product = {
        id: Date.now(),
        ...formData,
        status,
      }
      setProducts([...products, newProduct])
    }
    
    closeModal()
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
    setIsDetailModalOpen(false)
    setSelectedProduct(null)
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setFormData({
      name: product.name,
      sku: product.sku,
      category: product.category,
      stock: product.stock,
      minStock: product.minStock,
      price: product.price,
      description: product.description || "",
    })
    setIsEditing(true)
    setIsDetailModalOpen(false)
    setIsModalOpen(true)
  }

  const handleUpdateStock = (id: number, delta: number) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        const newStock = Math.max(0, p.stock + delta)
        return { ...p, stock: newStock, status: calculateStatus(newStock, p.minStock) }
      }
      return p
    }))
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setIsEditing(false)
    setFormData({ name: "", sku: "", category: "Eletrônicos", stock: 0, minStock: 10, price: 0, description: "" })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ok":
        return <span className="inline-flex rounded-full bg-[#10b981] px-2.5 py-1 text-xs font-medium text-white">Em estoque</span>
      case "low":
        return <span className="inline-flex rounded-full bg-[#e67e22] px-2.5 py-1 text-xs font-medium text-white">Estoque baixo</span>
      case "out":
        return <span className="inline-flex rounded-full bg-[#ef4444] px-2.5 py-1 text-xs font-medium text-white">Esgotado</span>
      default:
        return null
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Estoque</h1>
            <p className="text-sm text-gray-500">Gerencie seus produtos e inventário</p>
          </div>
          <button
            onClick={() => { setIsEditing(false); setIsModalOpen(true); }}
            className="flex items-center gap-2 rounded-lg bg-[#e67e22] px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#d35400] hover:shadow-lg hover:shadow-[#e67e22]/30"
          >
            <Plus className="h-4 w-4" />
            Novo Produto
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <button
              key={stat.label}
              onClick={() => {
                if (stat.label === "Em Estoque") setFilterStatus(filterStatus === "ok" ? "all" : "ok")
                else if (stat.label === "Estoque Baixo") setFilterStatus(filterStatus === "low" ? "all" : "low")
                else if (stat.label === "Esgotados") setFilterStatus(filterStatus === "out" ? "all" : "out")
                else setFilterStatus("all")
              }}
              className={`group rounded-xl bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                (filterStatus === "ok" && stat.label === "Em Estoque") ||
                (filterStatus === "low" && stat.label === "Estoque Baixo") ||
                (filterStatus === "out" && stat.label === "Esgotados")
                  ? "ring-2 ring-[#e67e22]"
                  : ""
              }`}
            >
              <div className={`w-fit rounded-lg ${stat.bg} p-2.5`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="mt-3 text-sm text-gray-500">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
            </button>
          ))}
        </div>

        {/* Products Table */}
        <div className="rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Lista de Produtos
              {filterStatus !== "all" && (
                <span className="ml-2 text-sm font-normal text-gray-500">
                  (Filtrado: {filterStatus === "ok" ? "Em estoque" : filterStatus === "low" ? "Estoque baixo" : "Esgotados"})
                </span>
              )}
            </h2>
            <div className="flex gap-2">
              {filterStatus !== "all" && (
                <button
                  onClick={() => setFilterStatus("all")}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
                >
                  Limpar filtro
                </button>
              )}
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar produto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-left font-medium text-gray-500">Produto</th>
                  <th className="pb-3 text-left font-medium text-gray-500">SKU</th>
                  <th className="pb-3 text-left font-medium text-gray-500">Categoria</th>
                  <th className="pb-3 text-left font-medium text-gray-500">Estoque</th>
                  <th className="pb-3 text-left font-medium text-gray-500">Preço</th>
                  <th className="pb-3 text-left font-medium text-gray-500">Status</th>
                  <th className="pb-3 text-left font-medium text-gray-500">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500">
                      Nenhum produto encontrado.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="group border-b border-gray-100 transition-colors hover:bg-gray-50"
                    >
                      <td className="py-3 font-medium text-gray-900">{product.name}</td>
                      <td className="py-3 text-gray-500">{product.sku}</td>
                      <td className="py-3 text-gray-700">{product.category}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateStock(product.id, -1)}
                            className="rounded border border-gray-200 px-2 py-0.5 text-gray-500 transition-colors hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className={`min-w-[40px] text-center font-medium ${product.stock <= product.minStock ? "text-[#ef4444]" : "text-gray-900"}`}>
                            {product.stock}
                          </span>
                          <button
                            onClick={() => handleUpdateStock(product.id, 1)}
                            className="rounded border border-gray-200 px-2 py-0.5 text-gray-500 transition-colors hover:bg-gray-100"
                          >
                            +
                          </button>
                          <span className="text-gray-400">/ {product.minStock} min</span>
                        </div>
                      </td>
                      <td className="py-3 font-medium text-gray-900">
                        R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3">{getStatusBadge(product.status)}</td>
                      <td className="py-3">
                        <div className="flex gap-1">
                          <button
                            onClick={() => { setSelectedProduct(product); setIsDetailModalOpen(true); }}
                            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-[#3b82f6]/10 hover:text-[#3b82f6]"
                            title="Ver detalhes"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-[#e67e22]/10 hover:text-[#e67e22]"
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-[#ef4444]/10 hover:text-[#ef4444]"
                            title="Excluir"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isEditing ? "Editar Produto" : "Novo Produto"}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Nome do Produto</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Notebook Dell Inspiron"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">SKU</label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                placeholder="Ex: NB-001"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Categoria</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Estoque Atual</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                min="0"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Estoque Mínimo</label>
              <input
                type="number"
                value={formData.minStock}
                onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value) || 0 })}
                min="0"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Preço (R$)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                min="0"
                step="0.01"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
              />
            </div>
            <div className="col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Descrição (opcional)</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descrição do produto..."
                rows={3}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={closeModal}
              className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleAddProduct}
              className="flex-1 rounded-lg bg-[#e67e22] py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#d35400]"
            >
              {isEditing ? "Salvar Alterações" : "Adicionar Produto"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Product Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => { setIsDetailModalOpen(false); setSelectedProduct(null); }}
        title="Detalhes do Produto"
      >
        {selectedProduct && (
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedProduct.name}</h3>
                <p className="text-sm text-gray-500">SKU: {selectedProduct.sku}</p>
              </div>
              {getStatusBadge(selectedProduct.status)}
            </div>
            
            <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4">
              <div>
                <p className="text-sm text-gray-500">Categoria</p>
                <p className="font-medium text-gray-900">{selectedProduct.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Preço</p>
                <p className="font-medium text-gray-900">R$ {selectedProduct.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estoque Atual</p>
                <p className={`font-medium ${selectedProduct.stock <= selectedProduct.minStock ? "text-[#ef4444]" : "text-gray-900"}`}>
                  {selectedProduct.stock} unidades
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estoque Mínimo</p>
                <p className="font-medium text-gray-900">{selectedProduct.minStock} unidades</p>
              </div>
            </div>

            {selectedProduct.description && (
              <div>
                <p className="mb-1 text-sm text-gray-500">Descrição</p>
                <p className="text-gray-700">{selectedProduct.description}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => handleDeleteProduct(selectedProduct.id)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#ef4444] py-2.5 text-sm font-medium text-[#ef4444] transition-all duration-200 hover:bg-[#ef4444] hover:text-white"
              >
                <Trash2 className="h-4 w-4" />
                Excluir
              </button>
              <button
                onClick={() => handleEditProduct(selectedProduct)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#e67e22] py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#d35400]"
              >
                <Edit className="h-4 w-4" />
                Editar
              </button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  )
}
