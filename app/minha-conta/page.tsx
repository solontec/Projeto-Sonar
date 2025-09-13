"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import Navigation from "@/components/navigation"

interface JobApplication {
  id: string
  jobTitle: string
  company: string
  appliedAt: Date
  status: "pendente" | "visualizado" | "rejeitado" | "aprovado"
}

interface CourseModule {
  id: string
  title: string
  completed: boolean
  completedAt?: Date
}

interface CourseProgress {
  id: string
  title: string
  progress: number
  completedAt?: Date
  modules: CourseModule[]
  totalModules: number
  completedModules: number
  lastAccessed?: Date
  timeSpent: number // in minutes
  level: "basico" | "intermediario" | "avancado"
}

export default function MyAccountPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("perfil")
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [courses, setCourses] = useState<CourseProgress[]>([])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/entrar")
      return
    }

    // Load user data
    if (user) {
      // Simulate loading applications
      const userApplications = JSON.parse(localStorage.getItem(`applications_${user.id}`) || "[]")
      setApplications(userApplications)

      const userCourses = JSON.parse(localStorage.getItem(`courses_${user.id}`) || "[]")
      const enhancedCourses = userCourses.map((course: any) => ({
        ...course,
        modules: course.modules || generateMockModules(course.id, course.totalModules || 8),
        totalModules: course.totalModules || 8,
        completedModules: course.completedModules || Math.floor(((course.progress || 0) / 100) * 8),
        timeSpent: course.timeSpent || Math.floor(Math.random() * 120) + 30,
        level: course.level || "basico",
        lastAccessed: course.lastAccessed ? new Date(course.lastAccessed) : new Date(),
      }))
      setCourses(enhancedCourses)
    }
  }, [user, isLoading, router])

  const generateMockModules = (courseId: string, totalModules: number): CourseModule[] => {
    const moduleTemplates = [
      "Introdução e Fundamentos",
      "Alfabeto e Números",
      "Cumprimentos e Apresentações",
      "Família e Relacionamentos",
      "Trabalho e Profissões",
      "Tempo e Calendário",
      "Cores e Objetos",
      "Sentimentos e Emoções",
      "Comida e Bebida",
      "Casa e Móveis",
      "Transporte e Viagem",
      "Saúde e Corpo",
      "Educação e Escola",
      "Esportes e Lazer",
      "Natureza e Animais",
      "Tecnologia e Comunicação",
    ]

    return Array.from({ length: totalModules }, (_, index) => ({
      id: `${courseId}-module-${index + 1}`,
      title: `Módulo ${index + 1}: ${moduleTemplates[index] || `Conteúdo ${index + 1}`}`,
      completed: Math.random() > 0.6, // Random completion for demo
      completedAt: Math.random() > 0.6 ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) : undefined,
    }))
  }

  const completeModule = (courseId: string, moduleId: string) => {
    const updatedCourses = courses.map((course) => {
      if (course.id === courseId) {
        const updatedModules = course.modules.map((module) =>
          module.id === moduleId ? { ...module, completed: true, completedAt: new Date() } : module,
        )
        const completedCount = updatedModules.filter((m) => m.completed).length
        const newProgress = Math.round((completedCount / course.totalModules) * 100)

        return {
          ...course,
          modules: updatedModules,
          completedModules: completedCount,
          progress: newProgress,
          lastAccessed: new Date(),
          completedAt: newProgress === 100 ? new Date() : undefined,
        }
      }
      return course
    })

    setCourses(updatedCourses)

    // Save to localStorage
    if (user) {
      localStorage.setItem(`courses_${user.id}`, JSON.stringify(updatedCourses))
    }
  }

  if (isLoading) {
    return (
      <div className="bg-blue-50 min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center pt-20">
          <div className="text-blue-800">Carregando...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-100 text-yellow-800"
      case "visualizado":
        return "bg-blue-100 text-blue-800"
      case "aprovado":
        return "bg-green-100 text-green-800"
      case "rejeitado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "basico":
        return "bg-green-100 text-green-800"
      case "intermediario":
        return "bg-yellow-100 text-yellow-800"
      case "avancado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getLevelText = (level: string) => {
    switch (level) {
      case "basico":
        return "Básico"
      case "intermediario":
        return "Intermediário"
      case "avancado":
        return "Avançado"
      default:
        return level
    }
  }

  return (
    <div className="bg-blue-50 min-h-screen">
      <Navigation />

      <div className="max-w-4xl mx-auto pt-8 pb-12 px-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 px-6 py-8 text-white">
            <h1 className="text-2xl font-semibold mb-2">Minha Conta</h1>
            <p className="text-blue-100">Bem-vindo, {user.name}!</p>
            <p className="text-sm text-blue-200 capitalize">
              Conta:{" "}
              {user.type === "candidato"
                ? "Candidato a Emprego"
                : user.type === "empresa"
                  ? "Empresa Recrutadora"
                  : "Aluno de Libras"}
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-blue-100">
            <div className="flex space-x-8 px-6">
              {[
                { id: "perfil", label: "Perfil" },
                { id: "candidaturas", label: "Candidaturas", show: user.type === "candidato" },
                { id: "cursos", label: "Cursos" },
                { id: "curriculo", label: "Currículo", show: user.type === "candidato" },
              ]
                .filter((tab) => tab.show !== false)
                .map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-blue-700 hover:text-blue-900 hover:border-blue-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "perfil" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">Informações do Perfil</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-blue-900 font-medium mb-2">Nome Completo</label>
                    <input
                      type="text"
                      value={user.name}
                      readOnly
                      className="w-full border border-blue-300 rounded-md p-3 bg-blue-50 text-blue-800"
                    />
                  </div>

                  <div>
                    <label className="block text-blue-900 font-medium mb-2">E-mail</label>
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className="w-full border border-blue-300 rounded-md p-3 bg-blue-50 text-blue-800"
                    />
                  </div>

                  <div>
                    <label className="block text-blue-900 font-medium mb-2">Tipo de Conta</label>
                    <input
                      type="text"
                      value={
                        user.type === "candidato"
                          ? "Candidato a Emprego"
                          : user.type === "empresa"
                            ? "Empresa Recrutadora"
                            : "Aluno de Libras"
                      }
                      readOnly
                      className="w-full border border-blue-300 rounded-md p-3 bg-blue-50 text-blue-800 capitalize"
                    />
                  </div>

                  <div>
                    <label className="block text-blue-900 font-medium mb-2">Membro desde</label>
                    <input
                      type="text"
                      value={new Date(user.createdAt).toLocaleDateString("pt-BR")}
                      readOnly
                      className="w-full border border-blue-300 rounded-md p-3 bg-blue-50 text-blue-800"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "candidaturas" && user.type === "candidato" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">Minhas Candidaturas</h2>

                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-blue-600 text-6xl mb-4">📋</div>
                    <p className="text-blue-800 mb-2">Você ainda não se candidatou a nenhuma vaga</p>
                    <p className="text-blue-600 text-sm">Explore as vagas disponíveis e candidate-se!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((application) => (
                      <div
                        key={application.id}
                        className="border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-blue-800">{application.jobTitle}</h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}
                          >
                            {application.status}
                          </span>
                        </div>
                        <p className="text-blue-600 mb-2">{application.company}</p>
                        <p className="text-sm text-blue-500">
                          Candidatura enviada em {new Date(application.appliedAt).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "cursos" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">Meus Cursos</h2>

                {courses.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-blue-600 text-6xl mb-4">🤟</div>
                    <p className="text-blue-800 mb-2">Você ainda não iniciou nenhum curso</p>
                    <p className="text-blue-600 text-sm">Comece a aprender Libras hoje mesmo!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {courses.map((course) => (
                      <div key={course.id} className="border border-blue-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-blue-800 text-lg mb-2">{course.title}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}
                              >
                                {getLevelText(course.level)}
                              </span>
                              {course.completedAt && (
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                  Concluído
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right text-sm text-blue-600">
                            <p>Tempo estudado: {course.timeSpent}min</p>
                            {course.lastAccessed && (
                              <p>Último acesso: {course.lastAccessed.toLocaleDateString("pt-BR")}</p>
                            )}
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-blue-600 mb-1">
                            <span>Progresso Geral</span>
                            <span>
                              {course.progress}% ({course.completedModules}/{course.totalModules} módulos)
                            </span>
                          </div>
                          <div className="w-full bg-blue-100 rounded-full h-3">
                            <div
                              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-medium text-blue-800 mb-3">Progresso por Módulo:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {course.modules.map((module) => (
                              <div
                                key={module.id}
                                className={`p-3 rounded-lg border transition-colors ${
                                  module.completed
                                    ? "bg-green-50 border-green-200"
                                    : "bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-200"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                        module.completed ? "bg-green-500 text-white" : "bg-gray-300"
                                      }`}
                                    >
                                      {module.completed && (
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                          <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      )}
                                    </div>
                                    <span
                                      className={`text-sm font-medium ${
                                        module.completed ? "text-green-800" : "text-gray-700"
                                      }`}
                                    >
                                      {module.title}
                                    </span>
                                  </div>
                                  {!module.completed && (
                                    <button
                                      onClick={() => completeModule(course.id, module.id)}
                                      className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                                    >
                                      Marcar como concluído
                                    </button>
                                  )}
                                </div>
                                {module.completedAt && (
                                  <p className="text-xs text-green-600 mt-1">
                                    Concluído em {module.completedAt.toLocaleDateString("pt-BR")}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {course.completedAt && (
                          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-800 font-medium">
                              🎉 Parabéns! Curso concluído em {course.completedAt.toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "curriculo" && user.type === "candidato" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">Meu Currículo</h2>

                <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
                  <div className="text-blue-600 text-6xl mb-4">📄</div>
                  <p className="text-blue-800 mb-2">Funcionalidade em desenvolvimento</p>
                  <p className="text-blue-600 text-sm">
                    Em breve você poderá criar e gerenciar seu currículo diretamente na plataforma
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
