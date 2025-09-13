"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navigation from "@/components/navigation"
import { useAuth } from "@/lib/auth"

export default function CadastrarVagaPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.type !== "empresa")) {
      router.push("/entrar")
    }
  }, [user, isLoading, router])

  const [formData, setFormData] = useState({
    // Dados da empresa
    company: "",
    site: "",
    email: "",
    phone: "",
    logo: null as File | null,

    // Detalhes da vaga
    title: "",
    location: "",
    type: "",
    mode: "",
    seniority: "",
    salary: "",
    summary: "",
    description: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    deadline: "",
    applyUrl: "",
    tags: "",

    // Preferências
    highlight: false,
    acceptRemote: false,
    receiveEmail: true,
    terms: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null
      setFormData((prev) => ({ ...prev, [name]: file }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    const newJob = {
      id: Date.now().toString(),
      ...formData,
      companyId: user.id,
      createdAt: new Date(),
      status: "active",
    }

    const existingJobs = JSON.parse(localStorage.getItem("sonar_jobs") || "[]")
    existingJobs.push(newJob)
    localStorage.setItem("sonar_jobs", JSON.stringify(existingJobs))

    alert("Vaga cadastrada com sucesso!")
    router.push("/empresa")
  }

  const handleReset = () => {
    setFormData({
      company: "",
      site: "",
      email: "",
      phone: "",
      logo: null,
      title: "",
      location: "",
      type: "",
      mode: "",
      seniority: "",
      salary: "",
      summary: "",
      description: "",
      responsibilities: "",
      requirements: "",
      benefits: "",
      deadline: "",
      applyUrl: "",
      tags: "",
      highlight: false,
      acceptRemote: false,
      receiveEmail: true,
      terms: false,
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        <Navigation />
        <div className="flex items-center justify-center pt-20">
          <div className="text-blue-800">Carregando...</div>
        </div>
      </div>
    )
  }

  if (!user || user.type !== "empresa") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        <Navigation />
        <div className="max-w-md mx-auto pt-20 px-6">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-red-600 text-6xl mb-4">🚫</div>
            <h1 className="text-xl font-semibold text-blue-800 mb-4">Acesso Restrito</h1>
            <p className="text-blue-600 mb-6">
              Esta página é exclusiva para empresas cadastradas. Faça login com uma conta de empresa para continuar.
            </p>
            <Link
              href="/entrar"
              className="bg-blue-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Fazer Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Cadastrar nova vaga</h1>
          <p className="text-lg text-blue-700 max-w-2xl mx-auto">
            Divulgue oportunidades e encontre talentos rapidamente na comunidade surda e deficiente auditiva.
          </p>
          <p className="text-sm text-blue-600 mt-2">
            Publicando como: <strong>{user.name}</strong>
          </p>
        </section>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <fieldset className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
            <legend className="text-lg font-semibold text-blue-800 px-3 mb-6">Dados da empresa</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-blue-900 mb-2">
                  Nome da empresa <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company || user.name}
                  onChange={handleInputChange}
                  placeholder="Ex.: Tech Solutions LTDA"
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="site" className="block text-sm font-medium text-blue-900 mb-2">
                  Site da empresa
                </label>
                <input
                  type="url"
                  id="site"
                  name="site"
                  value={formData.site}
                  onChange={handleInputChange}
                  placeholder="https://empresa.com.br"
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-blue-900 mb-2">
                  E-mail de contato <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || user.email}
                  onChange={handleInputChange}
                  placeholder="recrutamento@empresa.com.br"
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-blue-900 mb-2">
                  Telefone/WhatsApp
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(11) 99999-9999"
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="logo" className="block text-sm font-medium text-blue-900 mb-2">
                  Logo da empresa
                </label>
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  onChange={handleInputChange}
                  accept="image/*"
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-sm text-blue-600 mt-1">PNG/JPG até 2MB</p>
              </div>
            </div>
          </fieldset>

          {/* Detalhes da vaga */}
          <fieldset className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
            <legend className="text-lg font-semibold text-blue-800 px-3 mb-6">Detalhes da vaga</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-blue-900 mb-2">
                  Título da vaga <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Ex.: Desenvolvedor(a) Front-End Pleno"
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-blue-900 mb-2">
                  Localidade <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="São Paulo, SP"
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-blue-900 mb-2">
                  Tipo de contratação <span className="text-red-500">*</span>
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  <option value="CLT">CLT</option>
                  <option value="PJ">PJ</option>
                  <option value="Estágio">Estágio</option>
                  <option value="Temporário">Temporário</option>
                  <option value="Freelancer">Freelancer</option>
                </select>
              </div>

              <div>
                <label htmlFor="mode" className="block text-sm font-medium text-blue-900 mb-2">
                  Modelo de trabalho <span className="text-red-500">*</span>
                </label>
                <select
                  id="mode"
                  name="mode"
                  value={formData.mode}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  <option value="Presencial">Presencial</option>
                  <option value="Híbrido">Híbrido</option>
                  <option value="Remoto">Remoto</option>
                </select>
              </div>

              <div>
                <label htmlFor="seniority" className="block text-sm font-medium text-blue-900 mb-2">
                  Senioridade
                </label>
                <select
                  id="seniority"
                  name="seniority"
                  value={formData.seniority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  <option value="Júnior">Júnior</option>
                  <option value="Pleno">Pleno</option>
                  <option value="Sênior">Sênior</option>
                  <option value="Liderança">Liderança</option>
                </select>
              </div>

              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-blue-900 mb-2">
                  Faixa salarial (mensal)
                </label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  placeholder="Ex.: R$ 5.000 — R$ 7.000"
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="summary" className="block text-sm font-medium text-blue-900 mb-2">
                  Resumo curto <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  maxLength={160}
                  placeholder="Uma frase objetiva sobre a oportunidade"
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <p className="text-sm text-blue-600 mt-1">Até 160 caracteres</p>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-blue-900 mb-2">
                  Descrição da vaga <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Contexto da vaga, missão, desafios, atividades principais..."
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="responsibilities" className="block text-sm font-medium text-blue-900 mb-2">
                  Responsabilidades
                </label>
                <textarea
                  id="responsibilities"
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Liste as principais responsabilidades (uma por linha)"
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="requirements" className="block text-sm font-medium text-blue-900 mb-2">
                  Requisitos
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Formação, tecnologias, experiências (uma por linha)"
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="benefits" className="block text-sm font-medium text-blue-900 mb-2">
                  Benefícios
                </label>
                <textarea
                  id="benefits"
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="VR, VA, Plano de saúde, Bônus, etc."
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                />
              </div>

              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-blue-900 mb-2">
                  Data limite de candidatura
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="applyUrl" className="block text-sm font-medium text-blue-900 mb-2">
                  Link para candidatura
                </label>
                <input
                  type="url"
                  id="applyUrl"
                  name="applyUrl"
                  value={formData.applyUrl}
                  onChange={handleInputChange}
                  placeholder="https://empresa.com.br/carreiras/vaga-123"
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="tags" className="block text-sm font-medium text-blue-900 mb-2">
                  Tags/área
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="Ex.: TI, Marketing, Vendas"
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <p className="text-sm text-blue-600 mt-1">Separe por vírgula</p>
              </div>
            </div>
          </fieldset>

          {/* Preferências de publicação */}
          <fieldset className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
            <legend className="text-lg font-semibold text-blue-800 px-3 mb-6">Preferências de publicação</legend>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <input
                  type="checkbox"
                  id="highlight"
                  name="highlight"
                  checked={formData.highlight}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="highlight" className="text-sm font-medium text-blue-900">
                  Destacar vaga no topo
                </label>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <input
                  type="checkbox"
                  id="acceptRemote"
                  name="acceptRemote"
                  checked={formData.acceptRemote}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="acceptRemote" className="text-sm font-medium text-blue-900">
                  Aceita candidatos de outras cidades/países
                </label>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <input
                  type="checkbox"
                  id="receiveEmail"
                  name="receiveEmail"
                  checked={formData.receiveEmail}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="receiveEmail" className="text-sm font-medium text-blue-900">
                  Receber candidaturas por e-mail
                </label>
              </div>
            </div>
          </fieldset>

          {/* Ações */}
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
            <div className="flex items-center space-x-3 mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleInputChange}
                required
                className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className="text-sm font-medium text-blue-900">
                Concordo com os termos de uso e políticas de publicação.
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 border border-blue-300 text-blue-700 rounded-lg font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Limpar
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-lg"
              >
                Publicar vaga
              </button>
            </div>

            <p className="text-sm text-blue-600 mt-4 text-center">
              Campos marcados com <span className="text-red-500">*</span> são obrigatórios.
            </p>
          </div>
        </form>
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
