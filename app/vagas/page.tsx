"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import { useAuth } from "@/lib/auth"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  mode: string
  salary: string
  summary: string
  tags: string[]
  postedAt: string
  highlighted: boolean
  companyId: string
}

const sampleJobs: Job[] = [
  {
    id: "1",
    title: "Desenvolvedor Front-end",
    company: "TechLibras",
    location: "São Paulo, SP",
    type: "CLT",
    mode: "Híbrido",
    salary: "R$ 5.000 - R$ 8.000",
    summary:
      "Buscamos desenvolvedor front-end com experiência em React e TypeScript. Empresa inclusiva com intérpretes de Libras disponíveis.",
    tags: ["React", "TypeScript", "JavaScript", "CSS", "Libras"],
    postedAt: "2025-01-10",
    highlighted: true,
    companyId: "tech1",
  },
  {
    id: "2",
    title: "Designer UX/UI",
    company: "InclusiveDesign",
    location: "Rio de Janeiro, RJ",
    type: "PJ",
    mode: "Remoto",
    salary: "R$ 4.000 - R$ 6.500",
    summary:
      "Procuramos designer especializado em acessibilidade e experiência do usuário. Conhecimento em design inclusivo é um diferencial.",
    tags: ["Figma", "Adobe XD", "UX", "UI", "Acessibilidade"],
    postedAt: "2025-01-09",
    highlighted: false,
    companyId: "design1",
  },
  {
    id: "3",
    title: "Analista de Dados",
    company: "DataSurdo",
    location: "Brasília, DF",
    type: "CLT",
    mode: "Presencial",
    salary: "R$ 6.000 - R$ 9.000",
    summary:
      "Vaga para analista de dados com foco em análise estatística. Ambiente de trabalho 100% acessível com comunicação em Libras.",
    tags: ["Python", "SQL", "Power BI", "Excel", "Estatística"],
    postedAt: "2025-01-08",
    highlighted: false,
    companyId: "data1",
  },
  {
    id: "4",
    title: "Desenvolvedor Mobile",
    company: "AppInclusivo",
    location: "Belo Horizonte, MG",
    type: "CLT",
    mode: "Híbrido",
    salary: "R$ 5.500 - R$ 8.500",
    summary:
      "Desenvolvedor mobile para criar aplicativos acessíveis. Experiência com React Native e conhecimento em acessibilidade mobile.",
    tags: ["React Native", "Flutter", "iOS", "Android", "Acessibilidade"],
    postedAt: "2025-01-07",
    highlighted: true,
    companyId: "mobile1",
  },
  {
    id: "5",
    title: "Intérprete de Libras",
    company: "EduLibras",
    location: "Porto Alegre, RS",
    type: "CLT",
    mode: "Presencial",
    salary: "R$ 3.500 - R$ 5.000",
    summary:
      "Intérprete de Libras para atuar em ambiente corporativo de tecnologia. Certificação PROLIBRAS obrigatória.",
    tags: ["Libras", "Interpretação", "PROLIBRAS", "Educação", "Comunicação"],
    postedAt: "2025-01-06",
    highlighted: false,
    companyId: "edu1",
  },
  {
    id: "6",
    title: "Suporte Técnico",
    company: "TechSupport+",
    location: "Recife, PE",
    type: "CLT",
    mode: "Remoto",
    salary: "R$ 2.800 - R$ 4.200",
    summary:
      "Suporte técnico especializado em atendimento à comunidade surda. Fluência em Libras e conhecimento técnico em informática.",
    tags: ["Suporte", "Libras", "Informática", "Atendimento", "Remoto"],
    postedAt: "2025-01-05",
    highlighted: false,
    companyId: "support1",
  },
]

