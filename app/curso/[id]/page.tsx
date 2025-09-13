"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Navigation from "@/components/navigation"
import { useAuth } from "@/lib/auth"

interface Module {
  id: string
  title: string
  duration: string
  videoUrl: string
  completed: boolean
}

interface Course {
  id: string
  title: string
  description: string
  level: string
  totalDuration: string
  modules: Module[]
}

const sampleCourses: Course[] = [
  {
    id: "alfabeto-basico",
    title: "Alfabeto em Libras - Básico",
    description: "Aprenda o alfabeto brasileiro em Libras com projeções claras e exercícios práticos.",
    level: "Básico",
    totalDuration: "45 minutos",
    modules: [
      {
        id: "mod1",
        title: "Introdução ao Alfabeto em Libras",
        duration: "8 min",
        videoUrl: "/placeholder.mp4",
        completed: false,
      },
      {
        id: "mod2",
        title: "Letras A-H",
        duration: "12 min",
        videoUrl: "/placeholder.mp4",
        completed: false,
      },
      {
        id: "mod3",
        title: "Letras I-P",
        duration: "12 min",
        videoUrl: "/placeholder.mp4",
        completed: false,
      },
      {
        id: "mod4",
        title: "Letras Q-Z",
        duration: "13 min",
        videoUrl: "/placeholder.mp4",
        completed: false,
      },
    ],
  },
  {
    id: "numeros-quantidades",
    title: "Números e Quantidades em Libras",
    description: "Domine os números de 1 a 100 e aprenda a expressar quantidades específicas em Libras.",
    level: "Básico",
    totalDuration: "30 minutos",
    modules: [
      {
        id: "mod1",
        title: "Números de 1 a 10",
        duration: "10 min",
        videoUrl: "/placeholder.mp4",
        completed: false,
      },
      {
        id: "mod2",
        title: "Números de 11 a 50",
        duration: "10 min",
        videoUrl: "/placeholder.mp4",
        completed: false,
      },
      {
        id: "mod3",
        title: "Números de 51 a 100",
        duration: "10 min",
        videoUrl: "/placeholder.mp4",
        completed: false,
      },
    ],
  },
]

