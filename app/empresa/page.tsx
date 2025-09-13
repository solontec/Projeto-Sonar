"use client"

import { useState } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"

// Mock data para demonstração
const mockCompanyJobs = [
  {
    id: 1,
    title: "Desenvolvedor(a) Front-End Pleno",
    location: "São Paulo, SP",
    type: "CLT",
    mode: "Híbrido",
    salary: "R$ 5.000 — R$ 7.000",
    status: "Ativa",
    applications: 12,
    views: 156,
    postedAt: "2025-01-09",
    highlighted: true,
  },
  {
    id: 2,
    title: "Designer UX/UI Sênior",
    location: "Rio de Janeiro, RJ",
    type: "PJ",
    mode: "Remoto",
    salary: "R$ 6.000 — R$ 9.000",
    status: "Pausada",
    applications: 8,
    views: 89,
    postedAt: "2025-01-08",
    highlighted: false,
  },
  {
    id: 3,
    title: "Analista de Marketing Digital",
    location: "Belo Horizonte, MG",
    type: "CLT",
    mode: "Presencial",
    salary: "R$ 3.500 — R$ 5.000",
    status: "Expirada",
    applications: 5,
    views: 67,
    postedAt: "2024-12-15",
    highlighted: false,
  },
]

const mockStats = {
  totalJobs: 3,
  activeJobs: 1,
  totalApplications: 25,
  totalViews: 312,
}

