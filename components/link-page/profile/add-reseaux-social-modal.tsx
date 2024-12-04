'use client'

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { v4 as uuidv4 } from 'uuid';
import { IconReseauxType } from '@/src/constants/social-reseaux-data';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useProfileStore } from '@/store/user-profil-store';
import { SocialLinkType } from '@/src/types/reseaux-type';

interface AddReseauProps {
  isOpen: boolean;
  onClose: () => void;
  handleAddSocial: (newSocialData: SocialLinkType[]) => void;
}

export const AddReseauSocialModal = ({ isOpen, onClose, handleAddSocial }: AddReseauProps) => {
  const [selectedNetworks, setSelectedNetworks] = useState<IconReseauxType[]>([]);
  const { allSocialLinks, user } = useProfileStore();

  // Filter out already added social networks
  const availableNetworks = allSocialLinks.filter(
    network => !user?.socialLinks.some(userNetwork => userNetwork.name === network.name)
  );

  const handleAddReseaux = () => {
    const newSocialData: SocialLinkType[] = selectedNetworks.map(network => ({
      id: uuidv4(),
      name: network.name,
      url: '',
      color: network.color,
      icon: network.icon,
      isActive: true,
    }));

    handleAddSocial(newSocialData);
    handleCancelAddReseaux();
  };

  const handleCancelAddReseaux = () => {
    onClose();
    setSelectedNetworks([]);
  };

  const handleCheckboxChange = (checked: boolean, network: IconReseauxType) => {
    if (checked) {
      setSelectedNetworks(prev => [...prev, network]);
    } else {
      setSelectedNetworks(prev => prev.filter(item => item.name !== network.name));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] border-primary-foreground rounded-lg">
        <DialogHeader>
          <DialogTitle>Add Social Networks</DialogTitle>
          <DialogDescription className='text-muted-foreground'>
            Select the social networks you want to add to your profile
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          {availableNetworks.map((network, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                selectedNetworks.some(item => item.name === network.name) ? 'bg-secondary' : ''
              } hover:bg-secondary`}
            >
              <div className="flex items-center gap-2">
                <network.icon color={network.color} size={25} />
                <span>{network.name}</span>
              </div>
              <Checkbox
                checked={selectedNetworks.some(item => item.name === network.name)}
                onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, network)}
              />
            </div>
          ))}
          {availableNetworks.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              All social networks have been added
            </div>
          )}
        </ScrollArea>
        <DialogFooter className="grid grid-cols-2 gap-4 items-center justify-between w-full">
          <Button variant="destructive" className='w-full' onClick={handleCancelAddReseaux}>
            Cancel
          </Button>
          {selectedNetworks.length > 0 && (
            <Button className='w-full' onClick={handleAddReseaux}>
              Add {selectedNetworks.length > 1 ? 'networks' : 'network'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};