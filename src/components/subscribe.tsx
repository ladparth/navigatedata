import { Mail } from "lucide-react";
import { SubscribeForm } from "./subscribe-form";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function Subscribe() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="rounded-lg flex gap-2 items-center"
        >
          <Mail />
          <span className="hidden lg:flex">Subscribe</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mr-3 xl:mr-10 shadow-md" side="top">
        <SubscribeForm />
      </PopoverContent>
    </Popover>
  );
}