export default function EmpresaPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativa":
        return "bg-green-100 text-green-800"
      case "Pausada":
        return "bg-yellow-100 text-yellow-800"
      case "Expirada":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Área da Empresa</h1>
          <p className="text-lg text-blue-700 max-w-2xl">
            Gerencie suas vagas e acompanhe o desempenho das suas publicações na plataforma Sonar.
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-8">
          <div className="border-b border-blue-100">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "dashboard", label: "Dashboard", icon: "📊" },
                { id: "vagas", label: "Minhas Vagas", icon: "💼" },
                { id: "candidatos", label: "Candidatos", icon: "👥" },
                { id: "configuracoes", label: "Configurações", icon: "⚙️" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-blue-500 hover:text-blue-700 hover:border-blue-300"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-medium mb-1">Total de Vagas</p>
                        <p className="text-3xl font-bold text-white">{mockStats.totalJobs}</p>
                      </div>
                      <div className="text-4xl text-blue-200">💼</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm font-medium mb-1">Vagas Ativas</p>
                        <p className="text-3xl font-bold text-white">{mockStats.activeJobs}</p>
                      </div>
                      <div className="text-4xl text-green-200">✅</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm font-medium mb-1">Candidaturas</p>
                        <p className="text-3xl font-bold text-white">{mockStats.totalApplications}</p>
                      </div>
                      <div className="text-4xl text-purple-200">👥</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-teal-100 text-sm font-medium mb-1">Visualizações</p>
                        <p className="text-3xl font-bold text-white">{mockStats.totalViews}</p>
                      </div>
                      <div className="text-4xl text-teal-200">👁️</div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">Ações Rápidas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                      href="/cadastrar-vaga"
                      className="bg-blue-600 text-white p-4 rounded-lg text-center hover:bg-blue-700 transition-colors"
                    >
                      <div className="text-2xl mb-2">➕</div>
                      <div className="font-semibold">Nova Vaga</div>
                      <div className="text-sm text-blue-100">Cadastrar oportunidade</div>
                    </Link>

                    <button
                      onClick={() => setActiveTab("candidatos")}
                      className="bg-teal-600 text-white p-4 rounded-lg text-center hover:bg-teal-700 transition-colors"
                    >
                      <div className="text-2xl mb-2">📋</div>
                      <div className="font-semibold">Ver Candidatos</div>
                      <div className="text-sm text-teal-100">Revisar aplicações</div>
                    </button>

                    <button
                      onClick={() => setActiveTab("vagas")}
                      className="bg-purple-600 text-white p-4 rounded-lg text-center hover:bg-purple-700 transition-colors"
                    >
                      <div className="text-2xl mb-2">📊</div>
                      <div className="font-semibold">Gerenciar Vagas</div>
                      <div className="text-sm text-purple-100">Editar e pausar</div>
                    </button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">Atividade Recente</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-800">Nova candidatura para "Desenvolvedor(a) Front-End Pleno"</span>
                      <span className="text-green-600 text-sm ml-auto">Há 2 horas</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-blue-800">Vaga "Designer UX/UI Sênior" foi pausada</span>
                      <span className="text-blue-600 text-sm ml-auto">Há 1 dia</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-yellow-800">Vaga "Analista de Marketing Digital" expira em 3 dias</span>
                      <span className="text-yellow-600 text-sm ml-auto">Há 2 dias</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Vagas Tab */}
            {activeTab === "vagas" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-blue-800">Minhas Vagas Publicadas</h3>
                  <Link
                    href="/cadastrar-vaga"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Nova Vaga
                  </Link>
                </div>

                <div className="space-y-4">
                  {mockCompanyJobs.map((job) => (
                    <div key={job.id} className="bg-white border border-blue-100 rounded-lg p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-semibold text-blue-800">{job.title}</h4>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}
                            >
                              {job.status}
                            </span>
                            {job.highlighted && (
                              <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-2 py-1 rounded-full">
                                Destaque
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-blue-600 mb-4">
                            <span>📍 {job.location}</span>
                            <span>💼 {job.type}</span>
                            <span>🏠 {job.mode}</span>
                            <span>💰 {job.salary}</span>
                          </div>

                          <div className="flex gap-6 text-sm text-blue-700">
                            <span>👥 {job.applications} candidaturas</span>
                            <span>👁️ {job.views} visualizações</span>
                            <span>📅 Publicada em {formatDate(job.postedAt)}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                            Editar
                          </button>
                          <button className="bg-yellow-100 text-yellow-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors">
                            {job.status === "Ativa" ? "Pausar" : "Ativar"}
                          </button>
                          <button className="bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                            Excluir
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Candidatos Tab */}
            {activeTab === "candidatos" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-blue-800">Candidatos Recentes</h3>

                <div className="bg-blue-50 rounded-lg p-8 text-center border border-blue-100">
                  <div className="text-blue-400 text-6xl mb-4">👥</div>
                  <h4 className="text-xl font-semibold text-blue-800 mb-2">Nenhum candidato ainda</h4>
                  <p className="text-blue-600 mb-6">
                    Quando alguém se candidatar às suas vagas, você verá os perfis aqui.
                  </p>
                  <Link
                    href="/cadastrar-vaga"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
                  >
                    Publicar Nova Vaga
                  </Link>
                </div>
              </div>
            )}

            {/* Configurações Tab */}
            {activeTab === "configuracoes" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-blue-800">Configurações da Empresa</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-blue-100 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-800 mb-4">Informações da Empresa</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-900 mb-1">Nome da Empresa</label>
                        <input
                          type="text"
                          defaultValue="Tech Solutions LTDA"
                          className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-900 mb-1">E-mail de Contato</label>
                        <input
                          type="email"
                          defaultValue="contato@techsolutions.com"
                          className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-900 mb-1">Site da Empresa</label>
                        <input
                          type="url"
                          defaultValue="https://techsolutions.com"
                          className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-blue-100 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-800 mb-4">Preferências de Notificação</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-900">Novas candidaturas</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-900">Relatórios semanais</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-900">Vagas expirando</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-900">Novidades da plataforma</span>
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Salvar Configurações
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-blue-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <span className="text-blue-700">© 2025 Sonar</span>
            <div className="flex space-x-6">
              <Link href="/termos" className="text-blue-600 hover:text-blue-800 text-sm">
                Termos
              </Link>
              <Link href="/privacidade" className="text-blue-600 hover:text-blue-800 text-sm">
                Privacidade
              </Link>
              <Link href="/ajuda" className="text-blue-600 hover:text-blue-800 text-sm">
                Ajuda
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
