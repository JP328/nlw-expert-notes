import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react"
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

interface NewNoteCardProps{
  onNoteCreated : (content: string) => void
}

let speechRecognition: SpeechRecognition | null =  null

export function NewNoteCard({ onNoteCreated } : NewNoteCardProps) {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [content, setContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleOnboarding = () => {
    setShowOnboarding((prev) => !prev)
  }

  const handleContentChanged = (event : ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)

    if(event.target.value === '') {
      handleOnboarding()
    }
  }

  const handleStartRecording = () => {    
    const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionAPIAvailable) {
      toast.warning("Infelizmente seu navegador não suporta a funcionalidade de gravação de gravação")
      return
    }

    setIsRecording(true)
    handleOnboarding()

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)        
      }, '')

      setContent(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.log(event.error);
    }

    speechRecognition.start()
  }

  const handleStopRecording = () => {
    setIsRecording(false)

    if(speechRecognition !== null) {
      speechRecognition.stop()
    }
  }

  const handleSaveNote = () => {
    onNoteCreated(content)
    
    setContent('')
    handleOnboarding()

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
          <Dialog.Content 
            className="fixed max-md:inset-0 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col overflow-hidden outline-none">
            <Dialog.Close
              className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100"
              onClick={() => setShowOnboarding(true)}
            >
              <X className="size-5"/>
            </Dialog.Close>
            
            <form className="flex flex-col flex-1">
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-sm font-medium text-slate-300">
                  Adicionar Nota
                </span>
                
                {
                  showOnboarding ? (
                    <p className="text-sm leading-6 text-slate-400">

                      Comece a <button type="button" onClick={handleStartRecording} className="font-medium text-lime-400 hover:underline">gravar uma nota</button> em áudio se prefirir utilize <button type="button" className="font-medium text-lime-400 hover:underline" onClick={handleOnboarding}>apenas texto</button>.
                    </p>
                  ) : (
                    <textarea
                      className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none" 
                      autoFocus
                      onChange={handleContentChanged}
                      value={content} />
                  )
                }
              </div>
                
              {isRecording ?
                  <button 
                    type="button"
                    onClick={handleStopRecording} 
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-500"
                  >
                    <div className="size-3 rounded-full bg-red-500 animate-pulse"/>
                    Gravando! (clique p/ interromper)
                  </button>
                :
                  <button 
                    type="button"
                    onClick={handleSaveNote} 
                    className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500 disabled:bg-lime-400/50"
                    disabled={content === ""}
                  >
                    {content === "" ? "Escolha entre áudio ou texto" : "Salvar Nota"}
                  </button>
              }
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}