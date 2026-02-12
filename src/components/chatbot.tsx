'use client';

import { useActionState, useState, useRef, useEffect, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { Bot, Loader2, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { askChatbot, type ChatbotActionState } from '@/app/actions';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

type Message = {
  role: 'user' | 'model';
  content: string;
};

const initialState: ChatbotActionState = {
  status: 'idle',
};

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button type="submit" size="icon" disabled={isPending} className="h-10 w-10">
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Send className="h-4 w-4" />
      )}
    </Button>
  );
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [state, formAction] = useActionState(askChatbot, initialState);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaViewportRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.status === 'success' && state.data) {
      setMessages((prev) => [...prev, { role: 'model', content: state.data!.message }]);
    } else if (state.status === 'error') {
      toast({
        variant: 'destructive',
        title: 'Chatbot Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  useEffect(() => {
    if (scrollAreaViewportRef.current) {
      scrollAreaViewportRef.current.scrollTo({
        top: scrollAreaViewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isPending]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userMessage = formData.get('message') as string;
    if (!userMessage.trim() || isPending) return;

    startTransition(() => {
      setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
      const actionFormData = new FormData();
      actionFormData.append('message', userMessage);
      actionFormData.append('history', JSON.stringify(messages));
      formAction(actionFormData);
    });
    
    formRef.current?.reset();
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([{ role: 'model', content: "Hello! I'm Xyrille's AI assistant. Ask me anything about his profile." }]);
        inputRef.current?.focus();
      }, 300);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button onClick={toggleChat} size="icon" className="rounded-full h-16 w-16 shadow-lg">
          {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
        </Button>
      </div>

      <div className={cn(
        "fixed bottom-24 right-6 z-50 w-full max-w-sm rounded-xl border bg-card shadow-2xl transition-all duration-300 ease-in-out",
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      )}>
        <div className="flex flex-col h-[60vh]">
          <header className="flex items-center justify-between p-3 border-b bg-muted/50 rounded-t-xl">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border-2 border-background">
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </header>
          
          <ScrollArea className="flex-1" viewportRef={scrollAreaViewportRef}>
            <div className="p-4 space-y-6">
              {messages.map((msg, index) => (
                <div key={index} className={cn('flex items-start gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                  {msg.role === 'model' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={cn('rounded-lg px-4 py-2.5 max-w-[85%] break-words text-sm', msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isPending && (
                <div className="flex items-start gap-3 justify-start">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg px-4 py-2.5 bg-muted flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <footer className="p-3 border-t bg-background rounded-b-xl">
            <form ref={formRef} onSubmit={handleSubmit} className="flex items-center gap-2">
              <Input
                ref={inputRef}
                name="message"
                placeholder="Ask a question..."
                autoComplete="off"
                disabled={isPending}
                className="flex-1"
              />
              <SubmitButton isPending={isPending} />
            </form>
          </footer>
        </div>
      </div>
    </>
  );
}
