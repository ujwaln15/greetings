import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";
import {
  GET_ALL_CONTACTS_ROUTE,
  SEARCH_CONTACTS_ROUTE,
} from "@/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multipleselect";

function CreateGathering() {
  const { setSelectedChatType, setSelectedChatData, userInfo } = useAppStore();
  const [newGatheringModel, setNewGatheringModel] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [gatheringName, setGatheringName] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await apiClient.get(GET_ALL_CONTACTS_ROUTE, {
        withCredentials: true,
      });
      setAllContacts(response.data.contacts);
    };
    getData();
  }, [newGatheringModel]);

  const createGathering = async () => {};

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-small cursor-pointer hover:text-neutral-100 transition-all duration-300 "
              onClick={() => setNewGatheringModel(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-black border-white lato-regular text-white">
            new gathering.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={newGatheringModel} onOpenChange={setNewGatheringModel}>
        <DialogContent className="bg-black text-white h-[400px] flex flex-col lato-regular xl:border-none">
          <DialogHeader>
            <DialogTitle>set gathering details.</DialogTitle>
          </DialogHeader>
          <div>
            <Input
              placeholder="gathering name."
              className="rounded-lg p-6 border-black text-black"
              onChange={(e) => setGatheringName(e.target.value)}
              value={gatheringName}
            />
          </div>
          <div>
            <MultipleSelector
              className="rounded-lg border-black bg-white text-black flex p-3"
              defaultOptions={allContacts}
              placeholder="search contacts."
              value={selectedContacts}
              onChange={setSelectedContacts}
              emptyIndicator={
                <p className="text-center text-md loading-10">no results.</p>
              }
            />
          </div>
          <div>
            <Button
              className={
                "h-16 w-full bg-blue-700 hover:bg-blue-900 transition-all duration-300"
              }
              onClick={createGathering}
            >
              gather.
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateGathering;
