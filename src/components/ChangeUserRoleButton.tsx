//sistaleforo-web-final/src/components/ChangeUserRoleButton.tsx
'use client'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useChangeUserRole from '../hooks/account/admin-actions/useChangeUserRole'

const ChangeUserRoleButton = ({ username, token, currentRole, onRoleChanged }) => {
  const { changeUserRole } = useChangeUserRole()
  const [newRole, setNewRole] = useState(currentRole)

  const handleChangeRole = async () => {
      const changed = await changeUserRole(username, token, newRole)
      if (changed) {
        onRoleChanged()
      }
  }

  return (
    <div className='mt-5'>
      <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
        <option value="miembro">Miembro</option>
        <option value="admin">Administrador</option>
      </select>
      <button
        onClick={handleChangeRole}
        className="px-3 py-1 mb-8 ml-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
      >
        Cambiar rol
      </button>
    </div>
  )
}

ChangeUserRoleButton.propTypes = {
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  currentRole: PropTypes.string.isRequired,
  onRoleChanged: PropTypes.func.isRequired,
}

export default ChangeUserRoleButton