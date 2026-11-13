// Lista ordenável por arrastar e soltar (mouse) com setas de apoio (teclado e celular),
// no mesmo espírito do Sortable usado no editor do modelo 4 do RHBot.
import { useState, type ReactNode } from "react";
import { ArrowDown, ArrowUp, GripVertical } from "lucide-react";
import { moverPara } from "./data";

type Props<T> = {
  itens: T[];
  chave: (item: T) => string | number;
  onChange: (itens: T[]) => void;
  render: (item: T, i: number) => ReactNode;
  className?: string;
  itemClassName?: string;
};

export function Sortable<T>({ itens, chave, onChange, render, className = "", itemClassName = "" }: Props<T>) {
  const [arrastando, setArrastando] = useState<number | null>(null);
  const [sobre, setSobre] = useState<number | null>(null);
  return (
    <ol className={className}>
      {itens.map((item, i) => (
        <li
          key={chave(item)}
          draggable
          onDragStart={(e) => { setArrastando(i); e.dataTransfer.effectAllowed = "move"; }}
          onDragOver={(e) => { e.preventDefault(); setSobre(i); }}
          onDragEnd={() => { setArrastando(null); setSobre(null); }}
          onDrop={(e) => { e.preventDefault(); if (arrastando !== null) onChange(moverPara(itens, arrastando, i)); setArrastando(null); setSobre(null); }}
          className={`flex cursor-grab items-center gap-2 active:cursor-grabbing ${arrastando === i ? "opacity-40" : ""} ${sobre === i && arrastando !== i ? "ring-2 ring-amber-400" : ""} ${itemClassName}`}
        >
          <GripVertical className="h-4 w-4 shrink-0 text-[#999]" aria-hidden />
          <div className="min-w-0 flex-1">{render(item, i)}</div>
          <div className="flex shrink-0">
            <button type="button" aria-label="Subir" disabled={i === 0} onClick={() => onChange(moverPara(itens, i, i - 1))} className="rounded p-1 text-[#777] hover:bg-black/5 disabled:opacity-25"><ArrowUp className="h-4 w-4" /></button>
            <button type="button" aria-label="Descer" disabled={i === itens.length - 1} onClick={() => onChange(moverPara(itens, i, i + 1))} className="rounded p-1 text-[#777] hover:bg-black/5 disabled:opacity-25"><ArrowDown className="h-4 w-4" /></button>
          </div>
        </li>
      ))}
    </ol>
  );
}
