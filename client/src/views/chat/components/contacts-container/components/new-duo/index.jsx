import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

function NewDuo() {
  const [openNewContactModel, setOpenNewContactModel] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-small cursor-pointer hover:text-neutral-100 transition-all duration-300 "
              onClick={() => setOpenNewContactModel(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-black border-white lato-regular text-white">
            new duo.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}

export default NewDuo;
