//sistaleforo-web-final/src/components/UserManagement.tsx
'use client'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import useUsers from '../hooks/account/admin-actions/useUsers'
import { UserProps } from '../types/userProps'
import DeleteUserButton from './DeleteUserButton'
import ChangeUserRoleButton from './ChangeUserRoleButton'

const UsersList = ({ user }) => {
  const { users, refetch } = useUsers(user.token)

  const handleUserDeleted = () => {
    refetch()
  }

  const handleRoleChanged = () => {
    refetch()
  }

  useEffect(() => {
    console.log("USUARIOS EN USER MANAGEMENT COMPONENT:")
    console.log(users)
  } ,[user])

  return (
    <div>
        <ul>
          {users.map((userData: UserProps) => (
            <>
              {user.username !== userData.username && (
                <>
                  <li key={userData.username} className="mb-4 p-4 border rounded shadow-sm">
                    {user.role === 'admin' && (
                      <DeleteUserButton
                        username={userData.username}
                        token={user.token}
                        onUserDeleted={handleUserDeleted}
                      />
                    )}
                    <p className="text-gray-700">Username: {userData.username}</p>
                    <p className="text-sm text-gray-500">Role: {userData.role}</p>
                    {user.role === 'admin' && (
                      <ChangeUserRoleButton
                        username={userData.username}
                        token={user.token}
                        currentRole={userData.role}
                        onRoleChanged={handleRoleChanged}
                      />
                    )}
                  </li>
                </>
              )}
            </>
          ))}
        </ul>
    </div>
  )
}

UsersList.propTypes = {
  user: PropTypes.object.isRequired
}

export default UsersList
