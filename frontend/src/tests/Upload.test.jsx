import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Upload from '../pages/Upload'
import { uploadCSV } from '../services/api'

vi.mock('../services/api', () => ({
  uploadCSV: vi.fn(),
  logout: vi.fn()
}))


const renderUpload = (onLogout = vi.fn()) => {
  render(
    <MemoryRouter>
      <Upload onLogout={onLogout} />
    </MemoryRouter>
  )
}

describe('Upload', () => {
  it('renderiza el header correctamente', () => {
    renderUpload()
    expect(screen.getByText('Sistema de Carga de Datos')).toBeInTheDocument()
    expect(screen.getByText('Admin')).toBeInTheDocument()
    expect(screen.getByText('Salir')).toBeInTheDocument()
  })

  it('botón Upload File deshabilitado sin archivo', () => {
    renderUpload()
    expect(
      screen.getByRole('button', { name: /upload file/i })
    ).toBeDisabled()
  })

  it('habilita Upload File cuando se selecciona un archivo', async () => {
    renderUpload()

    const file = new File(['name,email,age'], 'users.csv', { type: 'text/csv' })
    const input = document.querySelector('input[type="file"]')

    await userEvent.upload(input, file)

    expect(
      screen.getByRole('button', { name: /upload file/i })
    ).toBeEnabled()
  })

  it('muestra dashboard después de subir CSV exitosamente', async () => {
    uploadCSV.mockResolvedValueOnce({
      ok: true,
      data: {
        success: [
          { id: 1, name: 'Juan', email: 'juan@example.com', age: 28, role: 'user' }
        ],
        errors: []
      }
    })

    renderUpload()

    const file = new File(['name,email,age\nJuan,juan@example.com,28'], 'users.csv', { type: 'text/csv' })
    const input = document.querySelector('input[type="file"]')
    await userEvent.upload(input, file)
    await userEvent.click(screen.getByRole('button', { name: /upload file/i }))

    expect(await screen.findByText(/registros procesados/i)).toBeInTheDocument()
  })

  it('muestra error cuando falla la carga', async () => {
  uploadCSV.mockRejectedValueOnce({
    response: { data: { message: 'Solo se permiten archivos CSV' } }
  })

  renderUpload()

  const file = new File(['name,email,age'], 'users.csv', { type: 'text/csv' })
  const input = document.querySelector('input[type="file"]')
  await userEvent.upload(input, file)
  await userEvent.click(screen.getByRole('button', { name: /upload file/i }))

  expect(await screen.findByText('Solo se permiten archivos CSV')).toBeInTheDocument()
})

  it('llama onLogout al hacer click en Salir', async () => {
    const onLogout = vi.fn()
    renderUpload(onLogout)
    await userEvent.click(screen.getByText('Salir'))
    expect(onLogout).toHaveBeenCalled()
  })
})