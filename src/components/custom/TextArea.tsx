import React, { TextareaHTMLAttributes } from "react";
import { Text } from '@mantine/core'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: any
  className?: string
  label?: string
  type?: string
  icon?: boolean
  maxLength?: number
}

const TextArea: React.FC<Props> = ({
  error,
  label,
  className,
  onChange,
  type,
  icon,
  maxLength,
  disabled,
  value,
  placeholder,
  ...rest
}) => {
  return (
    <>
      {label &&
        <Text className="text-sm text-[#343434]">
          {label}
        </Text>
      }

      <div className="mt-[0.2rem] relative">
        <textarea
          className={`${className} ${error ? 'border-red-500 focus:outline-red-500' : 'border-[#E7E7E7] focus:outline-[#100DB1]'}`}
          onChange={onChange}
          disabled={disabled}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          {...rest}
        ></textarea>
      </div>

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

export default TextArea