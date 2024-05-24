// CopyButton.jsx
"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ClipboardCheck, Clipboard } from "lucide-react";

export const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <Button disabled={isCopied} onClick={copy} size="icon" variant="outline">
      {isCopied ? <ClipboardCheck /> : <Clipboard />}
    </Button>
  );
};
