import React, { InputHTMLAttributes, useState } from "react";
import { Icon } from '@iconify/react';
import Image from 'next/image'
import search_icon from '../../assets/svgs/search_button.svg'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: any
  className?: string
  label?: string
  type?: string
  icon?: boolean
}

const Input: React.FC<Props> = ({
  error, 
  label, 
  className, 
  onChange,
  type,
  icon,
  disabled, 
  value,
  placeholder,
  ...rest 
}) => {
  const [passwordType, setPasswordType] = useState("password")

  const togglePassword = () => {
    if (passwordType === 'password') {
      return setPasswordType('text')
    }
    setPasswordType('password')
  }

  return (
    <>
      {label && 
        <label className="text-sm text-[#343434]">
          {label}
        </label> 
      }

      {type === 'password' ?
        <div className="relative w-full mt-[0.2rem]">
          <div className="absolute inset-y-0 right-0 flex items-center px-2">
            <input 
              className="hidden js-password-toggle" 
              id="toggle" 
              type="checkbox" 
            />
            
            <button 
              type="button" 
              disabled={disabled} 
              onClick={togglePassword} 
              className="text-xs px-2 text-[#464646] cursor-pointer js-password-label" 
            >
              {passwordType === "password" ? 
                <Icon 
                  icon="ion:eye" 
                  color="#535252" 
                  width="20" 
                  height="20" 
                /> : 
                <Icon 
                  icon="ion:eye-off" 
                  color="#535252" 
                  width="20" 
                  height="20" 
                />
              }
            </button>
          </div>

          <input 
            className={`${className} ${error ? 'border-red-500 focus:outline-red-500' : null}`}
            onChange={onChange} 
            disabled={disabled} 
            value={value} 
            type={passwordType} 
            placeholder={placeholder} 
            {...rest}
          />
        </div> : 
        <div className="mt-[0.2rem] relative">
          {icon &&
            <div className="absolute inset-y-0 left-0 flex items-center px-2">
              <input
                className="hidden js-password-toggle"
                id="toggle"
                type="checkbox"
              />

              <button
                type="button"
                disabled={disabled}
                onClick={togglePassword}
                className="text-xs px-2 text-[#464646] cursor-pointer js-password-label"
              >
                <Image 
                  alt="search icon" src={search_icon}
                  width="20" height="20"
                />
              </button>
            </div>
          }
          <input
            className={`${className} ${error ? 'border-red-500 focus:outline-red-500' : 'border-[#E7E7E7] focus:outline-[#100DB1]'}`}
            onChange={onChange}
            disabled={disabled}
            value={value}
            type={type}
            placeholder={placeholder}
            {...rest}
          />
        </div>
      }

      <div className="mt-[0.2rem]">
        {error &&
          <label className="text-red-500 text-sm">
            {error}
          </label>
        }
      </div>
    </>
  )
}

export default Input