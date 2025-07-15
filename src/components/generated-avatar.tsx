import { createAvatar } from '@dicebear/core';
import { botttsNeutral, initials } from '@dicebear/collection'

import { cn } from '@/lib/utils';
import { Avatar ,AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

interface GeneratedAvatarProps{
    seed: string;
    className?: string;
    variant: "botttsNeutral" | "initials";
}

import React from 'react'
import { init } from 'next/dist/compiled/webpack/webpack';

export const GenreatedAvatar = ({
    seed,
    className,
    variant
}: GeneratedAvatarProps) => {
    let avatar;

    if (variant == 'botttsNeutral'){
        avatar = createAvatar(botttsNeutral, {
            seed,
        })
    } else {
        avatar = createAvatar(initials, {
            seed,
            fontWeight: 500,
            fontSize: 42
        })
    }
    return (
        <Avatar className={cn(className)}>
            <AvatarImage src={avatar.toDataUri()} alt='Avatar' className='size-16'/>
                <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
    );
}