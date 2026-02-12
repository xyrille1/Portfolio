'use client';

import { useFormStatus } from 'react-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { generateInquiry, type FormState } from '@/app/actions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useActionState, useEffect, useRef, type ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Copy, Loader2, Mail, Send } from 'lucide-react';

type InquiryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: ReactNode;
};

const initialState: FormState = {
  status: 'idle',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        'Generate Draft'
      )}
    </Button>
  );
}

export function InquiryModal({ open, onOpenChange }: InquiryModalProps) {
  const [state, formAction] = useActionState(generateInquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.status === 'success') {
      // Form reset is handled below
    } else if (state.status === 'error' && state.message) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      formRef.current?.reset();
      // Resetting form state by re-running the action with special value
      formAction(new FormData());
    }
    onOpenChange(isOpen);
  };

  const renderContent = () => {
    if (state.status === 'success' && state.data) {
      const mailtoLink = `mailto:xyrillenavora@email.com?subject=${encodeURIComponent(
        state.data.subject
      )}&body=${encodeURIComponent(state.data.draftedMessage)}`;

      const copyToClipboard = async (text: string, type: string) => {
        try {
          await navigator.clipboard.writeText(text);
          toast({
            title: 'Copied to Clipboard',
            description: `The ${type} has been copied.`,
          });
        } catch (err) {
          toast({
            variant: 'destructive',
            title: 'Copy Failed',
            description: `Could not copy the ${type}.`,
          });
        }
      };

      return (
        <>
          <DialogHeader>
            <DialogTitle>Your Draft is Ready</DialogTitle>
            <DialogDescription>
              Here's the AI-generated draft. You can copy the content or open it
              directly in your email client.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-semibold">
                Subject
              </Label>
              <div className="relative">
                <Input
                  id="subject"
                  readOnly
                  value={state.data.subject}
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-8"
                  onClick={() =>
                    copyToClipboard(state.data!.subject, 'subject')
                  }
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-semibold">
                Message
              </Label>
              <div className="relative">
                <Textarea
                  id="message"
                  readOnly
                  value={state.data.draftedMessage}
                  className="h-48 resize-none"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-1 h-8 w-8"
                  onClick={() =>
                    copyToClipboard(state.data!.draftedMessage, 'message')
                  }
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-start gap-2">
            <Button asChild>
              <a href={mailtoLink} target="_blank" rel="noopener noreferrer">
                <Send className="mr-2 h-4 w-4" />
                Open in Email Client
              </a>
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleOpenChange(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </>
      );
    }

    return (
      <form action={formAction} ref={formRef}>
        <DialogHeader>
          <DialogTitle>Let's Talk</DialogTitle>
          <DialogDescription>
            Fill out the form below and our AI will help you draft a
            professional inquiry to send to Xyrille.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="senderName">Your Name</Label>
              <Input
                id="senderName"
                name="senderName"
                placeholder="Jane Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senderEmail">Your Email</Label>
              <Input
                id="senderEmail"
                name="senderEmail"
                placeholder="jane.doe@example.com"
              />
              {state.errors?.senderEmail && (
                <p className="text-sm text-destructive">
                  {state.errors.senderEmail[0]}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="inquiryType">Inquiry Type</Label>
            <Select name="inquiryType">
              <SelectTrigger id="inquiryType">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Job Opportunity">Job Opportunity</SelectItem>
                <SelectItem value="Collaboration">Collaboration</SelectItem>
                <SelectItem value="Speaking Engagement">
                  Speaking Engagement
                </SelectItem>
                <SelectItem value="General Inquiry">General Inquiry</SelectItem>
              </SelectContent>
            </Select>
            {state.errors?.inquiryType && (
              <p className="text-sm text-destructive">
                {state.errors.inquiryType[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="messageDetails">Message Details</Label>
            <Textarea
              id="messageDetails"
              name="messageDetails"
              placeholder="Tell us a bit about your project or why you're reaching out..."
              className="min-h-[100px]"
            />
            {state.errors?.messageDetails && (
              <p className="text-sm text-destructive">
                {state.errors.messageDetails[0]}
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <SubmitButton />
        </DialogFooter>
      </form>
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[525px]">{renderContent()}</DialogContent>
    </Dialog>
  );
}
