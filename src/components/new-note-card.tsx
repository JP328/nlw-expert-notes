export function NewNoteCard() {
  return(
    <div className="rounded-md bg-slate-700 p-5 space-y-3 relative overflow-hidden">
      <span className="text-sm font-medium text-slate-200">
        Adicionar Nota
        </span>
      <p className="text-sm leading-6 text-slate-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis fuga culpa voluptates alias quia ut magnam, eligendi similique. Dignissimos sapiente obcaecati soluta. Facere cumque distinctio maxime tempora ipsa saepe qui.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      </p>

      <div className="absolute bottom-0 left-0 right-0 top-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"/>
    </div>
  )
}