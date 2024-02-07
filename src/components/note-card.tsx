export function NoteCard() {
  return (
    <button className="text-left rounded-md bg-slate-800 p-5 space-y-3 relative overflow-hidden hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
      <span className="text-sm font-medium text-slate-300">
        Há 4 dias
        </span>
      <p className="text-sm leading-6 text-slate-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis fuga culpa voluptates alias quia ut magnam, eligendi similique. Dignissimos sapiente obcaecati soluta. Facere cumque distinctio maxime tempora ipsa saepe qui.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum animi nobis error ut eius repellat cupiditate ipsum ducimus quas. Omnis voluptate error numquam inventore suscipit impedit possimus rerum enim obcaecati.
      </p>

      <div className="absolute bottom-0 left-0 right-0 top-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"/>
    </button>
  )
}