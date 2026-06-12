import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Login from '../pages/Login'
import { login } from '../services/api'
import { describe, expect, it, vi } from 'vitest'

// Mock del api
vi.mock('../services/api', () => ({
  login: vi.fn()
}))


const renderLogin = (onLogin = vi.fn()) => {
  render(
    <MemoryRouter>
      <Login onLogin={onLogin} />
    </MemoryRouter>
  )
}

describe('Login', () => {
  it('renderiza el formulario correctamente', () => {
    renderLogin()
    expect(screen.getByPlaceholderText('admin@example.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('•••••••••••')).toBeInTheDocument()
    expect(screen.getByText('Ingresar')).toBeInTheDocument()
  })

  it('muestra error con credenciales incorrectas', async () => {
    login.mockRejectedValueOnce({
      response: { data: { message: 'Credenciales inválidas' } }
    })

    renderLogin()

    await userEvent.type(screen.getByPlaceholderText('admin@example.com'), 'malo@example.com')
    await userEvent.type(screen.getByPlaceholderText('•••••••••••'), 'passwordmal')
    await userEvent.click(screen.getByText('Ingresar'))

    expect(await screen.findByText('Credenciales inválidas')).toBeInTheDocument()
  })

  it('llama onLogin cuando el login es exitoso', async () => {
    login.mockResolvedValueOnce({ ok: true })
    const onLogin = vi.fn()

    renderLogin(onLogin)

    await userEvent.type(screen.getByPlaceholderText('admin@example.com'), 'admin@example.com')
    await userEvent.type(screen.getByPlaceholderText('•••••••••••'), 'Admin@2026!')
    await userEvent.click(screen.getByText('Ingresar'))

    expect(onLogin).toHaveBeenCalled()
  })
})