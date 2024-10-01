'use client'

import { Input, InputGroup } from '@/components/catalyst/input'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/catalyst/navbar'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'
import React from 'react'

const CollabsPageLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    let pathname = usePathname();
    return (
        <div>
            <Navbar>
                <NavbarSection className="max-lg:hidden">
                    <NavbarItem href="/collabs" current={pathname.endsWith('/collabs')}>Dashboard</NavbarItem>
                    <NavbarItem href="/collabs/active" current={pathname.startsWith('/collabs/active')}>Active</NavbarItem>
                    <NavbarItem href="/collabs/archived" current={pathname.startsWith('/collabs/archived')}>Archived</NavbarItem>
                </NavbarSection>
                <NavbarSpacer />
                <NavbarSection>
                    <NavbarItem aria-label="Search">
                        <InputGroup>
                            <MagnifyingGlassIcon />
                            <Input name="search" placeholder="Search&hellip;" aria-label="Search" />
                        </InputGroup>
                    </NavbarItem>
                </NavbarSection>
            </Navbar>
            <div className='py-8'>
                {children}
            </div>
        </div>
    )
}

export default CollabsPageLayout