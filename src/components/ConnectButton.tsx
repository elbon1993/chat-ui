'use client'
import { Button } from '@headlessui/react'
import React, { useState } from 'react'
import Web3 from 'web3';

const ConnectButton = () => {
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');

    const connectWallet = async () => {
        /* if (window?.ethereum) {
            try {
                // Request account access if needed
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                // Create a Web3 instance using the MetaMask provider
                const web3 = new Web3(window.ethereum);

                // Get the user's Ethereum address
                const accounts = await web3.eth.getAccounts();
                const userAddress = accounts[0];
                setAddress(userAddress);

                // Get the user's balance
                const userBalance = await web3.eth.getBalance(userAddress);
                const balanceInEther = web3.utils.fromWei(userBalance, 'ether');
                setBalance(balanceInEther);
                console.log(`Address: ${userAddress}, Balance: ${balanceInEther}`)
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        } else {
            alert('MetaMask is not installed!');
        } */
    };

    return (
        <Button
            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white my-4"
            onClick={connectWallet}
        >
            Connect to Metamask
        </Button>
    )
}

export default ConnectButton