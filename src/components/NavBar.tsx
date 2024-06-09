'use client';
import React from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import { useUserContext } from '../context/UserContext'
import useLogout from '../hooks/account/member-actions/useLogout'
import { useRouter } from 'next/navigation'
import { publicNavigation, protectedNavigation } from './constants/navbarButtons'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const { user } = useUserContext()
  const { logout } = useLogout()
  const router = useRouter()
  const pathname = usePathname()
  let navigation: { name: string; href: string; current: boolean; }[] = []

  if(user.role === 'admin') {
    navigation = [...publicNavigation, ...protectedNavigation]
  } else {
    navigation = [...publicNavigation]
  }

  const updatedNavigation = navigation.map(item => {
    if (item.href === pathname) {
      return { ...item, current: true }
    }
    return item
  })

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {updatedNavigation.map(item => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {!user.username && (
                  <a
                    href="/login"
                    className="relative rounded-md px-3 py-2 text-sm font-medium bg-blue-500 text-white hover:bg-blue-700">
                    Iniciar sesión
                  </a>
                )}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  {user.username && (
                    <>
                      <div>
                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm">
                            <img
                            className="mr-1"
                            src="https://nosapki.com/images/nt-images/player-online.png"
                            alt="User photo"
                          />
                          <p className="text-white">{user.username}</p>
                        </MenuButton>
                      </div>
                      <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <MenuItem>
                            {({ focus }) => (
                              <a
                                href="/change-password"
                                className={classNames(
                                  focus ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}>
                                Cambiar contraseña
                              </a>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ focus }) => (
                              <a
                                href="/login"
                                onClick={handleLogout}
                                className={classNames(
                                  focus ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-red-700'
                                )}>
                                Cerrar sesión
                              </a>
                            )}
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map(item => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}>
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
