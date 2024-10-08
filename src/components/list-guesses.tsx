"use client"
import { cn } from "@/lib/utils";
import { WordsGuess } from "@/types";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { capitalize } from "@/lib/string";
import { Dispatch, SetStateAction } from "react";
import { ScrollArea } from "./ui/scroll-area";
import Spinner from "./spinner";

interface ListGuessesProps {
  wordsGuess: WordsGuess | null;
  setSelectedGuess: Dispatch<SetStateAction<string | null>>;
  messageError: string | undefined;
  selectedGuess: string | null;
  isPending: boolean;
}

export default function ListGuesses({
  wordsGuess,
  setSelectedGuess,
  messageError,
  selectedGuess,
  isPending
}: ListGuessesProps) {
  const length = wordsGuess?.words.length;

  return (
    <>
      {wordsGuess && wordsGuess.words && (
        <>
          <h2 className="px-4 pb-1 border-b-2 border-foreground/40 relative flex gap-2 items-center">
            {length} Tentativas
            {isPending && <Spinner className="size-min scale-90"/>}
          </h2>
          {wordsGuess && messageError && messageError.length > 0 && (
            <div className="text-sm text-center px-1 py-2 bg-destructive/15 text-destructive">
              {messageError}
            </div>
          )}
          <ScrollArea className="h-[83vh] pr-1.5">

          <ToggleGroup
            type="single"
            className="flex flex-col-reverse p-0"
            value={selectedGuess ?? ""}
            onValueChange={setSelectedGuess}
          >
            {wordsGuess.words.map((word) => (
            
              <ToggleGroupItem
                value={word.word}
                key={word.word}
                className={cn(
                  "w-full font-semibold rounded-none p-2 flex justify-between transition-colors",
                  "data-[state=on]:bg-primary/30 data-[state=on]:dark:bg-primary/15 data-[state=on]:text-primary-foreground", // Estilo para o item selecionado
                  {
                    "text-success": word.count > 0,
                    "text-destructive": word.count < 1,
                    "dark:text-success data-[state=on]:text-success": word.count > 0,
                    "dark:text-destructive data-[state=on]:text-destructive": word.count < 1,
                  }
                )}
                >
                <span>
                  {["deus", "jesus"].includes(word.word)
                    ? capitalize(word.word)
                    : word.word}
                </span>
                <span>{word.count}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </ScrollArea>
        </>
      )}
    </>
  );
}
