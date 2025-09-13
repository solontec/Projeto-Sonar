"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth"

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const handleLogout = () => {
    logout()
    setMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-semibold text-blue-800">Sonar</span>
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isActive("/")
                  ? "border-2 border-blue-600 text-blue-600 font-semibold"
                  : "text-blue-700 hover:text-blue-900"
              }`}
            >
              Início
            </Link>
            <Link
              href="/vagas"
              className={`px-3 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isActive("/vagas")
                  ? "border-2 border-blue-600 text-blue-600 font-semibold"
                  : "text-blue-700 hover:text-blue-900"
              }`}
            >
              Vagas
            </Link>
            <Link
              href="/cursos"
              className={`px-3 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isActive("/cursos")
                  ? "border-2 border-blue-600 text-blue-600 font-semibold"
                  : "text-blue-700 hover:text-blue-900"
              }`}
            >
              Cursos
            </Link>
            {user?.type === "empresa" && (
              <Link
                href="/empresa"
                className={`px-3 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isActive("/empresa")
                    ? "border-2 border-blue-600 text-blue-600 font-semibold"
                    : "text-blue-700 hover:text-blue-900"
                }`}
              >
                Empresa
              </Link>
            )}
          </div>

          <div className="hidden md:flex space-x-3 items-center">
            {user ? (
              <>
                <Link
                  href="/minha-conta"
                  className="text-blue-700 hover:text-blue-900 px-3 py-1 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Olá, {user.name.split(" ")[0]}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-blue-200 text-blue-800 px-3 py-1 rounded-md font-medium hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Sair
                </button>
                {user.type === "empresa" && (
                  <Link
                    href="/cadastrar-vaga"
                    className="bg-teal-600 text-white px-3 py-1 rounded-md font-semibold hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  >
                    Cadastrar Vaga
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link
                  href="/entrar"
                  className="bg-blue-200 text-blue-800 px-3 py-1 rounded-md font-medium hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Entrar
                </Link>
                <Link
                  href="/cadastrar"
                  className="bg-blue-700 text-white px-3 py-1 rounded-md font-semibold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            aria-label="Abrir menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-inner">
          <Link
            href="/"
            className="block w-full text-left border-b border-blue-100 p-3 text-blue-800 hover:bg-blue-50 focus:outline-none focus:bg-blue-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            Início
          </Link>
          <Link
            href="/vagas"
            className="block w-full text-left border-b border-blue-100 p-3 text-blue-800 hover:bg-blue-50 focus:outline-none focus:bg-blue-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            Vagas
          </Link>
          <Link
            href="/cursos"
            className="block w-full text-left border-b border-blue-100 p-3 text-blue-800 hover:bg-blue-50 focus:outline-none focus:bg-blue-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            Cursos
          </Link>
          {user?.type === "empresa" && (
            <Link
              href="/empresa"
              className="block w-full text-left border-b border-blue-100 p-3 text-blue-800 hover:bg-blue-50 focus:outline-none focus:bg-blue-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Empresa
            </Link>
          )}

          {user ? (
            <div className="border-b border-blue-100">
              <Link
                href="/minha-conta"
                className="block w-full text-left p-3 text-blue-800 hover:bg-blue-50 focus:outline-none focus:bg-blue-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Minha Conta
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left p-3 text-blue-800 hover:bg-blue-50 focus:outline-none focus:bg-blue-50"
              >
                Sair
              </button>
              {user.type === "empresa" && (
                <Link
                  href="/cadastrar-vaga"
                  className="block w-full bg-teal-600 text-white text-center py-2 mx-3 mb-3 rounded-md font-semibold hover:bg-teal-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cadastrar Vaga
                </Link>
              )}
            </div>
          ) : (
            <div className="flex space-x-3 p-3">
              <Link
                href="/entrar"
                className="flex-1 bg-blue-200 text-blue-800 text-center py-1 rounded-md font-medium hover:bg-blue-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Entrar
              </Link>
              <Link
                href="/cadastrar"
                className="flex-1 bg-blue-700 text-white text-center py-1 rounded-md font-semibold hover:bg-blue-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cadastrar
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
