import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

export function NewNoteCard() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [content, setContent] = useState('');

  const handleOnboarding = () => {
    setShowOnboarding((prev) => !prev)
  }

  const handleContentChanged = (event : ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)

    if(event.target.value === '') {
      handleOnboarding()
    }
  }

  const handleSaveNote = (event: FormEvent) => {
    event.preventDefault()

    console.log(content);
    
    toast.success("Nota Criada com sucesso!")
  }
  
  return(
    <Dialog.Root>
      <Dialog.Trigger 
        className="flex flex-col gap-3 text-left rounded-md bg-slate-700 p-5 relative overflow-hidden hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none"
      >
        <span className="text-sm font-medium text-slate-200">
          Adicionar Nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertido para texto automaticamente. 
        </p>
      </Dialog.Trigger>

      
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60">
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col overflow-hidden outline-none">
            <Dialog.Close 
              className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100"
              onClick={() => setShowOnboarding(true)}
            >
              <X className="size-5"/>
            </Dialog.Close>
            
            <form onSubmit={handleSaveNote} className="flex flex-col flex-1">
              <div className="flex flex-1 flex-col gap-3 p-5">

                <span className="text-sm font-medium text-slate-300">
                  Adicionar Nota
                </span>
                
                {
                  showOnboarding ? (
                    <p className="text-sm leading-6 text-slate-400">
                      Comece a <button className="font-medium text-lime-400 hover:underline">gravar uma nota</button> em áudio se prefirir utilize <button className="font-medium text-lime-400 hover:underline" onClick={handleOnboarding}>apenas texto</button>.
                    </p>
                  ) : (
                    <textarea
                      className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none" 
                      autoFocus
                      onChange={handleContentChanged} />
                  )
                }
              </div>
                
              <button 
                type="submit" 
                className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
              >
                Salvar nota
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}