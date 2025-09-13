"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import Navigation from "@/components/navigation"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("inicio")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "cursos", "vagas", "sobre-nos"]
      const scrollPos = window.scrollY + window.innerHeight / 3

      for (const sec of sections) {
        const section = document.getElementById(sec)
        if (section) {
          const offsetTop = section.offsetTop
          const offsetHeight = section.offsetHeight
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(sec)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="bg-blue-50 text-blue-800 font-sans min-h-screen flex flex-col">
      <Navigation />

      <div className="bg-white border-b border-blue-100 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-3">
            {[
              { id: "inicio", label: "Início" },
              { id: "cursos", label: "Cursos" },
              { id: "vagas", label: "Vagas" },
              { id: "sobre-nos", label: "Sobre Nós" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`px-3 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap ${
                  activeSection === id
                    ? "border-2 border-blue-600 text-blue-600 font-semibold"
                    : "text-blue-700 hover:text-blue-900"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Início Section */}
      <section
        id="inicio"
        className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-gradient-to-r from-blue-100 to-blue-200 rounded-md shadow-md mt-8 md:mt-12"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">Bem-vindo ao Sonar</h1>
          <p className="text-base md:text-lg mb-6 max-w-lg">
            Conectando talentos surdos e deficientes auditivos com oportunidades de trabalho, enquanto ensinamos Libras
            para todos.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => scrollToSection("vagas")}
              className="bg-blue-700 text-white px-5 py-2 rounded-md font-semibold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Ver Vagas
            </button>
            <button
              onClick={() => scrollToSection("cursos")}
              className="bg-blue-200 text-blue-800 px-5 py-2 rounded-md font-medium hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Aprender Libras
            </button>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg max-w-md mx-auto md:mx-0">
          <Image
            src="/images/sonar-inicio.jpg"
            alt="Sonar - Através dos Sinais com ilustração de baleia e mãos fazendo sinais de Libras"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* Por que escolher o Sonar? */}
      <section className="mt-20 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">Por que escolher o Sonar?</h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          <article className="bg-white rounded-md shadow hover:shadow-lg p-6 text-left flex flex-col items-center space-y-4">
            <Image
              src="/images/sonar-emprego.png"
              alt="Sonar Vagas de Emprego"
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover"
            />
            <h3 className="text-lg font-semibold">Oportunidades Exclusivas</h3>
            <p className="text-sm text-blue-900">
              Vagas de emprego especialmente voltadas para a comunidade surda e deficientes auditivos.
            </p>
          </article>

          <article className="bg-white rounded-md shadow hover:shadow-lg p-6 text-left flex flex-col items-center space-y-4">
            <Image
              src="/images/sonar-curso-libras.png"
              alt="Sonar Curso de Libras"
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover"
            />
            <h3 className="text-lg font-semibold">Educação em Libras</h3>
            <p className="text-sm text-blue-900">
              Cursos completos de Libras com vídeos e exercícios práticos para todos os níveis.
            </p>
          </article>

          <article className="bg-white rounded-md shadow hover:shadow-lg p-6 text-left flex flex-col items-center space-y-4">
            <Image
              src="/images/sonar-acessibilidade.png"
              alt="Sonar Acessibilidade"
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover"
            />
            <h3 className="text-lg font-semibold">Totalmente Acessível</h3>
            <p className="text-sm text-blue-900">
              Plataforma desenvolvida com foco em acessibilidade para a comunidade surda e deficientes auditivos.
            </p>
          </article>
        </div>
      </section>

      {/* Cursos de Libras */}
      <section id="cursos" className="mt-28 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-3">Cursos de Libras</h2>
        <p className="mb-12 text-blue-900 max-w-xl mx-auto">
          Aprenda Libras com nossos cursos interativos e acessíveis
        </p>

        <div className="grid gap-8 md:grid-cols-4 max-w-7xl mx-auto">
          {[
            {
              title: "Alfabeto em Libras - Básico",
              description: "Aprenda o alfabeto brasileiro em Libras com projeções claras e exercícios práticos.",
              duration: "45 minutos",
              level: "Novato",
              levelColor: "bg-blue-700",
            },
            {
              title: "Números e Quantidades em Libras",
              description: "Domine os números de 1 a 100 e aprenda a expressar quantidades específicas em Libras.",
              duration: "30 minutos",
              level: "Novato",
              levelColor: "bg-blue-700",
            },
            {
              title: "Cumprimentos e Apresentações",
              description: "Aprenda cumprimentos formais e informais, como se apresentar e fazer perguntas básicas.",
              duration: "60 minutos",
              level: "Intermediário",
              levelColor: "bg-indigo-700",
            },
            {
              title: "Conversação Avançada",
              description: "Aprimore suas habilidades em Libras com situações cotidianas e debates avançados.",
              duration: "90 minutos",
              level: "Avançado",
              levelColor: "bg-green-700",
            },
          ].map((course, index) => (
            <article key={index} className="bg-white shadow rounded-md flex flex-col overflow-hidden">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="text-blue-600 text-6xl">🤟</div>
                </div>
                <span
                  className={`absolute top-2 right-2 ${course.levelColor} text-white text-xs font-semibold rounded-full px-3 py-1`}
                >
                  {course.level}
                </span>
              </div>
              <div className="flex-1 flex flex-col p-4">
                <h3 className="text-lg font-semibold text-left mb-1">{course.title}</h3>
                <p className="text-sm flex-1 text-left text-blue-900 mb-3">{course.description}</p>
                <div className="flex items-center space-x-3 mb-4 text-blue-900 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{course.duration}</span>
                </div>
                <Link
                  href="/cursos"
                  className="bg-blue-700 text-white rounded-md py-2 text-sm font-semibold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center block"
                >
                  Iniciar Curso
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Vagas Section */}
      <section id="vagas" className="max-w-7xl mx-auto px-6 py-12 text-center mt-24">
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-800 mb-2">Oportunidades de Trabalho</h2>
        <p className="text-blue-800 mb-8 max-w-xl mx-auto">
          Vagas especialmente voltadas para a comunidade surda e deficientes auditivos
        </p>

        <div className="mb-8">
          <Link
            href="/cadastrar-vaga"
            className="bg-teal-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 inline-block"
          >
            Cadastrar Nova Vaga
          </Link>
        </div>

        <p className="text-blue-600">Nenhuma vaga disponível no momento.</p>
      </section>

      {/* Sobre Nós Section */}
      <section id="sobre-nos" className="max-w-7xl mx-auto px-6 py-12 mt-24">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-blue-800 mb-12">Sobre o Sonar</h2>

        <div className="max-w-4xl mx-auto space-y-8">
          <section className="bg-white rounded-md shadow-md p-6">
            <h3 className="font-semibold text-blue-800 mb-2">Nossa Missão</h3>
            <p className="text-blue-900 text-sm leading-relaxed">
              O Sonar nasceu com o propósito de criar pontes de comunicação e oportunidades para a comunidade surda e
              deficientes auditivos. Acreditamos que a inclusão digital e profissional é um direito fundamental, e
              trabalhamos para romper barreiras através da tecnologia e educação.
            </p>
          </section>

          <section className="bg-white rounded-md shadow-md p-6">
            <h3 className="font-semibold text-blue-800 mb-2">Nossa Visão</h3>
            <p className="text-blue-900 text-sm leading-relaxed">
              Ser a principal plataforma de conectividade entre talentos surdos e oportunidades de trabalho no Brasil,
              ao mesmo tempo em que promovemos o ensino de Libras para toda a sociedade, construindo um futuro mais
              inclusivo e acessível.
            </p>
          </section>

          <section className="bg-white rounded-md shadow-md p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                icon: "🤝",
                title: "Inclusão",
                description:
                  "Acreditamos que todos merecem oportunidades iguais, independentemente de suas limitações auditivas.",
              },
              {
                icon: "🎯",
                title: "Acessibilidade",
                description:
                  "Desenvolvemos soluções que são verdadeiramente acessíveis para pessoas surdas e deficientes auditivos.",
              },
              {
                icon: "📚",
                title: "Educação",
                description: "Promovemos o aprendizado de Libras como ferramenta de comunicação e inclusão social.",
              },
              {
                icon: "💼",
                title: "Oportunidade",
                description: "Conectamos talentos com empresas que valorizam a diversidade e inclusão.",
              },
            ].map((value, index) => (
              <article key={index} className="border-l-4 border-blue-700 p-3 bg-blue-50 rounded-md">
                <h4 className="font-semibold mb-1">
                  {value.icon} {value.title}
                </h4>
                <p className="text-blue-900 text-sm leading-relaxed">{value.description}</p>
              </article>
            ))}
          </section>

          <section className="bg-white rounded-md shadow-md p-6">
            <h3 className="font-semibold text-blue-800 mb-2">História do Projeto</h3>
            <p className="text-blue-900 text-sm leading-relaxed">
              O projeto Sonar foi desenvolvido como parte de um curso de Recursos Humanos, com o objetivo de abordar uma
              necessidade real do mercado de trabalho brasileiro: a inclusão efetiva de pessoas surdas e deficientes
              auditivos no ambiente profissional.
            </p>
            <p className="text-blue-900 text-sm leading-relaxed mt-3">
              Através de pesquisas e entrevistas com a comunidade surda, identificamos as principais barreiras
              enfrentadas na busca por oportunidades de trabalho, e desenvolvemos uma solução tecnológica que não apenas
              conecta candidatos e empresas, mas também educa a sociedade sobre a importância da Libras.
            </p>
          </section>
        </div>
      </section>

      {/* Entrar Section */}
      <section id="entrar" className="max-w-md mx-auto mt-24 mb-12 p-8 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center text-blue-800 mb-6">Entrar no Sonar</h2>
        <form>
          <label htmlFor="email" className="block text-blue-900 font-medium mb-1">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="seu@email.com"
            required
            className="w-full border border-blue-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="password" className="block text-blue-900 font-medium mb-1">
            Senha
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            required
            className="w-full border border-blue-300 rounded-md p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-700 text-white rounded-md py-2 font-semibold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-blue-900">
          Não tem conta?{" "}
          <button
            onClick={() => scrollToSection("cadastrar")}
            className="text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            Cadastre-se aqui
          </button>
        </p>
      </section>

      {/* Cadastrar Section */}
      <section id="cadastrar" className="max-w-md mx-auto mb-16 p-8 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center text-blue-800 mb-6">Cadastrar no Sonar</h2>
        <form>
          <label htmlFor="nome" className="block text-blue-900 font-medium mb-1">
            Nome Completo
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            required
            placeholder="Seu nome completo"
            className="w-full border border-blue-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="email-cad" className="block text-blue-900 font-medium mb-1">
            E-mail
          </label>
          <input
            type="email"
            id="email-cad"
            name="email-cad"
            required
            placeholder="seu@email.com"
            className="w-full border border-blue-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="senha-cad" className="block text-blue-900 font-medium mb-1">
            Senha
          </label>
          <input
            type="password"
            id="senha-cad"
            name="senha-cad"
            required
            placeholder="********"
            className="w-full border border-blue-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="tipo-conta" className="block text-blue-900 font-medium mb-1">
            Tipo de conta
          </label>
          <select
            id="tipo-conta"
            name="tipo-conta"
            className="w-full border border-blue-300 rounded-md p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="candidato">Candidato a Emprego</option>
            <option value="empresa">Empresa Recrutadora</option>
            <option value="aluno">Aluno de Libras</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white rounded-md py-2 font-semibold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cadastrar
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-blue-900">
          Já tem conta?{" "}
          <button
            onClick={() => scrollToSection("entrar")}
            className="text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            Entre aqui
          </button>
        </p>
      </section>
    </div>
  )
}
