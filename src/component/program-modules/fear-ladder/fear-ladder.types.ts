export interface IFearLadderProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    setContent: (event: React.ChangeEvent<HTMLTextAreaElement> | string) => void
    setHeading: (event: React.ChangeEvent<HTMLInputElement> | string) => void
    heading: string
    content: string
    setOpen: (open: boolean) => void
    completionTime: string
    setCompletionTime: (event: any) => void
  }