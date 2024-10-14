'use client'

import React from 'react'
import { Avatar } from '@/components/catalyst/avatar'
import {
    Dropdown,
    DropdownButton,
    DropdownDivider,
    DropdownItem,
    DropdownLabel,
    DropdownMenu,
} from '@/components/catalyst/dropdown'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/catalyst/navbar'
import {
    Sidebar,
    SidebarBody,
    SidebarFooter,
    SidebarHeader,
    SidebarHeading,
    SidebarItem,
    SidebarLabel,
    SidebarSection,
    SidebarSpacer,
} from '@/components/catalyst/sidebar'
import { SidebarLayout } from '@/components/catalyst/sidebar-layout'
import ConnectButton from '@/components/ConnectButton'
import {
    ArrowRightStartOnRectangleIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    Cog8ToothIcon,
    LightBulbIcon,
    PlusIcon,
    ShieldCheckIcon,
    UserIcon,
    ArrowsPointingInIcon,
    RectangleGroupIcon,
    SquaresPlusIcon
} from '@heroicons/react/16/solid'
import {
    Cog6ToothIcon,
    HomeIcon,
    InboxIcon,
    MagnifyingGlassIcon,
    MegaphoneIcon,
    QuestionMarkCircleIcon,
    SparklesIcon,
    Square2StackIcon,
    TicketIcon,
} from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'


const ApplicationLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    let pathname = usePathname();
    return (
        <SidebarLayout
            navbar={
                <Navbar>
                    <NavbarSpacer />
                    <NavbarSection>
                        <NavbarItem href="/search" aria-label="Search">
                            <MagnifyingGlassIcon />
                        </NavbarItem>
                        <NavbarItem href="/inbox" aria-label="Inbox">
                            <InboxIcon />
                        </NavbarItem>
                        <Dropdown>
                            <DropdownButton as={NavbarItem}>
                                <Avatar src="/profile-photo.jpg" square />
                            </DropdownButton>
                            <DropdownMenu className="min-w-64" anchor="bottom end">
                                <DropdownItem href="/my-profile">
                                    <UserIcon />
                                    <DropdownLabel>My profile</DropdownLabel>
                                </DropdownItem>
                                <DropdownItem href="/settings">
                                    <Cog8ToothIcon />
                                    <DropdownLabel>Settings</DropdownLabel>
                                </DropdownItem>
                                <DropdownDivider />
                                <DropdownItem href="/privacy-policy">
                                    <ShieldCheckIcon />
                                    <DropdownLabel>Privacy policy</DropdownLabel>
                                </DropdownItem>
                                <DropdownItem href="/share-feedback">
                                    <LightBulbIcon />
                                    <DropdownLabel>Share feedback</DropdownLabel>
                                </DropdownItem>
                                <DropdownDivider />
                                <DropdownItem href="/logout">
                                    <ArrowRightStartOnRectangleIcon />
                                    <DropdownLabel>Sign out</DropdownLabel>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarSection>
                </Navbar>
            }
            sidebar={
                <Sidebar>
                    <SidebarHeader>
                        <SidebarItem>
                            <SidebarLabel className='text-xl'>Collab Inn</SidebarLabel>
                        </SidebarItem>
                    </SidebarHeader>
                    <SidebarBody>
                        <SidebarSection>
                            <SidebarItem href="/inbox" current={pathname.startsWith('/inbox')}>
                                <InboxIcon />
                                <SidebarLabel>Inbox</SidebarLabel>
                            </SidebarItem>
                            <SidebarItem href="/chat" current={pathname.startsWith('/chat')}>
                                <InboxIcon />
                                <SidebarLabel>Chat</SidebarLabel>
                            </SidebarItem>
                            <SidebarItem href="/group-chat" current={pathname.startsWith('/group-chat')}>
                                <InboxIcon />
                                <SidebarLabel>Group Chat</SidebarLabel>
                            </SidebarItem>
                            <SidebarItem href="/spaces" current={pathname.startsWith('/spaces')}>
                                <SquaresPlusIcon />
                                <SidebarLabel>Spaces</SidebarLabel>
                            </SidebarItem>
                            <SidebarItem href="/collabs" current={pathname.startsWith('/collabs')}>
                                <Square2StackIcon />
                                <SidebarLabel>Collabs</SidebarLabel>
                            </SidebarItem>
                            <SidebarItem href="/projects" current={pathname.startsWith('/projects')}>
                                <TicketIcon />
                                <SidebarLabel>Projects</SidebarLabel>
                            </SidebarItem>
                            <SidebarItem href="/settings" current={pathname.startsWith('/settings')}>
                                <Cog6ToothIcon />
                                <SidebarLabel>Settings</SidebarLabel>
                            </SidebarItem>
                        </SidebarSection>
                        <SidebarSection className="max-lg:hidden">
                            <SidebarHeading>Recent Collabs</SidebarHeading>
                            <SidebarItem href="/collabs/1">Closet Control</SidebarItem>
                            <SidebarItem href="/collabs/2">Catalyst On</SidebarItem>
                        </SidebarSection>
                        <SidebarSpacer />
                        <SidebarSection>
                            <SidebarItem href="/support">
                                <QuestionMarkCircleIcon />
                                <SidebarLabel>Support</SidebarLabel>
                            </SidebarItem>
                        </SidebarSection>
                    </SidebarBody>
                    <SidebarFooter className="max-lg:hidden">
                        <Dropdown>
                            <DropdownButton as={SidebarItem}>
                                <span className="flex min-w-0 items-center gap-3">
                                    <UserIcon className="size-10 aspect-square rounded" />
                                    <span className="min-w-0">
                                        <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">Travis Scott</span>
                                        <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                                            @travisscott
                                        </span>
                                    </span>
                                </span>
                                <ChevronUpIcon />
                            </DropdownButton>
                            <DropdownMenu className="min-w-64" anchor="top start">
                                <DropdownItem href="/my-profile">
                                    <UserIcon />
                                    <DropdownLabel>My profile</DropdownLabel>
                                </DropdownItem>
                                <DropdownItem href="/settings">
                                    <Cog8ToothIcon />
                                    <DropdownLabel>Settings</DropdownLabel>
                                </DropdownItem>
                                <DropdownDivider />
                                <DropdownItem href="/privacy-policy">
                                    <ShieldCheckIcon />
                                    <DropdownLabel>Privacy policy</DropdownLabel>
                                </DropdownItem>
                                <DropdownItem href="/share-feedback">
                                    <LightBulbIcon />
                                    <DropdownLabel>Share feedback</DropdownLabel>
                                </DropdownItem>
                                <DropdownDivider />
                                <DropdownItem href="/logout">
                                    <ArrowRightStartOnRectangleIcon />
                                    <DropdownLabel>Sign out</DropdownLabel>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </SidebarFooter>
                </Sidebar>
            }
        >
            {children}
        </SidebarLayout>
    )
}

export default ApplicationLayout