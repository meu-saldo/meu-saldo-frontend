import { useState } from 'react';

export default function InputField({
    id,
    name,
    type = 'text',
    value,
    onChange,
    placeholder = '',
    required = false,
    showToggle = false,
    iconShow: IconShow,
    iconHide: IconHide,
}) {
    const [show, setShow] = useState(false);
    const inputType = showToggle ? (show ? 'text' : 'password') : type;

    return (
        <div className="relative mb-4">
            <label htmlFor={id} className="sr-only">
                {placeholder}
            </label>
            <input
                id={id}
                name={name}
                type={inputType}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="w-full bg-gray-200 px-3 py-2 rounded pr-10 text-base"
            />
            {showToggle && IconShow && IconHide && (
                <span
                    onClick={() => setShow(!show)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                >
                    {show ? <IconShow size={20} className="text-gray-600" /> : <IconHide size={20} className="text-gray-600" />}
                </span>
            )}
        </div>
    );
}
