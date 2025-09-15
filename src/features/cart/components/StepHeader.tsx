import { JSX } from "react";

interface StepHeaderProps {
  icon: JSX.Element;
  title: string;
  description: string;
}
export default function StepHeader({
  icon,
  title,
  description,
}: StepHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-yellow-400 to-orange-600 px-8 py-6 text-white">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <p className="text-blue-100 text-sm">{description}</p>
    </div>
  );
}
