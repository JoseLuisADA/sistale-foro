'use client';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useChangePassword from '../hooks/account/member-actions/useChangePassword';
import { passwordChangeSchema, PasswordChangeFormData } from '../lib/changePasswordSchema';

const ChangePassword = ({ token }) => {
  const [formData, setFormData] = useState<PasswordChangeFormData>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { changePassword, isLoading, error } = useChangePassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = passwordChangeSchema.safeParse(formData);
    if (result.success) {
      await changePassword(token, result.data.oldPassword, result.data.newPassword);
      setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setErrors({});
      
    } else {
      const newErrors: { [key: string]: string } = {};
      result.error.errors.forEach((error) => {
        newErrors[error.path[0]] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex mt-32 justify-center">
      <form className="bg-white shadow-md w-[50rem] rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="oldPassword">
            Contraseña actual
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="oldPassword"
            type="password"
            placeholder="*********"
            value={formData.oldPassword}
            onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
          />
          {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
            Nueva contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="newPassword"
            type="password"
            placeholder="*********"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
          />
          {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirmar contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="*********"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Cargando...' : 'Cambiar contraseña'}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </form>
    </div>
  );
};

ChangePassword.propTypes = {
  token: PropTypes.string.isRequired,
};

export default ChangePassword;
