"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import Navigation from "@/components/navigation"

interface Course {
  id: string
  title: string
  description: string
  level: "basico" | "intermediario" | "avancado"
  duration: string
  modules: number
  image: string
  instructor: string
  enrolled: boolean
  progress?: number
}

const mockCourses: Course[] = [
  {
    id: "alfabeto-basico",
    title: "Libras Básico - Primeiros Passos",
    description: "Aprenda os fundamentos da Língua Brasileira de Sinais. Alfabeto, números e cumprimentos básicos.",
    level: "basico",
    duration: "4 semanas",
    modules: 8,
    image: "/images/sonar-curso-libras.png",
    instructor: "Prof. Ana Silva",
    enrolled: false,
  },
  {
    id: "numeros-quantidades",
    title: "Libras no Ambiente de Trabalho",
    description: "Vocabulário específico para o mercado de trabalho e comunicação profissional em Libras.",
    level: "intermediario",
    duration: "6 semanas",
    modules: 12,
    image: "/images/sonar-emprego.png",
    instructor: "Prof. Carlos Santos",
    enrolled: false,
  },
  {
    id: "3",
    title: "Interpretação Avançada em Libras",
    description: "Técnicas avançadas de interpretação e tradução simultânea em Libras.",
    level: "avancado",
    duration: "8 semanas",
    modules: 16,
    image: "/images/sonar-acessibilidade.png",
    instructor: "Prof. Maria Oliveira",
    enrolled: false,
  },
  {
    id: "4",
    title: "Libras para Crianças",
    description: "Metodologia lúdica para ensinar Libras para crianças surdas e ouvintes.",
    level: "intermediario",
    duration: "5 semanas",
    modules: 10,
    image: "/images/sonar-inicio.jpg",
    instructor: "Prof. João Pedro",
    enrolled: false,
  },
  {
    id: "5",
    title: "Gramática Avançada de Libras",
    description: "Estruturas gramaticais complexas e aspectos linguísticos avançados da Libras.",
    level: "avancado",
    duration: "10 semanas",
    modules: 20,
    image: "/images/sonar-curso-libras.png",
    instructor: "Prof. Fernanda Costa",
    enrolled: false,
  },
  {
    id: "6",
    title: "Libras Conversacional",
    description: "Desenvolva fluência em conversas cotidianas e expressões idiomáticas em Libras.",
    level: "basico",
    duration: "6 semanas",
    modules: 12,
    image: "/images/sonar-emprego.png",
    instructor: "Prof. Roberto Lima",
    enrolled: false,
  },
]

export default function CoursesPage() {
  const { user } = useAuth()
  const [courses, setCourses] = useState<Course[]>(mockCourses)
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(mockCourses)
  const [selectedLevel, setSelectedLevel] = useState<string>("todos")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Load user's enrolled courses and progress
    if (user) {
      const userCourses = JSON.parse(localStorage.getItem(`courses_${user.id}`) || "[]")
      const updatedCourses = courses.map((course) => {
        const userCourse = userCourses.find((uc: any) => uc.id === course.id)
        return {
          ...course,
          enrolled: !!userCourse,
          progress: userCourse?.progress || 0,
        }
      })
      setCourses(updatedCourses)
      setFilteredCourses(updatedCourses)
    }
  }, [user])

  useEffect(() => {
    let filtered = courses

    // Filter by level
    if (selectedLevel !== "todos") {
      filtered = filtered.filter((course) => course.level === selectedLevel)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredCourses(filtered)
  }, [courses, selectedLevel, searchTerm])

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

  const handleEnroll = (courseId: string) => {
    if (!user) {
      alert("Faça login para se inscrever nos cursos")
      return
    }

    const course = courses.find((c) => c.id === courseId)
    if (!course) return

    // Update course enrollment
    const updatedCourses = courses.map((c) => (c.id === courseId ? { ...c, enrolled: true, progress: 0 } : c))
    setCourses(updatedCourses)

    // Save to localStorage
    const userCourses = JSON.parse(localStorage.getItem(`courses_${user.id}`) || "[]")
    const newCourse = {
      id: courseId,
      title: course.title,
      progress: 0,
      enrolledAt: new Date(),
    }

    if (!userCourses.find((uc: any) => uc.id === courseId)) {
      userCourses.push(newCourse)
      localStorage.setItem(`courses_${user.id}`, JSON.stringify(userCourses))
    }
  }

  return (
    <div className="bg-blue-50 min-h-screen">
      <Navigation />

      <div className="max-w-7xl mx-auto pt-8 pb-12 px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-4">Cursos de Libras</h1>
          <p className="text-blue-600 text-lg max-w-2xl mx-auto">
            Aprenda Língua Brasileira de Sinais com nossos cursos especializados, desde o nível básico até técnicas
            avançadas de interpretação.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar cursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-blue-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Level Filter */}
            <div className="flex gap-2">
              {[
                { value: "todos", label: "Todos os Níveis" },
                { value: "basico", label: "Básico" },
                { value: "intermediario", label: "Intermediário" },
                { value: "avancado", label: "Avançado" },
              ].map((level) => (
                <button
                  key={level.value}
                  onClick={() => setSelectedLevel(level.value)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    selectedLevel === level.value
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-32 h-32 object-contain" />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                    {getLevelText(course.level)}
                  </span>
                  {course.enrolled && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      Inscrito
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-blue-800 mb-2">{course.title}</h3>
                <p className="text-blue-600 text-sm mb-4 line-clamp-3">{course.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-blue-700">
                    <span>Duração: {course.duration}</span>
                    <span>{course.modules} módulos</span>
                  </div>
                  <div className="text-sm text-blue-600">Instrutor: {course.instructor}</div>
                </div>

                {course.enrolled && course.progress !== undefined && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-blue-600 mb-1">
                      <span>Progresso</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-blue-100 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {course.enrolled ? (
                  <Link
                    href={`/curso/${course.id}`}
                    className="w-full py-2 px-4 rounded-md font-medium bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors text-center block"
                  >
                    Continuar Curso
                  </Link>
                ) : (
                  <button
                    onClick={() => handleEnroll(course.id)}
                    className="w-full py-2 px-4 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Inscrever-se
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-blue-600 text-6xl mb-4">🔍</div>
            <p className="text-blue-800 text-lg mb-2">Nenhum curso encontrado</p>
            <p className="text-blue-600">Tente ajustar os filtros de busca</p>
          </div>
        )}
      </div>
    </div>
  )
}
