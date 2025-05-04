import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";

export default function PremiumRoleDropdown({ value, onChange, roles }: { value: string; onChange: (v: string) => void; roles: { label: string; emoji: string }[] }) {
  const selectedRole = roles.find(r => r.label === value) || null;
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="w-full px-4 py-3 rounded-xl bg-white/20 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all flex items-center justify-between shadow glassmorphism border-2 border-blue-500/50 hover:border-fuchsia-400/70">
          <span className="flex items-center gap-2">
            {selectedRole ? (
              <>
                <span className="text-xl">{selectedRole.emoji}</span>
                {selectedRole.label}
              </>
            ) : (
              <span className="text-gray-300">Select Your Role to Start</span>
            )}
          </span>
          <ChevronUpDownIcon className="w-5 h-5 text-blue-300 ml-2" aria-hidden="true" />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-2 w-full rounded-xl bg-gradient-to-br from-blue-900/90 via-fuchsia-900/80 to-purple-900/90 shadow-2xl ring-1 ring-blue-800/40 backdrop-blur-lg z-50 max-h-72 overflow-auto glassmorphism">
            {roles.map((role) => (
              <Listbox.Option
                key={role.label}
                className={({ active, selected }: { active: boolean; selected: boolean }) =>
                  `cursor-pointer select-none relative py-3 px-6 flex items-center gap-3 rounded-xl transition-all text-lg font-medium ${
                    active ? "bg-blue-500/30 text-white" : "text-blue-100"
                  } ${selected ? "ring-2 ring-fuchsia-400/80" : ""}`
                }
                value={role.label}
              >
                <span className="text-2xl mr-2">{role.emoji}</span>
                <span>{role.label}</span>
                {value === role.label && (
                  <CheckIcon className="w-5 h-5 text-fuchsia-400 ml-auto" aria-hidden="true" />
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