export default function VagasPage() {
  const { user } = useAuth()
  const [jobs, setJobs] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [modeFilter, setModeFilter] = useState("")

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("sonar_jobs") || "[]")
    const allJobs = [...sampleJobs, ...storedJobs]
    // Remove duplicates based on id
    const uniqueJobs = allJobs.filter((job, index, self) => index === self.findIndex((j) => j.id === job.id))
    setJobs(uniqueJobs)

    // Store the merged jobs back to localStorage
    localStorage.setItem("sonar_jobs", JSON.stringify(uniqueJobs))
  }, [])

  const handleApply = (jobId: string, jobTitle: string, company: string) => {
    if (!user) {
      alert("Você precisa estar logado para se candidatar a uma vaga.")
      return
    }

    if (user.type === "empresa") {
      alert("Empresas não podem se candidatar a vagas.")
      return
    }

    const application = {
      id: Date.now().toString(),
      jobId,
      jobTitle,
      company,
      userId: user.id,
      appliedAt: new Date(),
      status: "pendente",
    }

    const existingApplications = JSON.parse(localStorage.getItem(`applications_${user.id}`) || "[]")

    // Check if already applied
    if (existingApplications.find((app: any) => app.jobId === jobId)) {
      alert("Você já se candidatou a esta vaga.")
      return
    }

    existingApplications.push(application)
    localStorage.setItem(`applications_${user.id}`, JSON.stringify(existingApplications))

    alert("Candidatura enviada com sucesso!")
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase())
    const matchesType = !typeFilter || job.type === typeFilter
    const matchesMode = !modeFilter || job.mode === modeFilter

    return matchesSearch && matchesLocation && matchesType && matchesMode
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "Há 1 dia"
    if (diffDays < 7) return `Há ${diffDays} dias`
    if (diffDays < 30) return `Há ${Math.floor(diffDays / 7)} semana${Math.floor(diffDays / 7) > 1 ? "s" : ""}`
    return `Há ${Math.floor(diffDays / 30)} mês${Math.floor(diffDays / 30) > 1 ? "es" : ""}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Oportunidades de Trabalho</h1>
          <p className="text-lg text-blue-700 max-w-2xl mx-auto mb-8">
            Vagas especialmente voltadas para a comunidade surda e deficientes auditivos
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user?.type === "empresa" ? (
              <>
                <Link
                  href="/cadastrar-vaga"
                  className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
                >
                  Cadastrar Nova Vaga
                </Link>
                <Link
                  href="/empresa"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Área da Empresa
                </Link>
              </>
            ) : (
              <Link
                href="/minha-conta"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                {user ? "Minhas Candidaturas" : "Fazer Login"}
              </Link>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-800 mb-4">Filtrar Vagas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-blue-900 mb-2">
                Buscar por palavra-chave
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cargo, empresa, tecnologia..."
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-blue-900 mb-2">
                Localização
              </label>
              <input
                type="text"
                id="location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                placeholder="Cidade, estado..."
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-blue-900 mb-2">
                Tipo de contratação
              </label>
              <select
                id="type"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Todos</option>
                <option value="CLT">CLT</option>
                <option value="PJ">PJ</option>
                <option value="Estágio">Estágio</option>
                <option value="Temporário">Temporário</option>
                <option value="Freelancer">Freelancer</option>
              </select>
            </div>

            <div>
              <label htmlFor="mode" className="block text-sm font-medium text-blue-900 mb-2">
                Modelo de trabalho
              </label>
              <select
                id="mode"
                value={modeFilter}
                onChange={(e) => setModeFilter(e.target.value)}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Todos</option>
                <option value="Presencial">Presencial</option>
                <option value="Híbrido">Híbrido</option>
                <option value="Remoto">Remoto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-blue-700">
            {filteredJobs.length} vaga{filteredJobs.length !== 1 ? "s" : ""} encontrada
            {filteredJobs.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-12 text-center">
              <div className="text-blue-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Nenhuma vaga encontrada</h3>
              <p className="text-blue-600 mb-6">
                {jobs.length === 0
                  ? "Ainda não há vagas cadastradas. Seja a primeira empresa a publicar uma oportunidade!"
                  : "Tente ajustar os filtros ou cadastre uma nova vaga para a comunidade."}
              </p>
              {user?.type === "empresa" && (
                <Link
                  href="/cadastrar-vaga"
                  className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors inline-block"
                >
                  Cadastrar Vaga
                </Link>
              )}
            </div>
          ) : (
            filteredJobs.map((job) => (
              <article
                key={job.id}
                className={`bg-white rounded-xl shadow-sm border transition-all hover:shadow-md ${
                  job.highlighted ? "border-teal-200 bg-gradient-to-r from-teal-50 to-blue-50" : "border-blue-100"
                }`}
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        {job.highlighted && (
                          <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-2 py-1 rounded-full">
                            Destaque
                          </span>
                        )}
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-blue-800 mb-1">{job.title}</h3>
                          <p className="text-blue-600 font-medium mb-2">{job.company}</p>
                        </div>
                      </div>

                      <p className="text-blue-900 mb-4 leading-relaxed">{job.summary}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-blue-700">
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>{job.location}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span>{job.type}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                          <span>{job.mode}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                            />
                          </svg>
                          <span>{job.salary}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <span className="text-sm text-blue-600">{formatDate(job.postedAt)}</span>

                      <div className="flex gap-2">
                        <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                          Ver Detalhes
                        </button>
                        {user?.type !== "empresa" && (
                          <button
                            onClick={() => handleApply(job.id, job.title, job.company)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                          >
                            {user ? "Candidatar-se" : "Fazer Login"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Call to Action */}
        {filteredJobs.length > 0 && (
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl shadow-lg p-8 mt-12 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Não encontrou a vaga ideal?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              {user?.type === "empresa"
                ? "Publique mais vagas exclusivas para a comunidade surda e deficiente auditiva."
                : "Cadastre sua empresa e publique vagas exclusivas para a comunidade surda e deficiente auditiva."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user?.type === "empresa" ? (
                <>
                  <Link
                    href="/cadastrar-vaga"
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors"
                  >
                    Cadastrar Vaga
                  </Link>
                  <Link
                    href="/empresa"
                    className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors"
                  >
                    Área da Empresa
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/cadastrar"
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors"
                  >
                    Cadastrar Empresa
                  </Link>
                  <Link
                    href="/minha-conta"
                    className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors"
                  >
                    {user ? "Minha Conta" : "Fazer Login"}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
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
