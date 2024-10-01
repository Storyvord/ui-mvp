/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AddShootDetailsDialogProps {
    openDialog: boolean;
    handleCloseDialog: () => void;
}

export default function AddShootDetailsDialog({ openDialog, handleCloseDialog }: AddShootDetailsDialogProps) {
  return (
    <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-2xl mx-auto">
            <DialogHeader>
                <DialogTitle className='lg:text-2xl md:text-2xl text-sm font-poppins text-center font-medium text-[#333333]'>Almost there!</DialogTitle>
                <DialogDescription className='text-xs lg:text-base md:text-base font-poppins text-center font-normal text-[#666666] mt-2'>Now, let's finalise your shoot details</DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}