export default function CoursePlayerPage() {
  const params = useParams()
  const { user } = useAuth()
  const [course, setCourse] = useState<Course | null>(null)
  const [currentModule, setCurrentModule] = useState<Module | null>(null)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const courseId = params.id as string
    const foundCourse = sampleCourses.find((c) => c.id === courseId)

    if (foundCourse) {
      // Load progress from localStorage
      const savedProgress = JSON.parse(localStorage.getItem(`course_progress_${courseId}`) || "{}")
      const updatedModules = foundCourse.modules.map((module) => ({
        ...module,
        completed: savedProgress[module.id] || false,
      }))

      const courseWithProgress = { ...foundCourse, modules: updatedModules }
      setCourse(courseWithProgress)
      setCurrentModule(updatedModules[0])

      // Calculate overall progress
      const completedCount = updatedModules.filter((m) => m.completed).length
      setProgress((completedCount / updatedModules.length) * 100)
    }
  }, [params.id])

  const markModuleComplete = (moduleId: string) => {
    if (!course) return

    const updatedModules = course.modules.map((module) =>
      module.id === moduleId ? { ...module, completed: true } : module,
    )

    const updatedCourse = { ...course, modules: updatedModules }
    setCourse(updatedCourse)

    // Save to localStorage
    const progressData = updatedModules.reduce(
      (acc, module) => {
        acc[module.id] = module.completed
        return acc
      },
      {} as Record<string, boolean>,
    )

    localStorage.setItem(`course_progress_${course.id}`, JSON.stringify(progressData))

    // Update overall progress
    const completedCount = updatedModules.filter((m) => m.completed).length
    setProgress((completedCount / updatedModules.length) * 100)
  }

  const selectModule = (module: Module) => {
    setCurrentModule(module)
    setCurrentTime(0)
    setIsPlaying(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-blue-800 mb-4">Curso não encontrado</h1>
            <Link href="/cursos" className="text-blue-600 hover:underline">
              Voltar para cursos
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      {/* Course Header */}
      <div className="bg-blue-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/cursos" className="text-blue-200 hover:text-white text-sm mb-2 inline-block">
                ← Voltar para cursos
              </Link>
              <h1 className="text-xl font-bold">{course.title}</h1>
              <p className="text-blue-200 text-sm">
                {course.level} • {course.totalDuration}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-200 mb-1">Progresso do curso</div>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-blue-700 rounded-full h-2">
                  <div
                    className="bg-teal-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-3">
            <div className="bg-black rounded-lg overflow-hidden shadow-lg">
              <div className="relative aspect-video bg-gray-800 flex items-center justify-center">
                {/* Video placeholder */}
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🎥</div>
                  <h3 className="text-xl font-semibold mb-2">{currentModule?.title}</h3>
                  <p className="text-gray-300">Vídeo em Libras - {currentModule?.duration}</p>
                </div>

                {/* Play button overlay */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-all"
                >
                  <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
                    {isPlaying ? (
                      <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg className="w-8 h-8 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </div>
                </button>
              </div>

              {/* Video Controls */}
              <div className="bg-gray-800 p-4">
                <div className="flex items-center gap-4 mb-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:text-teal-400 transition-colors"
                  >
                    {isPlaying ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="w-full bg-gray-600 rounded-full h-1">
                      <div
                        className="bg-teal-400 h-1 rounded-full transition-all"
                        style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <span className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(duration || 480)}
                  </span>

                  <button className="text-white hover:text-teal-400 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Module completion */}
                <div className="flex items-center justify-between">
                  <div className="text-white text-sm">{currentModule?.title}</div>
                  <button
                    onClick={() => currentModule && markModuleComplete(currentModule.id)}
                    disabled={currentModule?.completed}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      currentModule?.completed
                        ? "bg-green-600 text-white cursor-not-allowed"
                        : "bg-teal-600 text-white hover:bg-teal-700"
                    }`}
                  >
                    {currentModule?.completed ? "✓ Concluído" : "Marcar como concluído"}
                  </button>
                </div>
              </div>
            </div>

            {/* Course Description */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-xl font-bold text-blue-800 mb-3">Sobre este curso</h2>
              <p className="text-blue-900 leading-relaxed">{course.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-blue-100">
                <div>
                  <div className="text-sm text-blue-600 font-medium">Nível</div>
                  <div className="text-blue-800 font-semibold">{course.level}</div>
                </div>
                <div>
                  <div className="text-sm text-blue-600 font-medium">Duração</div>
                  <div className="text-blue-800 font-semibold">{course.totalDuration}</div>
                </div>
                <div>
                  <div className="text-sm text-blue-600 font-medium">Módulos</div>
                  <div className="text-blue-800 font-semibold">{course.modules.length}</div>
                </div>
                <div>
                  <div className="text-sm text-blue-600 font-medium">Progresso</div>
                  <div className="text-blue-800 font-semibold">{Math.round(progress)}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Modules Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-blue-800 text-white p-4">
                <h3 className="font-semibold">Módulos do Curso</h3>
                <p className="text-blue-200 text-sm">
                  {course.modules.filter((m) => m.completed).length} de {course.modules.length} concluídos
                </p>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {course.modules.map((module, index) => (
                  <button
                    key={module.id}
                    onClick={() => selectModule(module)}
                    className={`w-full text-left p-4 border-b border-blue-100 hover:bg-blue-50 transition-colors ${
                      currentModule?.id === module.id ? "bg-blue-50 border-l-4 border-l-blue-600" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                          module.completed
                            ? "bg-green-100 text-green-800"
                            : currentModule?.id === module.id
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {module.completed ? "✓" : index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-blue-800 text-sm leading-tight">{module.title}</h4>
                        <p className="text-blue-600 text-xs mt-1">{module.duration}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Course Navigation */}
            <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
              <h4 className="font-semibold text-blue-800 mb-3">Navegação</h4>
              <div className="space-y-2">
                <Link
                  href="/cursos"
                  className="block w-full text-center bg-blue-100 text-blue-800 py-2 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  Todos os Cursos
                </Link>
                <Link
                  href="/minha-conta"
                  className="block w-full text-center bg-teal-100 text-teal-800 py-2 rounded-lg hover:bg-teal-200 transition-colors"
                >
                  Meu Progresso
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
